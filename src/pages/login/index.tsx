import React, { useState, useEffect } from 'react';
import { blue } from '@ant-design/colors';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {
  Form, Input, Button, Cascader, Divider,
} from 'antd';
import { useHistory } from 'react-router-dom';
import LoadingWrapper from '../../shared/LoadingWrapper';
import { ReactComponent as ReactLogo } from '../../assets/login.svg';
import delegate, { CompanyOptions } from './delegate';
import COLORS from '../../utils/colors';
import { CssPropertiesMap } from '../../utils/types';

const Styles: CssPropertiesMap = {
  LoginCentralize: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    height: '100%',
  },
  LoginCard: {
    height: '450px',
    width: '300px',
    backgroundColor: COLORS.white,
    borderRadius: '4px',
  },
  Layout: { height: '100%' },
  Header: { padding: '0px' },
  HeaderMenu: { backgroundColor: blue[9], borderBottom: '0px' },
  HeaderMenuContent: { padding: '0 10px', color: COLORS.white },
  LayoutContent: { padding: '0 10px', color: COLORS.white },
};

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState<CompanyOptions[]>([]);
  const [companyId, setCompanyId] = useState<string>('');
  const history = useHistory();

  useEffect(() => {
    const getOptions = async () => {
      const options: CompanyOptions[] | undefined = await delegate.buildCompanyOptions();
      setCompanies(options || []);
      setIsLoading(false);
    };
    getOptions();
  }, []);

  const onFinish = () => {
    history.push(`/${companyId}`);
  };
  return (
    <div
      style={{
        ...Styles.LoginCentralize,
        height: '100%',
      }}
      data-testid="login"
    >
      <LoadingWrapper isLoading={isLoading}>
        <div
          style={Styles.LoginCard}
        >
          <div>
            <ReactLogo style={{ backgroundColor: blue[6] }} />
          </div>
          <div>
            <Form
              form={form}
              layout="inline"
              onFinish={onFinish}
              style={Styles.LoginCentralize}
            >
              <Form.Item name="nome">
                <Input
                  size="small"
                  prefix={<UserOutlined />}
                  placeholder="Nome"
                />
              </Form.Item>

              <Form.Item name="password">
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Senha"
                  size="small"
                />
              </Form.Item>
              <Form.Item>
                <Cascader
                  placeholder="Escolha sua empresa"
                  size="small"
                  options={companies}
                  onChange={(option) => { setCompanyId(option.toString()); }}
                />
              </Form.Item>
              <Divider style={{ margin: '5px' }} />
              <Form.Item shouldUpdate style={{ backgroundColor: blue[0] }}>
                {() => (
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={
                    !form.isFieldsTouched(true)
                    || !!form
                      .getFieldsError()
                      .filter(({ errors }) => errors.length).length
                  }
                  >
                    Entrar
                  </Button>
                )}
              </Form.Item>
            </Form>
          </div>
        </div>
      </LoadingWrapper>
    </div>
  );
};

export default Login;
