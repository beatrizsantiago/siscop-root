import { toast } from 'react-toastify';
import { DocumentSnapshot } from 'firebase/firestore';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NotificationList from '../../../../src/App/Dashboard/components/NotificationList';
import Notification from '../../../../src/domain/entities/Notification';

jest.mock('date-fns', () => ({
  formatDate: jest.fn((date, fmt) => '01/01/2025 às 12:00h'),
}));

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({ useNavigate: () => mockNavigate }));

const mockExecute = jest.fn();
jest.mock('@usecases/notification/getAllPaginated', () => {
  return jest.fn().mockImplementation(() => ({ execute: mockExecute }));
});

const sampleNotifications = [
  new Notification('1', 'SALE', 'Farm A', new Date()),
  new Notification('2', 'HARVEST', 'Farm B', new Date()),
];

describe('NotificationList component', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders no notifications message when list is empty', async () => {
    mockExecute.mockResolvedValueOnce({ list: [], lastDoc: undefined, hasMore: false });

    render(<NotificationList onClose={onClose} />);

    await waitFor(() => expect(mockExecute).toHaveBeenCalled());

    expect(screen.getByText('No momento não há notificações.')).toBeInTheDocument();
  });

  it('renders notifications and handles click', async () => {
    mockExecute.mockResolvedValueOnce({ list: sampleNotifications, lastDoc: undefined, hasMore: false });

    render(<NotificationList onClose={onClose} />);

    await waitFor(() => expect(mockExecute).toHaveBeenCalled());

    fireEvent.click(screen.getByText(/Farm A/));

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/metas');
    expect(onClose).toHaveBeenCalled();
  });

  it('shows load more button and fetches more on click', async () => {
    const mockLastDoc = {} as DocumentSnapshot;
    mockExecute.mockResolvedValueOnce({ list: sampleNotifications, lastDoc: mockLastDoc, hasMore: true });
    const moreNotifications = [new Notification('3', 'SALE', 'Farm C', new Date())];
    mockExecute.mockResolvedValueOnce({ list: moreNotifications, lastDoc: undefined, hasMore: false });

    render(<NotificationList onClose={onClose} />);

    await waitFor(() => expect(mockExecute).toHaveBeenCalledTimes(1));

    const loadMoreButton = screen.getByRole('button', { name: 'Carregar mais' });
    expect(loadMoreButton).toBeInTheDocument();

    fireEvent.click(loadMoreButton);

    await waitFor(() => expect(mockExecute).toHaveBeenCalledTimes(2));

    expect(screen.getByText(/Farm C/)).toBeInTheDocument();
  });

  it('displays error toast on failure', async () => {
    mockExecute.mockRejectedValueOnce(new Error('fetch error'));

    render(<NotificationList onClose={onClose} />);

    await waitFor(() => expect(mockExecute).toHaveBeenCalled());

    expect(toast.error).toHaveBeenCalledWith('Erro ao carregar as metas');
  });
});