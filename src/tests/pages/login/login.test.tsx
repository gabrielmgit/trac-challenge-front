import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Login from '../../../pages/login';
import delegate from '../../../pages/login/delegate';
import '../../__setup__/matchMedia.mock.js';

const spy = jest.spyOn(delegate, 'buildCompanyOptions');
spy.mockImplementation(() => Promise.resolve([{
  value: 'name', label: 'id',
}]));

test('renders learn react link', async () => {
  await waitFor(() => render(<Login />));
  const linkElement = screen.getByTestId('login');
  expect(linkElement).toBeInTheDocument();
});
