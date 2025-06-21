import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GoogleLogin from '../../src/components/GoogleLogin';
import LoginUseCase from '../../src/usecases/auth/loginWithGoogle';

jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../../src/usecases/auth/loginWithGoogle');

describe('GoogleLogin', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render login button', () => {
    render(<GoogleLogin />);
    expect(screen.getByRole('button', { name: /entrar com google/i })).toBeInTheDocument();
  });

  it('should execute login and navigate to dashboard on success', async () => {
    const executeMock = jest.fn().mockResolvedValue(true);
    (LoginUseCase as jest.Mock).mockImplementation(() => ({
      execute: executeMock,
    }));

    render(<GoogleLogin />);
    fireEvent.click(screen.getByRole('button', { name: /entrar com google/i }));

    await waitFor(() => {
      expect(executeMock).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });
    });
  });

  it('should show error toast on failure', async () => {
    const executeMock = jest.fn().mockRejectedValue(new Error('login failed'));
    (LoginUseCase as jest.Mock).mockImplementation(() => ({
      execute: executeMock,
    }));

    render(<GoogleLogin />);
    fireEvent.click(screen.getByRole('button', { name: /entrar com google/i }));

    await waitFor(() => {
      expect(executeMock).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('Erro ao fazer login. Verifique os dados e tente novamente.');
    });
  });
});
