import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotificationButton from '../../../../src/App/Dashboard/components/NotificationButton';

jest.mock('../../../../src/App/Dashboard/components/NotificationList', () => {
  return ({ onClose }: { onClose: () => void }) => (
    <div data-testid="notification-list">
      <button onClick={onClose}>Close</button>
    </div>
  );
});

describe('NotificationButton component', () => {
  it('renders the bell icon button', () => {
    render(<NotificationButton />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('toggles NotificationList on icon click', () => {
    render(<NotificationButton />);
    const iconButton = screen.getByRole('button');

    expect(screen.queryByTestId('notification-list')).toBeNull();

    fireEvent.click(iconButton);
    expect(screen.getByTestId('notification-list')).toBeInTheDocument();

    fireEvent.click(iconButton);
    expect(screen.queryByTestId('notification-list')).toBeNull();
  });

  it('closes NotificationList when onClose is called', () => {
    render(<NotificationButton />);
    const iconButton = screen.getByRole('button');

    fireEvent.click(iconButton);
    expect(screen.getByTestId('notification-list')).toBeInTheDocument();

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(screen.queryByTestId('notification-list')).toBeNull();
  });
});
