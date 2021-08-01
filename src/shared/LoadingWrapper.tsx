import { Spin } from 'antd';
import React from 'react';

const LoadingWrapper: React.FC<{ isLoading: boolean }> = ({ isLoading, children }) => (
  isLoading
    ? (
      <Spin>
        { children }
      </Spin>
    )
    : (
      <>
        {' '}
        { children }
        {' '}
      </>
    )
);

export default LoadingWrapper;
