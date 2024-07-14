export interface Complaint {
    chiefComplaint?: string,
    findings?: string
}

export const DEFAULT_Complaint : Complaint = {
    chiefComplaint: "",
    findings: ""
}