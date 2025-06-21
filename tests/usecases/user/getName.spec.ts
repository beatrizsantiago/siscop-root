import GetNameUseCase from '../../../src/usecases/user/getName';
import { UserRepository } from '../../../src/domain/repositories/UserRepository';

describe('GetNameUseCase', () => {
  const mockUserName = 'Teste';

  const mockUserRepository: UserRepository = {
    getName: jest.fn().mockResolvedValue(mockUserName),
  };

  const useCase = new GetNameUseCase(mockUserRepository);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the user name from the repository', async () => {
    const result = await useCase.execute();

    expect(mockUserRepository.getName).toHaveBeenCalled();
    expect(result).toBe(mockUserName);
  });
});
