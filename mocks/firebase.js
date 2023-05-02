export const mockInitializeApp = vi.fn();
export const mockCert = vi.fn();

import defaultOptions from './helpers/defaultMockOptions.js';
import { FakeFirestore, FakeAuth } from '../index.js';

export const firebaseStub = (overrides, options = defaultOptions) => {
  // Prepare namespaced classes
  function firestoreConstructor() {
    return new FakeFirestore(overrides.database, options);
  }

  firestoreConstructor.Query = FakeFirestore.Query;
  firestoreConstructor.CollectionReference = FakeFirestore.CollectionReference;
  firestoreConstructor.DocumentReference = FakeFirestore.DocumentReference;
  firestoreConstructor.FieldValue = FakeFirestore.FieldValue;
  firestoreConstructor.Timestamp = FakeFirestore.Timestamp;
  firestoreConstructor.Transaction = FakeFirestore.Transaction;
  firestoreConstructor.FieldPath = FakeFirestore.FieldPath;

  //Remove methods which do not exist in Firebase
  delete firestoreConstructor.DocumentReference.prototype.listCollections;

  // The Firebase mock
  return {
    initializeApp: mockInitializeApp,

    credential: {
      cert: mockCert,
    },

    auth() {
      return new FakeAuth(overrides.currentUser);
    },

    firestore: firestoreConstructor,
  };
};

export const mockFirebase = (overrides = {}, options = defaultOptions) => {
  mockModuleIfFound('firebase', overrides, options);
  mockModuleIfFound('firebase-admin', overrides, options);
};

function mockModuleIfFound(moduleName, overrides, options) {
  try {
    require.resolve(moduleName);
    vi.doMock(moduleName, () => firebaseStub(overrides, options));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.info(`Module ${moduleName} not found, mocking skipped.`);
  }
}

export default {
  firebaseStub,
  mockFirebase,
  mockInitializeApp,
  mockCert,
};
