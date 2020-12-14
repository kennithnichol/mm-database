import { userRepo } from "../../repos";
import { authService } from "../../services";
import { LoginController } from "./LoginController";
import { LoginUseCase } from "./LoginUseCase";

const loginUseCase = new LoginUseCase(userRepo, authService);
const loginController = new LoginController(loginUseCase);

export { loginController, loginUseCase }