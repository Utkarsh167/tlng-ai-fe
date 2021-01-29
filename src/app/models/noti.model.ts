declare module Notifications {

    export interface NotificationList {
        _id: string;
        title: string;
        message: string;
        created: any;
    }

    export interface Data {
        notificationList: NotificationList[];
        totalCount: number;
    }

    export interface RootObject {
        statusCode: number;
        message: string;
        data: Data;
    }

}

