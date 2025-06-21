import { localStorageService } from '../../../src/infrastructure/services/localStorage';

describe('LocalStorageService', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem');
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'removeItem');
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should save a token in localStorage', () => {
    localStorageService.setToken('my-token');

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'my-token');
  });

  it('should get token from localStorage', () => {
    localStorage.getItem = jest.fn().mockReturnValue('token');

    localStorageService.getToken();
    expect(localStorage.getItem).toHaveBeenCalledWith('token');
  });

  it('should remove a token from localStorage', () => {
    localStorageService.clearToken();

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  });
});
