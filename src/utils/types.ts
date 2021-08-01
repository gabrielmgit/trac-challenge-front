import { CSSProperties } from 'react';

export enum ASSET_STATUS {
    Running = 'RUNNING',
    Alerting = 'ALERTING',
    Stopped = 'STOPPED',
}

export const StatusTranslate = {
  RUNNING: 'FUNCIONANDO',
  ALERTING: 'EM ALERTA',
  STOPPED: 'PARADA',
};

export interface IAsset {
    _id: string,
    image: string,
    name: string,
    description: string,
    owner: string,
    status: ASSET_STATUS,
    health: number,
}

export interface IUnit {
    _id: string,
    name: string,
    assets: IAsset[],
}

export interface ICompany {
    _id: string,
    name: string,
    units: IUnit[],
    users: IUser[]
}

export interface IUser {
    _id: string,
    companyId: string,
    name: string,
    password: string,
}

export type NewRegistry<T> = Omit<T, '_id'>;

export type CssPropertiesMap = Record<string, CSSProperties>;
