
import { Result } from './Result';
import { DomainError } from '../domain/DomainError';

export namespace AppError {
    export class UnexpectedError extends Result<DomainError> {
        public constructor (err: any) {
            super( false, {
                message: `An unexpected error occured`,
                error: err
            } as DomainError)
            console.log(`[AppError]: An unexpected error occured`);
            console.log(err);
        }

        public static create( err: any): UnexpectedError {
            return new UnexpectedError(err);
        }
    }
}