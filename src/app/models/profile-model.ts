declare module profile {

    export interface Detail {
        adminType: string;
        tripCount: number;
        adhocCount: number;
        created: number;
        email: string;
        mobileNo: string;
        status: string;
        _id: string;
        name: string;
        employeeId: string;
        gender: string;
        shiftStartTime: number;
        shiftEndTime: number;
        salt: string;
        hash: string;
        createdBy: string;
        userType: number;
        documents: any[];
        id: string;
    }
}

