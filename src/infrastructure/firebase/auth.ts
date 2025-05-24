import { AuthRepository } from '@domain/repositories/AuthRepository';
import { updateProfile } from 'firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import User from '@domain/entities/User';

import { auth } from './config';

class FirebaseAuth implements AuthRepository {
  async login({ email, password }:User) {
    const credentials = await signInWithEmailAndPassword(
      auth, email, password,
    );

    return credentials.user.getIdToken();
  }

  async register({ email, password, name }:User) {
    const credentials = await createUserWithEmailAndPassword(
      auth, email, password,
    );

    await updateProfile(credentials.user, {
      displayName: name,
    });

    return credentials.user.getIdToken();
  }
};

export const firebaseAuth = new FirebaseAuth();
