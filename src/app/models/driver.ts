declare module Driver {

    export interface Detail {
        adminType: string;
        tripCount: number;
        adhocCount: number;
        created: number;
        email: string;
        mobileNo: string;
        profilePicture: string;
        status: string;
        _id: string;
        name: string;
        driverId: string;
        documents: Document[];
        createdBy: string;
        userType: number;
        id: string;
    }

    export interface List {
        userList: Detail[];
        totalCount: number;
    }
    
    export interface Document {
        frontImageUrl: string;
        rearImageUrl: string;
        type: string;
        _id: string;
    }
}


