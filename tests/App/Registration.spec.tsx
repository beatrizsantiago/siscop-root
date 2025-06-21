import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Registration from '../../src/App/Registration';
import RegisterUseCase from '../../src/usecases/auth/register';

jest.mock('../../src/components/AuthContainer', () => ({ children }: any) => <div>{children}</div>);
jest.mock('../../src/components/GoogleLogin', () => () => <div>GoogleLoginMock</div>);

jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
  Link: ({ to, children }: any) => <a href={to}>{children}</a>,
}));

jest.mock('../../src/usecases/auth/register');

describe('Registration Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the registration form and Google login', () => {
    render(<Registration />);

    expect(screen.getByPlaceholderText(/nome/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument();
    expect(screen.getByText('GoogleLoginMock')).toBeInTheDocument();
  });

  it('should submit the form and navigate on success', async () => {
    const mockExecute = jest.fn().mockResolvedValue(true);
    (RegisterUseCase as jest.Mock).mockImplementation(() => ({
      execute: mockExecute,
    }));

    render(<Registration />);

    fireEvent.change(screen.getByPlaceholderText(/nome/i), {
      target: { value: 'Teste' },
    });
    fireEvent.change(screen.getByPlaceholderText(/e-mail/i), {
      target: { value: 'teste@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/senha/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    await waitFor(() => {
      expect(mockExecute).toHaveBeenCalledWith({
        name: 'Teste',
        email: 'teste@example.com',
        password: '123456',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });
    });
  });

  it('should show error toast on failure', async () => {
    const mockExecute = jest.fn().mockRejectedValue(new Error('fail'));
    (RegisterUseCase as jest.Mock).mockImplementation(() => ({
      execute: mockExecute,
    }));

    render(<Registration />);

    fireEvent.change(screen.getByPlaceholderText(/nome/i), {
      target: { value: 'Teste' },
    });
    fireEvent.change(screen.getByPlaceholderText(/e-mail/i), {
      target: { value: 'teste@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/senha/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Erro ao cadastrar usuário. Verifique os dados e tente novamente.'
      );
    });
  });
});
