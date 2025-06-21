import { render, screen, fireEvent } from '@testing-library/react';
import LogoutButton from '../../../../src/App/Dashboard/components/LogoutButton';
import useLogout from '../../../../src/App/Dashboard/hooks/useLogout';

jest.mock('../../../../src/App/Dashboard/hooks/useLogout');

describe('LogoutButton', () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    (useLogout as jest.Mock).mockReturnValue({ logout: mockLogout });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the logout button with icon and label', () => {
    render(<LogoutButton />);
    expect(screen.getByRole('button', { name: /sair/i })).toBeInTheDocument();
    expect(screen.getByTestId('signout-icon')).toBeInTheDocument();
  });

  it('should call logout function when clicked', () => {
    render(<LogoutButton />);
    fireEvent.click(screen.getByRole('button', { name: /sair/i }));
    expect(mockLogout).toHaveBeenCalled();
  });
});
