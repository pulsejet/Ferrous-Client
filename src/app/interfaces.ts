﻿export interface EnumContainer {
    links: Link[];
    data: any;
}

export interface Link {
    rel: string;
    href: string;
    method: string;
}

export interface Contingent {
    contingentLeaderNo: string;
    male: string;
    female: string;
    arrivedM: string;
    arrivedF: string;
    person: Person[];
    roomAllocation: RoomAllocation[];
    contingentArrival: ContingentArrival[];
    remark: string;

    links: Link[];
}

export interface Person {
    name: string;
    mino: string;
    college: string;
    contingentLeaderNo: string;
    sex: string;
    email: string;
    phone: string;
    allottedCA: ContingentArrival;

    links: Link[];
}

export interface Room {
    roomId: number;
    location: string;
    locationExtra: string;
    roomName: string;
    lockNo: string;
    capacity: number;
    allocated: string;
    status: number;
    remark: string;
    roomAllocation: RoomAllocation[];
    mattresses: number;

    selected: boolean;
    stickyselect: boolean;
    partialsel: number;
    partialallot: boolean;

    links: Link[];
}

export interface RoomAllocation {
    sno: number;
    roomId: number;
    contingentLeaderNo: string;
    contingentLeaderNoNavigation: Contingent;
    room: Room;
    partial: number;
    contingentArrivalNo: number;
    contingentArrivalNoNavigation: ContingentArrival[];

    links: Link[];
}

export interface Building {
    location: string;
    locationFullName: string;
    defaultCapacity: number;
    room: Room[];
    sex: string;
    capacityEmpty: number;
    capacityFilled: number;
    capacityNotReady: number;
    capacityMaintainance: number;
    capacityReserved: number;
    roomsEmpty: number;
    roomsFilled: number;
    roomsNotReady: number;
    roomsMaintainance: number;
    roomsReserved: number;
    roomsPartial: number;
    roomsTotal: number;
    alreadyAllocated: number;

    links: Link[];
}

export interface ContingentArrival {
    contingentArrivalNo: number;
    contingentLeaderNo: string;
    fillerMiNo: string;
    createdOn: Date;
    male: number;
    female: number;
    maleOnSpot: number;
    femaleOnSpot: number;
    maleOnSpotDemand: number;
    femaleOnSpotDemand: number;
    contingentLeaderNoNavigation: Contingent[];
    roomAllocation: RoomAllocation[];
    remark: string;
    zeroAllot: boolean;

    peopleMale: number;
    peopleFemale: number;
    allottedMale: number;
    allottedFemale: number;
    caPeople: CAPerson[];
    approved: boolean;

    links: Link[];
}

export interface CAPerson {
    person: Person;
    flags: string;
    sno: number;
    mino: string;
    sex: string;
    links: Link[];
}


export interface FerrousIdentity {
    username: string;
    password: string;
    elevation: number;
    privileges: number[];
    locations: string[];
}
