import Toaster from '../../shared/Toaster';
import CompanyService from '../../services/CompanyService';

export interface CompanyOptions {
    value: string,
    label: string
}

class LoginDelegate {
  async buildCompanyOptions(): Promise<CompanyOptions[] | undefined> {
    const companies = await CompanyService.getCompanies();
    if (companies) {
      return companies.map((c) => ({ value: c._id, label: c.name }));
    }
    Toaster.errorMessage('Problemas para estabelecer a conexão com o servidor');
    return undefined;
  }
}

export default new LoginDelegate();
