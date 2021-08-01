/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import {
  IAsset, ICompany, IUnit, NewRegistry,
} from '../utils/types';

// TODO: Put this variable in an env file
const API_URL = 'https://tracback.herokuapp.com';

class CompanyService {
  async getCompanies(): Promise<ICompany[] | undefined> {
    try {
      const response = await axios.get(`${API_URL}/company`);
      const companies: ICompany[] = response.data;
      return companies;
    } catch (error: any) {
      if (!error.isAxiosError) {
        console.error(error);
      }
      return undefined;
    }
  }

  async getCompany(companyId: string): Promise<ICompany | undefined> {
    try {
      const response = await axios.get(`${API_URL}/company/${companyId}`);
      const company: ICompany = response.data;
      return company;
    } catch (error: any) {
      if (!error.isAxiosError) {
        console.error(error);
      }
      return undefined;
    }
  }

  async editAsset(updatedAsset: IAsset): Promise<IAsset | undefined> {
    try {
      const response = await axios.patch(
        `${API_URL}/asset/${updatedAsset._id}`,
        updatedAsset,
      );
      const asset: IAsset = response.data;
      return asset;
    } catch (error: any) {
      if (!error.isAxiosError) {
        console.error(error);
      }
      return undefined;
    }
  }

  async deleteAsset(assetId: string): Promise<boolean | undefined> {
    try {
      await axios.delete(
        `${API_URL}/asset/${assetId}`,
      );

      return true;
    } catch (error: any) {
      if (!error.isAxiosError) {
        console.error(error);
      }
      return undefined;
    }
  }

  async createAsset(
    unitId: string,
    asset: NewRegistry<IAsset>,
  ): Promise<IAsset | undefined> {
    try {
      const response = await axios.post(
        `${API_URL}/unit/${unitId}/asset`,
        asset,
      );
      const newAsset: IAsset = response.data;
      return newAsset;
    } catch (error: any) {
      if (!error.isAxiosError) {
        console.error(error);
      }
      return undefined;
    }
  }

  async createUnit(
    companyId: string,
    unit: NewRegistry<IUnit>,
  ): Promise<IUnit | undefined> {
    try {
      const response = await axios.post(
        `${API_URL}/company/${companyId}/unit`,
        unit,
      );
      const newUnit: IUnit = response.data;
      return newUnit;
    } catch (error: any) {
      if (!error.isAxiosError) {
        console.error(error);
      }
      return undefined;
    }
  }
}

export default new CompanyService();
