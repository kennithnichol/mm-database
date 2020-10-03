import { UserEmail } from "../domain/UserEmail";
import { User } from "../domain/user";
import { UserName } from "../domain/UserName";

export interface IUserRepo {
    exists (userEmail: UserEmail): Promise<boolean>;
    getUserByUserId (userId: string): Promise<User>;
    getUserByUserName (userName: UserName | string): Promise<User>;
    save (user: User): Promise<void>;

}