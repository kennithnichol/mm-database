import { userRepo } from "../../repos";
import { GetUserByUserNameController } from "./GetUserByNameController";
import { GetUserByUserName } from "./GetUserByUserName";

const getUserByUserName = new GetUserByUserName(
    userRepo
)

const getUserByUserNameController = new GetUserByUserNameController(
    getUserByUserName
)

export {
    getUserByUserName,
    getUserByUserNameController
}