import { render, screen } from '@testing-library/react';
import CryptoList from './components/cryptoList/CryptoList';

test('renders learn react link', () => {
  render(<CryptoList />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
