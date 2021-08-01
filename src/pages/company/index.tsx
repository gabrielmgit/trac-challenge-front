import { blue } from '@ant-design/colors';
import { FileAddOutlined, SettingFilled } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import * as Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more.js';
import solidGauge from 'highcharts/modules/solid-gauge.js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingWrapper from '../../shared/LoadingWrapper';
import NewNameModal from '../../shared/NewNameModal';
import COLORS from '../../utils/colors';
import { CssPropertiesMap, ICompany, IUnit } from '../../utils/types';
import UnitDrawer from './components/UnitDrawer';
import Units from './components/UnitsCards';
import delegate from './delegate';

highchartsMore(Highcharts);
solidGauge(Highcharts);

const { Content } = Layout;

const Styles: CssPropertiesMap = {
  Layout: { height: '100%' },
  Header: { padding: '10px' },
  HeaderMenu: { backgroundColor: blue[9], borderBottom: '0px' },
  HeaderMenuContent: { padding: '0 10px', color: COLORS.white, width: '100%' },
  LayoutContent: { padding: '0 0px', color: COLORS.white },
};

const Company: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [company, setCompany] = useState<ICompany>();
  const { companyId } = useParams<{ companyId: string }>();
  const [showUnitDrawer, setShowUnitDrawer] = useState<boolean>(false);
  const [unit, setUnit] = useState<IUnit>();
  const [showUnitModal, setShowUnitModal] = useState<boolean>(false);

  const configDrawer = (unitId: string) => {
    setUnit(company?.units.find((unit) => unit._id === unitId));
    setShowUnitDrawer(true);
  };

  useEffect(() => {
    const getCompany = async () => {
      const company: ICompany | undefined = await delegate.company(companyId);
      setCompany(company);
      setIsLoading(false);
    };
    getCompany();
  }, []);

  return (
    <>
      <div style={{ color: COLORS.white }}>
        <Layout style={Styles.Layout} data-testid="company">
          <Content style={Styles.LayoutContent} className="default-gradient">
            <Menu
              style={Styles.HeaderMenuContent}
              theme="dark"
              mode="horizontal"
              selectedKeys={[]}
            >
              <Menu.Item disabled key="1">
                {' '}
                <div style={Styles.HeaderMenuContent}>
                  <b>
                    {' '}
                    {company?.name}
                    {' '}
                  </b>

                  <SettingFilled />
                </div>
              </Menu.Item>
              <Menu.Item key="2" onClick={() => setShowUnitModal(true)}>
                <Button type="dashed" ghost>
                  <FileAddOutlined title=" Adicionar nova unidade" />
                  {' '}
                  Adicionar Nova Unidade
                </Button>
              </Menu.Item>
            </Menu>
            <LoadingWrapper isLoading={isLoading}>
              <div style={Styles.Header}>
                {company && (
                  <Units
                    configDrawer={configDrawer}
                    units={delegate.createUnitCharts()}
                  />
                )}
              </div>
              {unit && (
                <UnitDrawer
                  showUnitDrawer={showUnitDrawer}
                  setShowUnitDrawer={setShowUnitDrawer}
                  unit={unit}
                />
              )}
            </LoadingWrapper>
          </Content>
        </Layout>
        <NewNameModal
          setShowModal={setShowUnitModal}
          showModal={showUnitModal}
          action={async (name: string) => {
            await delegate.createUnit(name);
          }}
        />
      </div>
    </>
  );
};

export default Company;
