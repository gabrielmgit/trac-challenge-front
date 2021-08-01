import { AxiosError } from 'axios';

const axiosErrorMock: AxiosError = {
  isAxiosError: true,
  config: {},
  toJSON: () => Object({}),
  name: 'axios error',
  message: 'axios error',
};

export default axiosErrorMock;
