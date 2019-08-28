import { AccountType } from './enums/account-type.enum';
import { ErrorModel } from './error.model';

export class UserAccount {
    public userAccountId: number;
    public type: AccountType;
    public userName: string;
    public password: string;
    public emailAddress: string;
    public active: boolean;
    public token: string;
    public confirmationPassword: string;
    public errors: ErrorModel[];
}
