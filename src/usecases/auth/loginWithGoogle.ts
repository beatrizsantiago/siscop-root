import { AuthRepository } from '@domain/repositories/AuthRepository';
import { localStorageService } from '@infrastructure/services/localStorage';

class LoginWithGoogleUseCase {
  constructor(private repository: AuthRepository) {}

  async execute() {
    const token = await this.repository.loginWithGoogle();
    localStorageService.setToken(token);
    return true;
  };
};

export default LoginWithGoogleUseCase;
