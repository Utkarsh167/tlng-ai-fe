declare module Employee {

    export interface Detail {
        _id: string;
        driverId: string;
        adminType: string;
        tripCount: number;
        created: any;
        email: string;
        countryCode: string;
        mobileNo: string;
        gender: string;
        profilePicture: string;
        status: string;
        name: string;
        employeeId: string;
        shiftStartTime: any;
        shiftEndTime: any;
        userType: number;
        vehicleList: [string];
    }

    export interface List {
        userList: Detail[];
        totalCount: number;
    }

}

