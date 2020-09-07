import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { DecodedExpressRequest } from "../../infra/http/models/decodedRequest";
import { CreateUserDTO } from "./CreateUserDTO";
import { TextUtils } from "../../../../shared/infra/utils/TextUtils";
import * as express from 'express'
import { CreateUserErrors } from "./CreateUserErrors";

export class CreateUserController extends BaseController {
    private useCase: CreateUserUseCase;

    constructor (useCase: CreateUserUseCase) {
        super();
        this.useCase = useCase;
    }

    async executeImpl (req: DecodedExpressRequest, res: express.Response): Promise<any> {
        let dto: CreateUserDTO = req.body as CreateUserDTO;

        dto = {
            username: TextUtils.sanitize(dto.username),
            email: TextUtils.sanitize(dto.email),
            password: dto.password
        }

        try {
            const result = await this.useCase.execute(dto);

            if (result.isLeft()) {
                const error = result.value;

                switch (error.constructor) {
                    case CreateUserErrors.UsernameTakenError:
                        return this.conflict(error.errorValue().message)
                    case CreateUserErrors.EmailAlreadyExistsError:
                        return this.conflict(error.errorValue().message)
                    default:
                        return this.fail(res, error.errorValue().message);
                }
            } else {
                return this.ok(res);
            }
        } catch (err) {
            return this.fail(res, err)
        }
    }
}