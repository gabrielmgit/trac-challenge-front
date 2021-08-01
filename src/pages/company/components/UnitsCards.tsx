import { FileAddTwoTone, SettingTwoTone } from '@ant-design/icons';
import {
  Button, Card, Col, Modal, Row,
} from 'antd';
import React, { useState } from 'react';
import GeneralHealthChart from '../../../shared/charts/GeneralHealthChart';
import GeneralHealth from '../../../shared/GeneralHealth';
import type { unitPage } from '../delegate';
import NewAssetModal from './NewAssetModal';

const Unit: React.FC<{
  unit: unitPage;
  configDrawer: (unitId: string) => void;
}> = ({ unit, configDrawer }) => {
  const [showChartModal, setShowChartModal] = useState(false);
  const [showAssetModal, setAssetModal] = useState(false);
  const {
    numberOfAssets, generalHealth, name, _id, StatusChart,
  } = unit;

  const closeChartModal = () => {
    setShowChartModal(false);
  };
  const openChartModal = () => {
    setShowChartModal(true);
  };

  const closeAssetModal = () => {
    setAssetModal(false);
  };
  const openAssetModal = () => {
    setAssetModal(true);
  };
  return (
    <Col>
      <Card
        bordered={false}
        title={(
          <div style={{
            justifyContent: 'center',
            display: 'flex',
          }}
          >
            <b title={`Nº de Máquinas ${numberOfAssets}`}>{`${name}`}</b>
          </div>
)}
        actions={[
          <FileAddTwoTone onClick={() => openAssetModal()}>
            Verificar máquinas dessa unidade
          </FileAddTwoTone>,
          <SettingTwoTone onClick={() => configDrawer(_id)} disabled={!numberOfAssets}>
            Verificar máquinas dessa unidade
          </SettingTwoTone>,
          // TODO: Implement unit editing
          // <EditTwoTone onClick={() => configDrawer(_id)}>
          //   Verificar máquinas dessa unidade
          // </EditTwoTone>,
        ]}
        bodyStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'inline-grid',
          width: '300px',
        }}
      >
        {' '}

        <GeneralHealthChart health={generalHealth} healthTitle="SAÚDE GERAL" />

        <Button
          type="dashed"
          disabled={!numberOfAssets}
          onClick={openChartModal}
        >
          Resumo da Unidade
        </Button>

        <Modal
          title={`Sumario Geral ${name}`}
          bodyStyle={{ height: '300px' }}
          visible={showChartModal}
          onCancel={closeChartModal}
          footer={null}
          closable
          cancelText
        >
          <b>
            <GeneralHealth health={generalHealth} healthText="SAÚDE GERAL: " />
          </b>
          {StatusChart}
        </Modal>
        <NewAssetModal
          closeModal={closeAssetModal}
          showModal={showAssetModal}
          showAsset={() => configDrawer(_id)}
          unitName={name}
          unitId={_id}
        />
      </Card>
    </Col>
  );
};

const Units: React.FC<{
  units: unitPage[];
  configDrawer: (unitId: string) => void;
}> = ({ units, configDrawer }) => {
  const unitsMap = units.map((unit) => (
    <Unit unit={unit} key={unit._id} configDrawer={configDrawer} />
  ));
  return (
    <Row gutter={[8, 8]}>
      {' '}
      {unitsMap}
      {' '}
    </Row>
  );
};

export default Units;
