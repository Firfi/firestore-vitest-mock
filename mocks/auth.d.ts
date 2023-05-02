export const mockCreateUserWithEmailAndPassword: vi.Mock;
export const mockDeleteUser: vi.Mock;
export const mockSendVerificationEmail: vi.Mock;
export const mockSignInWithEmailAndPassword: vi.Mock;
export const mockSendPasswordResetEmail: vi.Mock;
export const mockVerifyIdToken: vi.Mock;
export const mockGetUser: vi.Mock;
export const mockCreateCustomToken: vi.Mock;
export const mockSetCustomUserClaims: vi.Mock;
export const mockSignOut: vi.Mock;

// FIXME: We should decide whether this should be exported from auth or firestore
export const mockUseEmulator: vi.Mock;

export interface FirebaseUser {}

export class FakeAuth {
  currentUser: Readonly<FirebaseUser>;

  constructor(currentUser?: FirebaseUser);

  createUserWithEmailAndPassword(): Promise<{ user: FirebaseUser }>;
  signInWithEmailAndPassword(): Promise<{ user: FirebaseUser }>;
  deleteUser(): Promise<'👍'>;
  signOut(): Promise<'👍'>;
  sendPasswordResetEmail(): void;
  verifyIdToken(): Promise<FirebaseUser>;
  getUser(): Promise<Record<string, never>>;
  createCustomToken(): Promise<string>;
  setCustomUserClaims(): Promise<Record<string, never>>;
  useEmulator(): void;
}
