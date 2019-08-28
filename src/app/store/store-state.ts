import { Admin } from '../models/admin.model';
import { Agent } from '../models/Agent.model';
import { Patient } from '../models/patient.model';
import { Physician } from '../models/physician.model';
import { Vendor } from '../models/vendor.model';

export interface StoreState {
    admins: Admin[];
    agents: Agent[];
    physicians: Physician[];
    patients: Patient[];
    vendors: Vendor[];
}
