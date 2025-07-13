import Notification from '../../../src/domain/entities/Notification';
import { firebaseNotification } from '../../../src/infrastructure/firebase/notification';
import type { DocumentSnapshot } from 'firebase/firestore';
import {
  collection,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from 'firebase/firestore';

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn((...args) => args),
  orderBy: jest.fn(),
  limit: jest.fn(),
  startAfter: jest.fn(),
  getDocs: jest.fn(),
}));

describe('FirebaseNotification.getAllPaginated', () => {
  const PAGE_SIZE = 10;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  function mockSnapshot(docs: Array<{ id: string; data: any }>) {
    (getDocs as jest.Mock).mockResolvedValue({
      docs: docs.map(d => ({ id: d.id, data: () => d.data })),
    });
  }

  it('fetches the first page when lastDoc is not provided', async () => {
    const now = new Date();
    mockSnapshot([
      { id: '1', data: { kind: 'A', farm_name: 'Farm A', created_at: { toDate: () => now } } },
      { id: '2', data: { kind: 'B', farm_name: 'Farm B', created_at: { toDate: () => now } } },
      { id: '3', data: { kind: 'C', farm_name: 'Farm C', created_at: { toDate: () => now } } },
    ]);

    const result = await firebaseNotification.getAllPaginated();

    expect(collection).toHaveBeenCalledWith(expect.anything(), 'notifications');
    expect(orderBy).toHaveBeenCalledWith('created_at', 'desc');
    expect(limit).toHaveBeenCalledWith(PAGE_SIZE);
    expect(startAfter).not.toHaveBeenCalled();

    expect(result.list).toHaveLength(3);
    expect(result.list[0]).toBeInstanceOf(Notification);
    expect(result.list[0]).toMatchObject({ id: '1', farm_name: 'Farm A', kind: 'A', created_at: now });

    expect(result.hasMore).toBe(false);
    expect(result.lastDoc?.id).toBe('3');
  });

  it('fetches the next page when lastDoc is provided', async () => {
    const now = new Date();
    const docs = Array.from({ length: PAGE_SIZE }).map((_, i) => ({
      id: String(i + 1),
      data: { kind: `K${i}`, farm_name: `F${i}`, created_at: { toDate: () => now } },
    }));
    mockSnapshot(docs);

    const fakeLastDoc = {} as DocumentSnapshot;

    const result = await firebaseNotification.getAllPaginated(fakeLastDoc);

    expect(collection).toHaveBeenCalledWith(expect.anything(), 'notifications');
    expect(orderBy).toHaveBeenCalledWith('created_at', 'desc');
    expect(startAfter).toHaveBeenCalledWith(fakeLastDoc);
    expect(limit).toHaveBeenCalledWith(PAGE_SIZE);

    expect(result.list).toHaveLength(PAGE_SIZE);
    expect(result.hasMore).toBe(true);
    expect(result.lastDoc?.id).toBe(String(PAGE_SIZE));
  });

  it('returns an empty list when there are no documents', async () => {
    mockSnapshot([]);

    const result = await firebaseNotification.getAllPaginated();

    expect(result.list).toEqual([]);
    expect(result.hasMore).toBe(false);
    expect(result.lastDoc).toBeUndefined();
  });

  it('propagates errors from getDocs', async () => {
    (getDocs as jest.Mock).mockRejectedValue(new Error('firestore error'));

    await expect(firebaseNotification.getAllPaginated()).rejects.toThrow('firestore error');
  });
});

