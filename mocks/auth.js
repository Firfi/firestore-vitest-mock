export const mockCreateUserWithEmailAndPassword = vi.fn();
export const mockDeleteUser = vi.fn();
export const mockSendVerificationEmail = vi.fn();
export const mockSignInWithEmailAndPassword = vi.fn();
export const mockSendPasswordResetEmail = vi.fn();
export const mockVerifyIdToken = vi.fn();
export const mockGetUser = vi.fn();
export const mockCreateCustomToken = vi.fn();
export const mockSetCustomUserClaims = vi.fn();
export const mockSignOut = vi.fn();
export const mockUseEmulator = vi.fn();

export class FakeAuth {
  constructor(currentUser = {}) {
    currentUser.sendEmailVerification = mockSendVerificationEmail;
    this.currentUserRecord = currentUser;
  }

  createUserWithEmailAndPassword() {
    mockCreateUserWithEmailAndPassword(...arguments);
    return Promise.resolve({ user: this.currentUserRecord });
  }

  deleteUser() {
    mockDeleteUser(...arguments);
    return Promise.resolve('👍');
  }

  signInWithEmailAndPassword() {
    mockSignInWithEmailAndPassword(...arguments);
    return Promise.resolve({ user: this.currentUserRecord });
  }

  signOut() {
    mockSignOut();
    return Promise.resolve('👍');
  }

  sendPasswordResetEmail() {
    mockSendPasswordResetEmail(...arguments);
  }

  verifyIdToken() {
    return Promise.resolve(mockVerifyIdToken(...arguments) || this.currentUserRecord);
  }

  getUser() {
    return Promise.resolve(mockGetUser(...arguments) || {});
  }

  createCustomToken() {
    return Promise.resolve(mockCreateCustomToken(...arguments) || '');
  }

  setCustomUserClaims() {
    return Promise.resolve(mockSetCustomUserClaims(...arguments) || {});
  }

  useEmulator() {
    mockUseEmulator(...arguments);
  }

  get currentUser() {
    const { uid, ...data } = this.currentUserRecord;
    return { uid, data };
  }
}

export default {
  FakeAuth,
  mockCreateUserWithEmailAndPassword,
  mockDeleteUser,
  mockSendPasswordResetEmail,
  mockSendVerificationEmail,
  mockSignInWithEmailAndPassword,
  mockSignOut,
  mockVerifyIdToken,
  mockGetUser,
  mockCreateCustomToken,
  mockSetCustomUserClaims,
  mockUseEmulator,
};
