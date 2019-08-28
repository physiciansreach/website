import { Address } from './address.model';
import { CallbackTime } from './enums/callback-time.enum';
import { InsuranceType } from './enums/insurance-type.enum';
import { LanguageType } from './enums/language-type.enum';
import { SexType } from './enums/sex-type.enum';
import { TherapyType } from './enums/therapy-type.enum';
import { Medicare } from './medicare.model';
import { PrivateInsurance } from './private-insurance.model';

export class Patient {
    public patientId: number;
    public agentId: number;
    public firstName: string;
    public middleName: string;
    public lastName: string;
    public phoneNumber: string;
    public dateOfBirth: Date;
    public bestTimeToCallBack: CallbackTime;
    public language: LanguageType;
    public sex: SexType;
    public address: Address;
    public weight: string;
    public waist: string;
    public height: string;
    public shoeSize: string;
    public allergies: string;

    public mainPainArea: string;
    public secondPainArea: string;
    public hadBraceBefore: string;
    public painCream: string;

    public medications: string;
    public notes: string;
    public otherProducts: string;
    public physiciansName: string;
    public physiciansPhoneNumber: string;
    public physiciansAddress: Address;
    public therapy: TherapyType;
    public insurance: InsuranceType;
    public medicare: Medicare;
    public privateInsurance: PrivateInsurance;
    public isDme: boolean;
    public createdOn: Date;
    public modifiedOn: Date;
}
