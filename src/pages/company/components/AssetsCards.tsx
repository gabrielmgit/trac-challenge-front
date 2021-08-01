import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  Badge, Card, Col, Image, List, Row,
} from 'antd';
import React, { useState } from 'react';
import GeneralHealth from '../../../shared/GeneralHealth';
import LoadingWrapper from '../../../shared/LoadingWrapper';
import { statusColorPicker } from '../../../utils/colors';
import {
  CssPropertiesMap,
  IAsset,
  StatusTranslate,
} from '../../../utils/types';
import delegate from '../delegate';
import EditAssetModal from './EditAssetModal';

const Styles: CssPropertiesMap = {
  CardBody: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    height: '450px',
    width: '300px',
  },
};

const Asset: React.FC<{ asset: IAsset; deleteAsset: () => Promise<void> }> = ({
  asset,
  deleteAsset,
}) => {
  const [editedAsset, setEditedAsset] = useState<IAsset>(asset);
  const {
    image, description, name, owner, status, health,
  } = editedAsset;
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };

  return (
    <Col>
      <Badge.Ribbon
        placement="end"
        text={`STATUS: ${StatusTranslate[status]}`}
        color={statusColorPicker(status, 6)}
      >
        <Card
          bordered={false}
          bodyStyle={Styles.CardBody}
          actions={[
            <EditOutlined key="edit" onClick={openModal} />,
            <DeleteOutlined key="delete" onClick={deleteAsset} />,
          ]}
        >
          <Image style={{ maxHeight: '150px' }} src={image} />
          <div>
            <List
              header={(
                <div>
                  {' '}
                  <b> DADOS DA MÁQUINA: </b>
                  {' '}
                </div>
              )}
              style={{ width: '300px', padding: '15px' }}
            >
              <List.Item>
                <b> Nome: </b>
                {' '}
                {name}
              </List.Item>
              <List.Item>
                <b> Saúde </b>
                :
                <GeneralHealth health={health} healthText="" />
              </List.Item>
              <List.Item>
                <b> Descrição: </b>
                {' '}
                {description}
              </List.Item>
              <List.Item>
                <b> Dono: </b>
                {owner}
              </List.Item>
            </List>
          </div>
          <EditAssetModal
            asset={editedAsset}
            setEditedAsset={setEditedAsset}
            showModal={showModal}
            closeModal={closeModal}
          />
        </Card>
      </Badge.Ribbon>
    </Col>
  );
};

const Assets: React.FC<{
  assets: IAsset[];
  setAssets: (assets: IAsset[]) => void;
}> = ({ assets, setAssets }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteAsset = async (assetId: string) => {
    setIsLoading(true);
    const isDeleted = await delegate.deleteAsset(assetId);
    if (isDeleted) {
      const index = assets.findIndex((a) => a._id === assetId);
      setAssets(assets.splice(index, 1));
    }
    setIsLoading(false);
  };

  const assetsMap = assets.map((asset) => (
    <Asset
      key={asset._id}
      asset={asset}
      deleteAsset={() => deleteAsset(asset._id)}
    />
  ));
  return (
    <LoadingWrapper isLoading={isLoading}>
      <Row gutter={[4, 4]}>
        {' '}
        {assetsMap}
        {' '}
      </Row>
    </LoadingWrapper>
  );
};

export default Assets;
