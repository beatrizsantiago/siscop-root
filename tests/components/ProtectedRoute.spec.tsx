import { useNavigation, MemoryRouter, Routes, Route } from 'react-router';
import { render, screen } from '@testing-library/react';
import { localStorageService } from '../../src/infrastructure/services/localStorage';
import ProtectedRoute from '../../src/components/ProtectedRoute';

jest.mock('../../src/components/PreloadModules', () => () => null);
jest.mock('../../src/infrastructure/services/localStorage', () => ({
  localStorageService: {
    getToken: jest.fn(),
  },
}));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigation: jest.fn(),
}));

describe('ProtectedRoute', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const TestComponent = () => <div>Protected Content</div>;

  const renderWithRoute = () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/" element={<div>Login Page</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/protected" element={<TestComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  };

  it('should redirect to login if no token exists', () => {
    (localStorageService.getToken as jest.Mock).mockReturnValue(null);
    (useNavigation as jest.Mock).mockReturnValue({ state: 'idle' });

    renderWithRoute();

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('should render protected content if token exists and not loading', () => {
    (localStorageService.getToken as jest.Mock).mockReturnValue('token123');
    (useNavigation as jest.Mock).mockReturnValue({ state: 'idle' });

    renderWithRoute();

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should render loading indicator if navigation is loading', () => {
    (localStorageService.getToken as jest.Mock).mockReturnValue('token123');
    (useNavigation as jest.Mock).mockReturnValue({ state: 'loading' });

    renderWithRoute();

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });
});
