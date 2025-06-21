import LoginWithGoogleUseCase from '../../../src/usecases/auth/loginWithGoogle';
import { AuthRepository } from '../../../src/domain/repositories/AuthRepository';
import { localStorageService } from '../../../src/infrastructure/services/localStorage';

jest.mock('../../../src/infrastructure/services/localStorage', () => ({
  localStorageService: {
    setToken: jest.fn(),
  },
}));

describe('LoginWithGoogleUseCase', () => {
  const mockToken = 'google-token';
  const mockAuthRepository: AuthRepository = {
    login: jest.fn(),
    register: jest.fn(),
    loginWithGoogle: jest.fn().mockResolvedValue(mockToken),
  };

  const useCase = new LoginWithGoogleUseCase(mockAuthRepository);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should login with Google and store token', async () => {
    const result = await useCase.execute();

    expect(mockAuthRepository.loginWithGoogle).toHaveBeenCalled();
    expect(localStorageService.setToken).toHaveBeenCalledWith(mockToken);
    expect(result).toBe(true);
  });
});
