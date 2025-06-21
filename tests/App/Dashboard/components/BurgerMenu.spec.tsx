import { render, screen, fireEvent } from '@testing-library/react';
import { useLocation } from 'react-router';
import BurgerMenu from '../../../../src/App/Dashboard/components/BurgerMenu';
import useLogout from '../../../../src/App/Dashboard/hooks/useLogout';

jest.mock('react-router', () => ({
  useLocation: jest.fn(),
  Link: ({ to, children }: any) => <a href={to}>{children}</a>,
}));

jest.mock('../../../../src/App/Dashboard/hooks/useLogout');

describe('BurgerMenu', () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    (useLogout as jest.Mock).mockReturnValue({ logout: mockLogout });
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/dashboard/produtos' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render menu icon initially', () => {
    render(<BurgerMenu />);
    expect(screen.getByTestId('list-icon')).toBeInTheDocument();
  });

  it('should display all menu items when opened', () => {
    render(<BurgerMenu />);
    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByTestId('x-icon')).toBeInTheDocument();

    const expectedLabels = [
      'Produtos',
      'Fazendas',
      'Estoque',
      'Metas',
      'Vendas',
      'Produção',
    ];

    expectedLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    expect(screen.getByText('Sair')).toBeInTheDocument();
  });

  it('should call logout on "Sair" click', () => {
    render(<BurgerMenu />);
    fireEvent.click(screen.getByRole('button'));

    fireEvent.click(screen.getByText('Sair'));
    expect(mockLogout).toHaveBeenCalled();
  });

  it('should close menu when item is clicked', () => {
    render(<BurgerMenu />);
    fireEvent.click(screen.getByRole('button'));

    const produtosItem = screen.getByText('Produtos');
    fireEvent.click(produtosItem);

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Produtos')).toBeInTheDocument();
  });
});
