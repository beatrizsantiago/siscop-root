import { render, screen } from '@testing-library/react';
import { useLocation } from 'react-router';
import Dashboard from '../../../src/App/Dashboard';

jest.mock('react-router', () => ({
  useLocation: jest.fn(),
  Outlet: () => <div data-testid="outlet" />,
}));

jest.mock('../../../src/App/Dashboard/components/Navbar', () => () => <div data-testid="navbar" />);
jest.mock('../../../src/App/Dashboard/components/ListMenu', () => () => <div data-testid="list-menu" />);

describe('Dashboard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Navbar and ListMenu when path is exactly "/dashboard"', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/dashboard' });

    render(<Dashboard />);

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('list-menu')).toBeInTheDocument();
    expect(screen.queryByTestId('outlet')).not.toBeInTheDocument();
  });

  it('should render Navbar and Outlet when path is "/dashboard/fazendas" or deeper', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/dashboard/fazendas' });

    render(<Dashboard />);

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
    expect(screen.queryByTestId('list-menu')).not.toBeInTheDocument();
  });
});
