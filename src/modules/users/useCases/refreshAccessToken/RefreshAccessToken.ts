import { AppError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { JWTToken, RefreshToken } from "../../domain/jwt";
import { User } from "../../domain/user";
import { IUserRepo } from "../../repos/userRepo";
import { IAuthService } from "../../services/authService";
import { RefreshAccessTokenDTO } from "./RefreshAccessTokenDTO";
import { RefreshAccessTokenErrors } from "./RefreshAccessTokenErrors";

type Response = Either<
    RefreshAccessTokenErrors.RefreshTokenNotFound |
    AppError.UnexpectedError,
    Result<JWTToken>
>

export class RefreshAccessToken implements UseCase<RefreshAccessTokenDTO, Promise<Response>> {
    private userRepo: IUserRepo;
    private authService: IAuthService;

    constructor (userRepo: IUserRepo, authService: IAuthService) {
        this.userRepo = userRepo;
        this.authService = authService;
    }

    public async execute (req: RefreshAccessTokenDTO): Promise<Response> {
        const { refreshToken } = req;
        let user: User;
        let username: string;

        try {
            try {
                username = await this.authService.getUserNameFromRefreshToken(refreshToken);
            } catch (err) {
                return left(new RefreshAccessTokenErrors.RefreshTokenNotFound());
            }

            try {
                user = await this.userRepo.getUserByUserName(username);
            } catch (err) {
                return left(new RefreshAccessTokenErrors.UserNotFoundOrDeletedError());
            }

            const accessToken: JWTToken = this.authService.signJWT({
                username: user.username.value,
                email: user.email.value,
                isEmailVerified: user.isEmailVerified,
                userId: user.userId.id.toString(),
                adminUser: user.isAdminUser,
            });

            user.setAccessToken(accessToken, refreshToken);

            await this.authService.saveAuthenticatedUser(user);

            return right(Result.ok<JWTToken>(accessToken))
        } catch (err) {
            return left(new AppError.UnexpectedError(err));
        }
    }
}