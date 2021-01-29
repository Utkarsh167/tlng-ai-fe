declare module Sos {

    export interface SosLocation {
        type: string;
        coordinates: number[];
    }

    export interface UserList {
        _id: string;
        status: number;
        email: string;
        countryCode: string;
        mobileNo: string;
        profilePicture: string;
        userId: string;
        name: string;
        sosLocation: SosLocation;
        userEmpId: string;
    }

    export interface Data {
        userList: UserList[];
        totalCount: number;
        // Added pendingSosCount - Shivakumar A
        pendingSosCount: number
    }

    export interface RootObject {
        statusCode: number;
        message: string;
        data: Data;
    }

}

