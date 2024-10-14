import { monthNames } from "../constants/appInfos"

export class HandleDateTime {
    static ChangeMonth = (num:number) =>{
        return monthNames[num]
    }
}

