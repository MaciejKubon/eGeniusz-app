import { Data } from "@angular/router";

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
export interface userDetail{
    firstName: string|null;
    lastName: string|null;
    birthday: string|null;
}
export interface teacherDetail{
    firstName: string|null;
    lastName: string|null;
    birthday: string|null;
    description: string|null;
}