import { renderHook } from '@testing-library/react';
import { useNavigate } from 'react-router';
import { localStorageService } from '../../../../src/infrastructure/services/localStorage';
import useLogout from '../../../../src/App/Dashboard/hooks/useLogout';

jest.mock('../../../../src/infrastructure/services/localStorage', () => ({
  localStorageService: {
    clearToken: jest.fn(),
  },
}));

jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}));

describe('useLogout', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should clear token and navigate to login page', () => {
    const { result } = renderHook(() => useLogout());

    result.current.logout();

    expect(localStorageService.clearToken).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });
});
