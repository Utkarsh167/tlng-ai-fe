declare module Cab {

    export interface Single {
        _id: string;
        seatingCapacity: number;
        registrationNo: string;
        adminType: string;
        type: string;
        cabBadge: string;
        status: string;
        cabModel: string;
        vendoName: string;
        created: number;
    }

    export interface List { 
        vehicleList: Single[];
        totalCount: number;
    }

    export interface Vendor {
        email: string;
        countryCode: string;
        mobileNo: string;
        profilePicture: string;
        badgeNo: string;
        color: string;
        assigned: boolean;
        _id: string;
        name: string;
        id: string;
    }

    export interface Detail {
        seatingCapacity: number;
        registrationNo: string;
        regNo: string;
        vehicleType: string;
        adminType: string;
        created: number;
        type: string;
        cabBadge: string;
        status: string;
        _id: string;
        cabModel: string;
        vendorId: string;
        createdBy: string;
        vendor: Vendor;
        id: string;
        modal: string;
    }

}

