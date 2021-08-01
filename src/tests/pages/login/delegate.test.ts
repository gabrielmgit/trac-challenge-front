import '@testing-library/jest-dom';
import delegate from '../../../pages/login/delegate';
import CompanyService from '../../../services/CompanyService';
import Toaster from '../../../shared/Toaster';
import { companiesMock } from '../../__mocks__/mocks';

const companies = companiesMock;
const mockGetCompaniesOk = () => {
  jest.spyOn(CompanyService, 'getCompanies').mockImplementation(() => Promise.resolve(companies));
};

const mockGetCompaniesErr = () => {
  jest.spyOn(CompanyService, 'getCompanies').mockImplementation(() => Promise.resolve(undefined));
};

const ToasterErrorSpy = jest.spyOn(Toaster, 'errorMessage');

describe('#delegate.buildCompanyOptions()', () => {
  test('Should builCompanyOptions correctly', async () => {
    mockGetCompaniesOk();
    const buildCompanies = await delegate.buildCompanyOptions();
    expect(buildCompanies).toStrictEqual(companies.map((c) => ({ value: c._id, label: c.name })));
  });

  test('Should not builCompanyOptions', async () => {
    mockGetCompaniesErr();
    const buildCompanies = await delegate.buildCompanyOptions();
    expect(ToasterErrorSpy).toBeCalledTimes(1);
    expect(buildCompanies).toStrictEqual(undefined);
  });
});
