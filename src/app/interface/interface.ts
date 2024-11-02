export interface subject{
    id: number;
    name:string;
}
export interface level{
    id: number;
    level:string;
}
export interface subject_level{
    id: number;
    name:string;
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
export interface teacherLesson{
    id: number;
    teacher_id: number;
    subject_id: number;
    subject_level_id: number;
    subject: subject;
    subject_level: subject_level;
    price: number;
}
export interface lessonSet{
    subject_id: string|null;
    subject_level_id: string|null;
    price: string|null;
}
export interface select{
    id:number;
    name:string;
}