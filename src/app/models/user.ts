declare namespace User {

    export interface User {
        _id: string;
        adminType: string;
        tripCount: number;
        created: any;
        email: string;
        countryCode: string;
        mobileNo: string;
        profilePicture: string;
        status: string;
        name: string;
        employeeId: string;
        gender: string;
        shiftStartTime: number;
        shiftEndTime: number;
        userType: number;
    }

    export interface UserList {
        userList: User[];
        totalCount: number;
    }


}

