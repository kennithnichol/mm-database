import { UseCaseError } from '../../../../shared/core/UseCaseError'
import { Result } from '../../../../shared/core/Result'

export namespace CreateUserErrors {
    export class EmailAlreadyExistsError extends Result<UseCaseError> {
        constructor (email: string) {
            super(false, {
                message: `The email ${email} associated with this account already exists`
            } as UseCaseError)
        }
    }

    export class UsernameTakenError extends Result<UseCaseError> {
        constructor (username: string) {
            super(false, {
                message: `The username ${username} is already taken`
            } as UseCaseError)
        }
    }
}