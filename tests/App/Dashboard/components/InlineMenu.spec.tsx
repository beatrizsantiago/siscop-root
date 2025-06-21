import { render, screen } from '@testing-library/react';
import { useLocation } from 'react-router';
import InlineMenu from '../../../../src/App/Dashboard/components/InlineMenu';

jest.mock('react-router', () => ({
  useLocation: jest.fn(),
  Link: ({ to, children }: any) => <a href={to}>{children}</a>,
}));

describe('InlineMenu', () => {
  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/dashboard/metas' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render all menu items with correct labels', () => {
    render(<InlineMenu />);

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
  });

  it('should highlight the active menu item based on pathname', () => {
    render(<InlineMenu />);
    const metasItem = screen.getByText('Metas');

    expect(metasItem).toBeInTheDocument();

    expect(metasItem).toHaveStyle({ backgroundColor: 'primary.dark' });
  });
});
