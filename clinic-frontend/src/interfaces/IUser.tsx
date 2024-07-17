export interface IUser  {
    name?:string,
    phone?:string,
    address?:string,
    age?:string,
    height?:string,
    weight?:string,
    bloodPressure?:string,
}

export const DEFAULT_USER : IUser =  {
    name:"",
    phone:"",
    address:"",
    age:"",
    height:"",
    weight:"",
    bloodPressure:"",
}

