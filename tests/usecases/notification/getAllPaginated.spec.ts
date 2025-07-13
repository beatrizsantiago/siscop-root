import type { DocumentSnapshot } from 'firebase/firestore';
import GetAllPaginatedNotificationUseCase from '../../../src/usecases/notification/getAllPaginated';
import type { NotificationRepository } from '../../../src/domain/repositories/NotificationRepository';
import Notification from '../../../src/domain/entities/Notification';

describe('GetAllPaginatedNotificationUseCase', () => {
  let mockRepository: jest.Mocked<NotificationRepository>;
  let useCase: GetAllPaginatedNotificationUseCase;

  beforeEach(() => {
    mockRepository = {
      getAllPaginated: jest.fn(),
    } as unknown as jest.Mocked<NotificationRepository>;
    useCase = new GetAllPaginatedNotificationUseCase(mockRepository);
  });

  it('should call repository.getAllPaginated without lastDoc and return its result', async () => {
    const fakeList = [
      new Notification('1', 'kindA', 'Farm A', new Date()),
      new Notification('2', 'kindB', 'Farm B', new Date()),
    ];
    const fakeLastDoc = undefined;
    const fakeResponse = { list: fakeList, lastDoc: undefined, hasMore: false };

    mockRepository.getAllPaginated.mockResolvedValueOnce(fakeResponse);

    const result = await useCase.execute(fakeLastDoc);

    expect(mockRepository.getAllPaginated).toHaveBeenCalledWith(undefined);
    expect(result).toBe(fakeResponse);
  });

  it('should call repository.getAllPaginated with lastDoc and return its result', async () => {
    const fakeList = [
      new Notification('3', 'kindC', 'Farm C', new Date()),
    ];
    const fakeDoc = {} as DocumentSnapshot;
    const fakeResponse = { list: fakeList, lastDoc: fakeDoc, hasMore: true };

    mockRepository.getAllPaginated.mockResolvedValueOnce(fakeResponse);

    const result = await useCase.execute(fakeDoc);

    expect(mockRepository.getAllPaginated).toHaveBeenCalledWith(fakeDoc);
    expect(result).toBe(fakeResponse);
  });

  it('should propagate errors thrown by repository.getAllPaginated', async () => {
    const error = new Error('repository failure');
    mockRepository.getAllPaginated.mockRejectedValueOnce(error);

    await expect(useCase.execute()).rejects.toThrow('repository failure');
  });
});