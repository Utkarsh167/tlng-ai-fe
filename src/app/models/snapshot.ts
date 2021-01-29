declare module Snapshot {

    export interface Detail {
        camera_id: string;
        color: string;
        duration: number;
        event_start: number;
        occupied: boolean;
        spot_id: string;
        vehicle_id: string;
        crop: string;
    }

    export interface List {
        spot_states: Detail[];
        length: number;
        median_duration: any;
        image: string;
    }

}

