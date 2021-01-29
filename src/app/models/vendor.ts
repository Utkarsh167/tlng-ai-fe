declare module Vendor {

    export interface Detail {
        _id: string;
        adminType: string;
        created: number;
        email: string;
        countryCode: string;
        mobileNo: string;
        profilePicture: string;
        badgeNo: string;
        status: string;
        name: string;
        cabs?:number;
    }

    export interface List {
        userList: Detail[];
        totalCount: number;
    }

}

