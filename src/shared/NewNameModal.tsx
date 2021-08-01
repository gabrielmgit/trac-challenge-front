import { BuildOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import setInputEvent from '../utils/handleInputEvent';
import LoadingWrapper from './LoadingWrapper';

interface NewNameModalProps {
    showModal: boolean,
    setShowModal: (value: boolean) => void,
    action: (name: string) => Promise<void>,
    oldName?: string
}

const NewNameModal: React.FC<NewNameModalProps> = ({
  showModal, setShowModal, action, oldName,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>(oldName || '');

  const handleOk = async () => {
    setIsLoading(true);
    await action(name);
    setShowModal(false);
    setIsLoading(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <Modal
      title="Adicionar Nova Unidade"
      visible={showModal}
      okButtonProps={{ disabled: !name }}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <LoadingWrapper isLoading={isLoading}>
        <Input
          size="large"
          required
          placeholder="Nome da nova unidade"
          prefix={<BuildOutlined />}
          onChange={setInputEvent(setName)}
        />
      </LoadingWrapper>
    </Modal>
  );
};

export default NewNameModal;
