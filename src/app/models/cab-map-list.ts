declare module CabMapList {

    interface RootObject {

        statusCode: number;
        message: string;
        data: Data;
    }

    interface Data {
        cabList: CabList[];
    }

    interface CabList {
        cabId: CabId;
    }

    interface CabId {
        cabImage: string;
        seatingCapacity: number;
        registrationNo: string;
        cabBadge: string;
        color: string;
        fuelType: string;
        transmissionType: string;
        _id: string;
        cabModel: string;
        driverMapped: DriverMapped[];
        id: string;
    }

    interface DriverMapped {
        email: string;
        countryCode: string;
        mobileNo: string;
        profilePicture: string;
        driverId: string;
        assigned: string;
        shiftId: string;
        startShift: number;
        endShift: number;
        onlineStatus: boolean;
        latitude: number;
        longitude: number;
        name: string;
        _id: string;
        id: string;
    }
}