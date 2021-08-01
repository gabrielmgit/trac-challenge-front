import '@testing-library/jest-dom';
import faker from 'faker';
import delegate from '../../../pages/company/delegate';
import CompanyService from '../../../services/CompanyService';
import Toaster from '../../../shared/Toaster';
import { assetMock, companyMock, unitMock } from '../../__mocks__/mocks';

const ToasterErrorSpy = jest.spyOn(Toaster, 'errorMessage');
const ToasterSucessSpy = jest.spyOn(Toaster, 'successMessage');

describe('#delegate.company()', () => {
  const company = companyMock();
  const getCompanySpy = () => jest.spyOn(CompanyService, 'getCompany');

  test('Should not return company', async () => {
    const getCompany = getCompanySpy();
    getCompany.mockImplementation(() => Promise.resolve(undefined));

    const savedCompany = await delegate.company(company._id);
    expect(savedCompany).toStrictEqual(undefined);
  });

  test('Should return company correctly', async () => {
    const getCompany = getCompanySpy();
    getCompany.mockImplementation(() => Promise.resolve(company));

    const savedCompany = await delegate.company(company._id);
    expect(savedCompany).toStrictEqual(company);

    await delegate.company(company._id);
    expect(getCompany).toBeCalledTimes(1);
  });
});

describe('#delegate.createUnit()', () => {
  const createUnitSpy = () => jest.spyOn(CompanyService, 'createUnit');

  test('Should not return unit', async () => {
    const getUnit = createUnitSpy();
    getUnit.mockImplementation(() => Promise.resolve(undefined));

    const createdUnit = await delegate.createUnit(faker.name.firstName());

    expect(ToasterErrorSpy).toBeCalledTimes(1);
    expect(createdUnit).toStrictEqual(undefined);
  });

  test('Should return unit created correctly', async () => {
    const newUnit = unitMock();
    const getUnit = createUnitSpy();
    getUnit.mockImplementation(() => Promise.resolve(newUnit));

    const createdUnit = await delegate.createUnit(faker.name.firstName());

    expect(ToasterSucessSpy).toBeCalledTimes(1);
    expect(createdUnit).toStrictEqual(newUnit);
  });
});

describe('#delegate.createAsset()', () => {
  const createAssetSpy = () => jest.spyOn(CompanyService, 'createAsset');

  test('Should not return asset', async () => {
    const getAsset = createAssetSpy();
    getAsset.mockImplementation(() => Promise.resolve(undefined));

    const createdAsset = await delegate.createAsset(faker.datatype.uuid(), assetMock());

    expect(ToasterErrorSpy).toBeCalledTimes(1);
    expect(createdAsset).toStrictEqual(undefined);
  });

  test('Should return asset created correctly', async () => {
    const newAsset = assetMock();
    const newUnit = unitMock();
    const newCompany = companyMock();

    newUnit.assets.push(newAsset);
    newCompany.units.push(newUnit);

    const getCompanySpy = () => jest.spyOn(CompanyService, 'getCompany');

    const getCompany = getCompanySpy();
    const getAsset = createAssetSpy();

    getCompany.mockImplementation(() => Promise.resolve(newCompany));

    await delegate.company(newCompany._id);

    getAsset.mockImplementation(() => Promise.resolve(newAsset));
    const createdAsset = await delegate.createAsset(newUnit._id, assetMock());

    expect(ToasterSucessSpy).toBeCalledTimes(1);
    expect(createdAsset).toStrictEqual(newAsset);
  });
});

describe('#delegate.deleteAsset()', () => {
  const deleteAssetSpy = () => jest.spyOn(CompanyService, 'deleteAsset');

  test('Should not delete asset', async () => {
    const deleteAsset = deleteAssetSpy();
    deleteAsset.mockImplementation(() => Promise.resolve(undefined));

    const deleteAssetConfirmation = await delegate.deleteAsset(faker.datatype.uuid());

    expect(ToasterErrorSpy).toBeCalledTimes(1);
    expect(deleteAssetConfirmation).toStrictEqual(false);
  });

  test('Should delete asset correctly', async () => {
    const deleteAsset = deleteAssetSpy();
    deleteAsset.mockImplementation(() => Promise.resolve(true));

    const deleteAssetConfirmation = await delegate.deleteAsset(faker.datatype.uuid());

    expect(ToasterSucessSpy).toBeCalledTimes(1);
    expect(deleteAssetConfirmation).toStrictEqual(true);
  });
});

describe('#delegate.updateAsset()', () => {
  const updateAssetSpy = () => jest.spyOn(CompanyService, 'editAsset');

  test('Should not update asset', async () => {
    const updateAsset = updateAssetSpy();
    updateAsset.mockImplementation(() => Promise.resolve(undefined));

    const updatedAsset = await delegate.updateAsset(assetMock());

    expect(ToasterErrorSpy).toBeCalledTimes(1);
    expect(updatedAsset).toStrictEqual(undefined);
  });

  test('Should update asset correctly', async () => {
    const updateAsset = updateAssetSpy();
    const editedAsset = assetMock();

    updateAsset.mockImplementation(() => Promise.resolve(editedAsset));

    const updatedAsset = await delegate.updateAsset(editedAsset);

    expect(ToasterSucessSpy).toBeCalledTimes(1);
    expect(updatedAsset).toStrictEqual(editedAsset);
  });
});
