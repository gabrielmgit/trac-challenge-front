import React, { ReactElement } from 'react';
import CompanyService from '../../services/CompanyService';
import AssetStatusChart from '../../shared/charts/AssetStatusChart';
import Toaster from '../../shared/Toaster';
import {
  IAsset, ICompany, IUnit, NewRegistry,
} from '../../utils/types';

export interface unitPage {
  name: string;
  _id: string;
  numberOfAssets: number;
  generalHealth: number;
  StatusChart: ReactElement;
}

class CompanyDelegate {
  savedCompany?: ICompany;

  async company(companyId: string): Promise<ICompany | undefined> {
    if (!this.savedCompany || this.savedCompany._id !== companyId) {
      const company = await CompanyService.getCompany(companyId);
      this.savedCompany = company;
    }

    return this.savedCompany;
  }

  async createUnit(name: string): Promise<IUnit | undefined> {
    const newUnit = this.savedCompany
      && (await CompanyService.createUnit(this.savedCompany._id, {
        name,
        assets: [],
      }));

    if (this.savedCompany && newUnit) {
      this.savedCompany.units.push(newUnit);
      Toaster.successMessage('Unidade criada com sucesso');
      return newUnit;
    }
    Toaster.errorMessage('Erros para criar a Unidade');
    return undefined;
  }

  async createAsset(
    unitId: string,
    asset: NewRegistry<IAsset>,
  ): Promise<IAsset | undefined> {
    const newAsset = await CompanyService.createAsset(unitId, asset);

    if (this.savedCompany && newAsset) {
      this.savedCompany.units
        .find((unit) => unitId === unit._id)?.assets.push(newAsset);

      Toaster.successMessage('Máquina criada com sucesso');
      return newAsset;
    }
    Toaster.errorMessage('Erros para criar a máquina');
    return undefined;
  }

  async updateAsset(updatedAsset: IAsset): Promise<IAsset | undefined> {
    const editedAsset = await CompanyService.editAsset(updatedAsset);
    if (this.savedCompany && editedAsset) {
      Toaster.successMessage('Máquina editada com sucesso');
      return editedAsset;
    }
    Toaster.errorMessage('Erro para editar a máquina');
    return undefined;
  }

  async deleteAsset(
    assetId: string,
  ): Promise<boolean> {
    const deleteConfirmation = await CompanyService.deleteAsset(assetId);

    if (this.savedCompany && deleteConfirmation) {
      Toaster.successMessage('Máquina removida com sucesso');
      return true;
    }
    Toaster.errorMessage('Erros para criar a máquina');
    return false;
  }

  createUnitCharts(): unitPage[] {
    return (
      this.savedCompany?.units.map((unit: IUnit) => {
        const { assets, _id, name } = unit;
        const StatusChart = (
          <AssetStatusChart assets={assets} unitName={name} />
        );
        const numberOfAssets = assets.length;
        const generalHealth = numberOfAssets
          ? assets.reduce((acc, asset) => acc + asset.health, 0)
            / numberOfAssets
          : 100;
        return {
          _id,
          name,
          generalHealth,
          numberOfAssets,
          StatusChart,
        };
      }) || []
    );
  }
}

export default new CompanyDelegate();
