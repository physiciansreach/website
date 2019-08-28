import { UserAccount } from './user-account.model';

export class Agent {
    public firstName: string;
    public lastName: string;
    public vendorId: number;
    public userAccount: UserAccount;
    public createdOn: Date;
    public modifiedOn: Date;
}
