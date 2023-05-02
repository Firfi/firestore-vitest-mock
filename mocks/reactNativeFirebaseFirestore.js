import defaultOptions from './helpers/defaultMockOptions.js';
import { FakeFirestore } from './firestore.js';
export const firestoreStub = (overrides, options = defaultOptions) => {
  class Firestore extends FakeFirestore {
    constructor() {
      super(overrides.database, options);
    }
  }

  return {
    Query: FakeFirestore.Query,
    CollectionReference: FakeFirestore.CollectionReference,
    DocumentReference: FakeFirestore.DocumentReference,
    FieldValue: FakeFirestore.FieldValue,
    FieldPath: FakeFirestore.FieldPath,
    Timestamp: FakeFirestore.Timestamp,
    Transaction: FakeFirestore.Transaction,
    /** @type {Firestore.constructor} */
    Firestore,
  };
};

export const mockReactNativeFirestore = (overrides = {}, options = defaultOptions) => {
  mockModuleIfFound('@react-native-firebase/firestore', overrides, options);
};

function mockModuleIfFound(moduleName, overrides, options) {
  try {
    require.resolve(moduleName);
    vi.doMock(moduleName, () => {
      const r = firestoreStub(overrides, options);
      return {
        default: r,
        ...r,
      };
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.info(`Module ${moduleName} not found, mocking skipped.`);
  }
}

export default {
  firestoreStub,
  mockReactNativeFirestore,
};
