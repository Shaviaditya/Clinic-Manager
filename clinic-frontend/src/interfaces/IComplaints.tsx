export interface Complaint {
    chiefComplaints?: string,
    clinicalFindings?: string
}

export const DEFAULT_Complaint : Complaint = {
    chiefComplaints: "",
    clinicalFindings: ""
}