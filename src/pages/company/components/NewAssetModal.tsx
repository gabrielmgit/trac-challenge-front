import {
  Button, Form, Input, InputNumber, Modal, Select,
} from 'antd';
import React, { useEffect, useState } from 'react';
import LoadingWrapper from '../../../shared/LoadingWrapper';
import setInputEvent from '../../../utils/handleInputEvent';
import {
  ASSET_STATUS, IAsset, NewRegistry, StatusTranslate,
} from '../../../utils/types';
import delegate from '../delegate';

interface NewAssetModalProps {
  closeModal: () => void;
  showAsset: () => void;
  showModal: boolean;
  unitName: string;
  unitId: string,
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const NewAssetModal: React.FC<NewAssetModalProps> = ({
  showModal,
  showAsset,
  closeModal,
  unitName,
  unitId,
}) => {
  const [form] = Form.useForm();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [owner, setOwner] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [status, setStatus] = useState<ASSET_STATUS>(ASSET_STATUS.Running);
  const [health, setHealth] = useState<number>(100);
  const [isLoading, setIsLoading] = useState(false);

  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate(isLoading);
  }, [isLoading]);

  const handleSubmit = async () => {
    const newAsset: NewRegistry<IAsset> = {
      name,
      description,
      owner,
      image,
      status,
      health,
    };
    form.resetFields();
    setIsLoading(true);
    await delegate.createAsset(unitId, newAsset);
    setIsLoading(false);
    closeModal();
    showAsset();
  };

  return (
    <Modal
      title={`Criar nova máquina - ${unitName}`}
      visible={showModal}
      onCancel={closeModal}
      footer={null}
      closable
      cancelText
    >
      <LoadingWrapper isLoading={isLoading}>
        <Form
          labelCol={formItemLayout.labelCol}
          wrapperCol={formItemLayout.wrapperCol}
          name="newAsset"
          onFinish={() => handleSubmit()}
          form={form}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Nome"
            tooltip="Qual sera o nome da máquina"
            rules={[
              {
                required: true,
                message: 'Coloque o nome da máquina',
                whitespace: true,
              },
            ]}
          >
            <Input value={name} onChange={setInputEvent(setName)} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Descrição"
            rules={[{ whitespace: true }]}
          >
            <Input value={description} onChange={setInputEvent(setDescription)} />
          </Form.Item>

          <Form.Item
            name="owner"
            label="Dono da máquina"
            tooltip="Quem é o dono da máquina?"
            rules={[
              {
                required: true,
                message: 'Coloque o nome do Dono da máquina',
                whitespace: true,
              },
            ]}
          >
            <Input value={owner} onChange={setInputEvent(setOwner)} />
          </Form.Item>

          <Form.Item
            name="image"
            label="Link da imagem"
            rules={[
              { type: 'url', message: 'Coloque o link da imagem' },
              { required: true, message: 'Coloque o link da imagem' },
            ]}
          >
            <Input value={image} onChange={setInputEvent(setImage)} />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Escolha o status da máquina' }]}
          >
            <Select
              placeholder="Escolha o status da máquina"
              value={status}
              onChange={(value: ASSET_STATUS) => setStatus(value)}
            >
              <Select.Option value="RUNNING">{StatusTranslate.RUNNING}</Select.Option>
              <Select.Option value="STOPPED">{StatusTranslate.STOPPED}</Select.Option>
              <Select.Option value="ALERTING">{StatusTranslate.ALERTING}</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="health"
            label="Saúde da máquina (%)"
            rules={[
              {
                type: 'number',
                min: 0,
                max: 100,
                message: 'Saúde deve ser um número de 0 a 100',
              },
              { required: true, message: 'Saúde obrigatória' },
            ]}
          >
            <InputNumber value={health} onChange={(value: number) => setHealth(value)} />
          </Form.Item>
          <Form.Item
            wrapperCol={tailFormItemLayout.wrapperCol}
          >
            <Button onClick={closeModal}>Fechar</Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ margin: '0 8px' }}
              disabled={
                !form.isFieldsTouched(true)
                || !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Salvar máquina
            </Button>
          </Form.Item>
        </Form>
      </LoadingWrapper>
    </Modal>
  );
};

export default NewAssetModal;
