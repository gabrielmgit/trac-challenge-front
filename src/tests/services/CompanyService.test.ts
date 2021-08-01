import axios from 'axios';
import CompanyService from '../../services/CompanyService';
import axiosErrorMock from '../__mocks__/axios.mocks';
import {
  assetMock, companiesMock, companyMock, unitMock,
} from '../__mocks__/mocks';

describe('#getCompanies', () => {
  test('Should return companies correctly', async () => {
    const getCompanySpy = jest.spyOn(axios, 'get');
    getCompanySpy.mockImplementation(() => Promise.resolve({ data: companiesMock }));

    const response = await CompanyService.getCompanies();
    expect(response).toStrictEqual(companiesMock);
  });
  test('Should not return', async () => {
    const getCompanySpy = jest.spyOn(axios, 'get');
    getCompanySpy.mockImplementation(() => Promise.reject(axiosErrorMock));

    const response = await CompanyService.getCompanies();
    expect(response).toStrictEqual(undefined);
  });
});

describe('#getCompany', () => {
  const company = companyMock();
  test('Should return an company', async () => {
    const getCompanySpy = jest.spyOn(axios, 'get');
    getCompanySpy.mockImplementation(() => Promise.resolve({ data: company }));

    const response = await CompanyService.getCompany(company._id);
    expect(response).toStrictEqual(company);
  });
  test('Should not return', async () => {
    const getCompanySpy = jest.spyOn(axios, 'get');
    getCompanySpy.mockImplementation(() => Promise.reject(axiosErrorMock));

    const response = await CompanyService.getCompany(company._id);
    expect(response).toStrictEqual(undefined);
  });
});

describe('#editAsset', () => {
  const asset = assetMock();
  test('Should return an asset', async () => {
    const patchAssetSpy = jest.spyOn(axios, 'patch');
    patchAssetSpy.mockImplementation(() => Promise.resolve({ data: asset }));

    const response = await CompanyService.editAsset(asset);
    expect(response).toStrictEqual(asset);
  });
  test('Should not return', async () => {
    const patchAssetSpy = jest.spyOn(axios, 'patch');
    patchAssetSpy.mockImplementation(() => Promise.reject(axiosErrorMock));

    const response = await CompanyService.editAsset(asset);
    expect(response).toStrictEqual(undefined);
  });
});

describe('#deleteAsset', () => {
  const asset = assetMock();
  test('Should return an asset', async () => {
    const deleteAssetSpy = jest.spyOn(axios, 'delete');
    deleteAssetSpy.mockImplementation(() => Promise.resolve({}));

    const response = await CompanyService.deleteAsset(asset._id);
    expect(response).toStrictEqual(true);
  });
  test('Should not return', async () => {
    const deleteAssetSpy = jest.spyOn(axios, 'delete');
    deleteAssetSpy.mockImplementation(() => Promise.reject(axiosErrorMock));

    const response = await CompanyService.deleteAsset(asset._id);
    expect(response).toStrictEqual(undefined);
  });
});

describe('#createAsset', () => {
  const asset = assetMock();
  test('Should return an asset', async () => {
    const postAssetSpy = jest.spyOn(axios, 'post');
    postAssetSpy.mockImplementation(() => Promise.resolve({ data: asset }));

    const response = await CompanyService.createAsset(asset._id, asset);
    expect(response).toStrictEqual(asset);
  });
  test('Should not return', async () => {
    const postAssetSpy = jest.spyOn(axios, 'post');
    postAssetSpy.mockImplementation(() => Promise.reject(axiosErrorMock));

    const response = await CompanyService.createAsset(asset._id, asset);
    expect(response).toStrictEqual(undefined);
  });
});

describe('#createUnit', () => {
  const unit = unitMock();
  test('Should return an unit', async () => {
    const postUnitSpy = jest.spyOn(axios, 'post');
    postUnitSpy.mockImplementation(() => Promise.resolve({ data: unit }));

    const response = await CompanyService.createUnit(unit._id, unit);
    expect(response).toStrictEqual(unit);
  });
  test('Should not return', async () => {
    const postUnitSpy = jest.spyOn(axios, 'post');
    postUnitSpy.mockImplementation(() => Promise.reject(axiosErrorMock));

    const response = await CompanyService.createUnit(unit._id, unit);
    expect(response).toStrictEqual(undefined);
  });
});
