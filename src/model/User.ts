import { InvalidParameterError } from "../errors/InvalidParameterError";

export class User {
    constructor(
        id: string,
        name: string,
        email: string,
        nickname: string,
        password: string,
        type: UserType,
        description?: string
    ) {}
}

export const stringToUserType = (type: string): UserType => {
    switch(type) {
        case 'NORMAL':
            return UserType.NORMAL;
        case 'PREMIUM':
            return UserType.PREMIUM;
        case 'BAND':
            return UserType.BAND;
        default:
            throw new InvalidParameterError("Invalid User Type");
    }
};

export const userTypeToString = (type: UserType): string => {
    switch(type){
        case UserType.NORMAL:
            return 'NORMAL';
        case UserType.PREMIUM:
            return 'PREMIUM';
        case UserType.BAND:
            return 'BAND';
        default:
            throw new InvalidParameterError("Invalid User Type");
    }
};

export enum UserType{
    NORMAL = "NORMAL",
    PREMIUM = "PREMIUM",
    BAND = "BAND",
};