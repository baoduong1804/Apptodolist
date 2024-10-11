import { Timestamp } from 'firebase/firestore';
export interface TaskModel{
    id:string,
    title:string,
    description: string,
    dueDate:Timestamp,
    start:Date,
    end:Date,
    uids:string[],
    color?:string,
    fileUrls:string[],
    progress?:number,
    updatedAt:Timestamp
}