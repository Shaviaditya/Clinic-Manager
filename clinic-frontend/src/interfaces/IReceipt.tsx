import { Advice } from "./IAdvices";
import { Complaint } from "./IComplaints";
import { IDiagnosis } from "./IDiagnosis";
import { Medicine } from "./IMedicines";
import { ISymptoms } from "./ISymptoms";

export interface Receipt {
  id?: string;
  symptoms: ISymptoms[];
  advice: Advice[];
  diagnosis: IDiagnosis[];
  complaints: Complaint[];
  medicines: Medicine[];
}

export const DEFAULT_RECEIPT: Receipt = {
  id: "",
  symptoms: [],
  advice: [],
  diagnosis: [],  
  complaints: [],
  medicines: [],
};
