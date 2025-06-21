import { render, screen, fireEvent } from '@testing-library/react';
import { useLocation, useNavigate } from 'react-router';
import { useMediaQuery } from '@mui/material';
import Navbar from '../../../../src/App/Dashboard/components/Navbar';

jest.mock('../../../../src/App/Dashboard/components/InlineMenu', () => () => <div data-testid="inline-menu" />);
jest.mock('../../../../src/App/Dashboard/components/BurgerMenu', () => () => <div data-testid="burger-menu" />);
jest.mock('../../../../src/App/Dashboard/components/LogoutButton', () => () => <div data-testid="logout-button" />);

jest.mock('react-router', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('@mui/material', () => {
  const actual = jest.requireActual('@mui/material');
  return {
    ...actual,
    useMediaQuery: jest.fn(),
  };
});

describe('Navbar', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render only LogoutButton when pathname is "/dashboard"', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/dashboard' });
    (useMediaQuery as jest.Mock).mockReturnValue(true);

    render(<Navbar />);
    expect(screen.queryByTestId('inline-menu')).not.toBeInTheDocument();
    expect(screen.queryByTestId('burger-menu')).not.toBeInTheDocument();
    expect(screen.getByTestId('logout-button')).toBeInTheDocument();
  });

  it('should render InlineMenu and LogoutButton on big screens (pathname != "/dashboard")', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/dashboard/fazendas' });
    (useMediaQuery as jest.Mock).mockReturnValue(true);

    render(<Navbar />);
    expect(screen.getByTestId('inline-menu')).toBeInTheDocument();
    expect(screen.getByTestId('logout-button')).toBeInTheDocument();
    expect(screen.queryByTestId('burger-menu')).not.toBeInTheDocument();
  });

  it('should render BurgerMenu on small screens (pathname != "/dashboard")', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/dashboard/produtos' });
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    render(<Navbar />);
    expect(screen.getByTestId('burger-menu')).toBeInTheDocument();
    expect(screen.queryByTestId('inline-menu')).not.toBeInTheDocument();
    expect(screen.queryByTestId('logout-button')).not.toBeInTheDocument();
  });

  it('should navigate to "/dashboard" when logo is clicked', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/dashboard/produtos' });
    (useMediaQuery as jest.Mock).mockReturnValue(true);

    render(<Navbar />);
    fireEvent.click(screen.getByAltText('logo'));
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});
