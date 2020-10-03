import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { User } from "../user";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";

export class EmailVerified implements IDomainEvent {
    public dateTimeOccured: Date;
    public user: User;

    constructor (user: User) {
        this.dateTimeOccured = new Date();
        this.user = user;
    }

    public getAggregateID (): UniqueEntityID {
        return this.user.id;
    }
}
