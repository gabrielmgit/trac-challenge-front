/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const setInputEvent = function (setState: (value: any) => void) {
  return (e: React.FormEvent<HTMLInputElement>): void => setState(e.currentTarget.value);
};

export default setInputEvent;
