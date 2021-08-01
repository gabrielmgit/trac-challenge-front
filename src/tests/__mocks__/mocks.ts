import faker from 'faker';
import {
  ASSET_STATUS, IAsset, ICompany, IUnit,
} from '../../utils/types';

export const assetStatusMock = (): ASSET_STATUS => [
  ASSET_STATUS.Alerting,
  ASSET_STATUS.Running,
  ASSET_STATUS.Stopped,
][faker.datatype.number({ min: 0, max: 2 })];

export const assetMock = (): IAsset => ({
  _id: faker.datatype.uuid(),
  name: faker.name.firstName(),
  health: faker.datatype.number({ min: 0, max: 100 }),
  image: faker.internet.url(),
  description: faker.lorem.paragraph(),
  owner: faker.name.lastName(),
  status: assetStatusMock(),
});

export const unitMock = (): IUnit => ({
  assets: [assetMock(), assetMock(), assetMock()],
  _id: faker.datatype.uuid(),
  name: faker.name.firstName(),
});

export const companyMock = ():ICompany => ({
  units: [unitMock(), unitMock()],
  users: [],
  _id: faker.datatype.uuid(),
  name: faker.name.firstName(),
});

export const companiesMock: ICompany[] = [companyMock(), companyMock()];

export const unitsMock: IUnit[] = [unitMock(), unitMock()];

export const assetsMock: IAsset[] = [assetMock(), assetMock()];
