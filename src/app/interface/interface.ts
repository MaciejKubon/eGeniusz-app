export interface subject{
    id: number;
    name:string;
}
export interface level{
    id: number;
    level:string;
}
export interface linkButton{
    path: string;
    text: string;
}
export interface loginData{
    email:string|null;
    password:string|null;
    accountType:number;
}