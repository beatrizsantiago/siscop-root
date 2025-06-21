import { render, screen } from '@testing-library/react';
import { useMediaQuery } from '@mui/material';
import ListMenu from '../../../../src/App/Dashboard/components/ListMenu';

jest.mock('react-router', () => ({
  Link: ({ to, children }: any) => <a href={to}>{children}</a>,
}));

jest.mock('@mui/material', () => {
  const actual = jest.requireActual('@mui/material');
  return {
    ...actual,
    useMediaQuery: jest.fn(),
  };
});

describe('ListMenu', () => {
  beforeEach(() => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render greeting and instruction texts', () => {
    render(<ListMenu />);
    expect(screen.getByText(/Olá, bem vindo/i)).toBeInTheDocument();
    expect(screen.getByText(/Escolha uma área para começar/i)).toBeInTheDocument();
  });

  it('should render all menu cards with icon, label, and description', () => {
    render(<ListMenu />);

    const expectedItems = [
      { label: 'Produtos', description: /adicione.*remova/i },
      { label: 'Fazendas', description: /crie.*exclua/i },
      { label: 'Estoque', description: /organização.*vendas/i },
      { label: 'Metas', description: /desempenho.*resultados/i },
      { label: 'Vendas', description: /rentáveis.*lucrativos/i },
      { label: 'Produção', description: /plantio.*colhidas/i },
    ];

    expectedItems.forEach(({ label, description }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    });
  });
});
