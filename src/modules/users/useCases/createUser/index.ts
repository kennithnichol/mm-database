import { CreateUserUseCase } from './CreateUserUseCase';
import { userRepo } from "../../repos";
import { CreateUserController } from './CreateUserController';

const createUserUseCase = new CreateUserUseCase(userRepo);
const createUserController = new CreateUserController(
    createUserUseCase
)

export {
    createUserUseCase,
    createUserController
}