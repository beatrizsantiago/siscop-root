import RegisterUseCase from '../../../src/usecases/auth/register';
import { AuthRepository } from '../../../src/domain/repositories/AuthRepository';
import { localStorageService } from '../../../src/infrastructure/services/localStorage';

jest.mock('../../../src/infrastructure/services/localStorage', () => ({
  localStorageService: {
    setToken: jest.fn(),
  },
}));

describe('RegisterUseCase', () => {
  const mockToken = 'register-token';
  const mockAuthRepository: AuthRepository = {
    login: jest.fn(),
    register: jest.fn().mockResolvedValue(mockToken),
    loginWithGoogle: jest.fn(),
  };

  const useCase = new RegisterUseCase(mockAuthRepository);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register a user and store the token', async () => {
    const result = await useCase.execute({
      name: 'Teste',
      email: 'test@example.com',
      password: 'abc123',
    });

    expect(mockAuthRepository.register).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Teste',
        email: 'test@example.com',
        password: 'abc123',
      })
    );

    expect(localStorageService.setToken).toHaveBeenCalledWith(mockToken);
    expect(result).toBe(true);
  });
});
