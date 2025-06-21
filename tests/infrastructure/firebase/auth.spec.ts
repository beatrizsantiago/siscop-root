import { firebaseAuth } from '../../../src/infrastructure/firebase/auth';
import { auth, googleProvider } from '../../../src/infrastructure/firebase/config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
  updateProfile: jest.fn(),
}));

describe('FirebaseAuth', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should login user with email and password and return ID token', async () => {
    const mockToken = 'mock-token';
    const mockUser = { getIdToken: jest.fn().mockResolvedValue(mockToken) };
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({ user: mockUser });

    const token = await firebaseAuth.login({ email: 'test@example.com', password: '123456' });

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', '123456');
    expect(token).toBe(mockToken);
  });

  it('should register a user and return ID token', async () => {
    const mockToken = 'register-token';
    const mockUser = { getIdToken: jest.fn().mockResolvedValue(mockToken) };
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({ user: mockUser });

    const token = await firebaseAuth.register({
      email: 'new@example.com',
      password: 'password123',
      name: 'New User',
    });

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'new@example.com', 'password123');
    expect(updateProfile).toHaveBeenCalledWith(mockUser, { displayName: 'New User' });
    expect(token).toBe(mockToken);
  });

  it('should login with Google and return ID token', async () => {
    const mockToken = 'google-token';
    const mockUser = { getIdToken: jest.fn().mockResolvedValue(mockToken) };
    (signInWithPopup as jest.Mock).mockResolvedValue({ user: mockUser });

    const token = await firebaseAuth.loginWithGoogle();

    expect(signInWithPopup).toHaveBeenCalledWith(auth, googleProvider);
    expect(token).toBe(mockToken);
  });
});
