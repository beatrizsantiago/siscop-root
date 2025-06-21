import { firebaseUser } from '../../../src/infrastructure/firebase/user';

import { auth } from '../../../src/infrastructure/firebase/config';

jest.mock('../../../src/infrastructure/firebase/config', () => ({
  auth: {
    currentUser: null,
  },
}));

describe('FirebaseUser', () => {
  const mockedAuth = auth as typeof auth & {
    currentUser: any;
  };

  afterEach(() => {
    mockedAuth.currentUser = null;
  });

  it('should return the user display name if logged in', async () => {
    mockedAuth.currentUser = { displayName: 'Teste' };

    const name = await firebaseUser.getName();
    expect(name).toBe('Teste');
  });

  it('should return an empty string if no user is logged in', async () => {
    mockedAuth.currentUser = null;

    const name = await firebaseUser.getName();
    expect(name).toBe('');
  });

  it('should return an empty string if displayName is undefined', async () => {
    mockedAuth.currentUser = {};

    const name = await firebaseUser.getName();
    expect(name).toBe('');
  });
});

