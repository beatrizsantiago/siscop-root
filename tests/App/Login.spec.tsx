import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Login from '../../src/App/Login';
import LoginUseCase from '../../src/usecases/auth/login';

jest.mock('../../src/components/AuthContainer', () => ({ children }: any) => <div>{children}</div>);
jest.mock('../../src/components/GoogleLogin', () => () => <div>GoogleLoginMock</div>);

jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
  Link: ({ to, children }: any) => <a href={to}>{children}</a>,
}));

jest.mock('../../src/usecases/auth/login');

describe('Login Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the login form and Google login', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    expect(screen.getByText('GoogleLoginMock')).toBeInTheDocument();
  });

  it('should submit the form and navigate on success', async () => {
    const mockExecute = jest.fn().mockResolvedValue(true);
    (LoginUseCase as jest.Mock).mockImplementation(() => ({
      execute: mockExecute,
    }));

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/e-mail/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/senha/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(mockExecute).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: '123456',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });
    });
  });

  it('should show error toast on failure', async () => {
    const mockExecute = jest.fn().mockRejectedValue(new Error('fail'));
    (LoginUseCase as jest.Mock).mockImplementation(() => ({
      execute: mockExecute,
    }));

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/e-mail/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/senha/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Erro ao fazer login. Verifique os dados e tente novamente.'
      );
    });
  });
});
