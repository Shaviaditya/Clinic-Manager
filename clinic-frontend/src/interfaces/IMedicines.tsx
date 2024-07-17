export interface Medicine {
    name?: string,
    dosage?: string,
    duration?: string,
    quantity?: string
}

export const DEFAULT_Medicine : Medicine = {
    name: "",
    dosage: "",
    duration: "",
    quantity: ""
}