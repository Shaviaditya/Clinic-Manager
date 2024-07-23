import { Advice } from "./IAdvices";
import { Complaint } from "./IComplaints";
import { IDiagnosis } from "./IDiagnosis";
import { IFacility } from "./IFacility";
import { Medicine } from "./IMedicines";
import { ISymptoms } from "./ISymptoms";

export interface Receipt {
  id?: string;
  symptoms: ISymptoms[];
  advice: Advice[];
  diagnosis: IDiagnosis[];
  facility: IFacility[];
  complaints: Complaint[];
  medicines: Medicine[];
}

export const DEFAULT_RECEIPT: Receipt = {
  id: "",
  symptoms: [],
  advice: [],
  diagnosis: [],
  facility: [],
  complaints: [],
  medicines: [],
};
