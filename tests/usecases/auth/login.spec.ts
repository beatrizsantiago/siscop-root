import LoginUseCase from '../../../src/usecases/auth/login';
import { AuthRepository } from '../../../src/domain/repositories/AuthRepository';
import { localStorageService } from '../../../src/infrastructure/services/localStorage';

jest.mock('../../../src/infrastructure/services/localStorage', () => ({
  localStorageService: {
    setToken: jest.fn(),
  },
}));

describe('LoginUseCase', () => {
  const mockToken = 'mocked-token';
  const mockAuthRepository: AuthRepository = {
    login: jest.fn().mockResolvedValue(mockToken),
    register: jest.fn(),
    loginWithGoogle: jest.fn(),
  };

  const loginUseCase = new LoginUseCase(mockAuthRepository);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should login user and store token', async () => {
    const result = await loginUseCase.execute({
      email: 'test@example.com',
      password: '123456',
    });

    expect(mockAuthRepository.login).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'test@example.com',
        password: '123456',
      })
    );

    expect(localStorageService.setToken).toHaveBeenCalledWith(mockToken);
    expect(result).toBe(true);
  });
});
