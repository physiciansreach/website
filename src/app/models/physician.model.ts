import { Address } from './address.model';
import { UserAccount } from './user-account.model';

export class Physician {
    public firstName: string;
    public lastName: string;
    public phoneNumber: string;
    public faxNumber: string;
    public dea: string;
    public npi: string;
    public address: Address;
    public userAccount: UserAccount;
    public createdOn: Date;
    public modifiedOn: Date;
}
