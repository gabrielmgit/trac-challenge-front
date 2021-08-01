import {
  Button, Form, Input,
  Modal,
} from 'antd';
import React, { useEffect, useState } from 'react';
import LoadingWrapper from '../../../shared/LoadingWrapper';
import setInputEvent from '../../../utils/handleInputEvent';
import { IAsset } from '../../../utils/types';
import delegate from '../delegate';

interface EditAssetModalProps {
  closeModal: () => void;
  setEditedAsset: (editedAsset: IAsset) => void;
  showModal: boolean;
  asset: IAsset;
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

const EditAssetModal: React.FC<EditAssetModalProps> = ({
  showModal,
  closeModal,
  setEditedAsset,
  asset,
}) => {
  const [form] = Form.useForm();
  const [name, setName] = useState<string>(asset.name);
  const [description, setDescription] = useState<string>(asset.description);
  const [owner, setOwner] = useState<string>(asset.owner);
  const [image, setImage] = useState<string>(asset.image);
  const [isLoading, setIsLoading] = useState(false);

  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const handleSubmit = async () => {
    const newAsset: IAsset = {
      ...asset,
      name,
      description,
      owner,
      image,
    };
    setIsLoading(true);
    const updatedAsset = await delegate.updateAsset(newAsset);
    if (updatedAsset) setEditedAsset(updatedAsset);
    form.resetFields();
    setIsLoading(false);
    closeModal();
  };

  return (
    <Modal
      title={`Editar máquina - ${asset.name}`}
      visible={showModal}
      onCancel={closeModal}
      zIndex={5000}
      footer={null}
      closable
      forceRender
      cancelText
    >
      <LoadingWrapper isLoading={isLoading}>
        <Form
          labelCol={formItemLayout.labelCol}
          wrapperCol={formItemLayout.wrapperCol}
          name="register"
          onFinish={() => handleSubmit()}
          form={form}
          initialValues={{ ...asset }}
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
            wrapperCol={tailFormItemLayout.wrapperCol}
          >
            <Button onClick={closeModal}>Fechar</Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ margin: '0 8px' }}
              disabled={
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
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

export default EditAssetModal;
