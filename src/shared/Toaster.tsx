import { green, red } from '@ant-design/colors';
import { notification } from 'antd';

class Toaster {
  successMessage(message: string) {
    notification.success({
      message: '',
      description: message,
      placement: 'bottomRight',
      style: { backgroundColor: green[8], color: '#FFFFFF' },
    });
  }

  errorMessage(message: string) {
    notification.error({
      message: '',
      description: message,
      placement: 'bottomRight',
      style: { backgroundColor: red[8], color: '#FFFFFF' },
    });
  }
}

export default new Toaster();
