import type { FieldValue } from './fieldValue';
import type { Query } from './query';
import type { Timestamp } from './timestamp';
import type { Transaction } from './transaction';
import type { FieldPath } from './path';

import type { MockedDocument, DocumentData } from './helpers/buildDocFromHash';
import type { MockedQuerySnapshot } from './helpers/buildQuerySnapShot';

interface DatabaseDocument extends DocumentData {
  id: string;
  _collections?: DatabaseCollections;
}

interface DatabaseCollections {
  [collectionName: string]: Array<DatabaseDocument> | undefined;
}

interface SetOptions {
  merge?: boolean;
}

interface FirestoreBatch {
  delete(): FirestoreBatch;
  set(doc: DocumentReference, data: DocumentData, options?: SetOptions): FirestoreBatch;
  update(doc: DocumentReference, data: DocumentData): FirestoreBatch;
  commit(): Promise<void>;
}

export type FakeFirestoreDatabase = DatabaseCollections;

export class FakeFirestore {
  static FieldValue: typeof FieldValue;
  static Timestamp: typeof Timestamp
  static Query: typeof Query;
  static Transaction: typeof Transaction;
  static FieldPath: typeof FieldPath;

  static DocumentReference: typeof DocumentReference;
  static CollectionReference: typeof CollectionReference;

  database: FakeFirestoreDatabase;
  options: Record<string, never>;
  query: Query;
  collectionName: string;

  constructor(stubbedDatabase?: DatabaseCollections, options?: Record<string, never>);

  getAll(): Array<MockedQuerySnapshot>;
  batch(): FirestoreBatch;
  settings(): void;
  useEmulator(): void;
  collection(collectionName: string): CollectionReference;
  collectionGroup(collectionName: string): Query;
  doc(path: string): DocumentReference;
  runTransaction<T>(updateFunction: (transaction: Transaction) => Promise<T>): Promise<T>;
}

declare class DocumentReference {
  id: string;
  parent: CollectionReference;
  firestore: FakeFirestore;
  path: string;

  constructor(id: string, parent: CollectionReference);

  collection(collectionName: string): CollectionReference;
  delete(): Promise<void>;
  get(): Promise<MockedDocument>;

  update(object: DocumentData): Promise<MockedDocument>;
  set(object: DocumentData): Promise<MockedDocument>;

  isEqual(other: DocumentReference): boolean;

  withConverter(): DocumentReference;

  onSnapshot(callback: () => void, errorCallback: () => void): () => void;
  onSnapshot(options: Record<string, never>, callback: () => void, errorCallback: () => void): () => void;

  /** @deprecated Call the analagous method on a `Query` instance instead. */
  orderBy(): never;

  /** @deprecated Call the analagous method on a `Query` instance instead. */
  limit(): never;

  /** @deprecated Call the analagous method on a `Query` instance instead. */
  offset(): never;

  /** @deprecated Call the analagous method on a `Query` instance instead. */
  startAfter(): never;

  /** @deprecated Call the analagous method on a `Query` instance instead. */
  startAt(): never;
}

declare class CollectionReference extends FakeFirestore.Query {
  id: string;
  parent: DocumentReference;
  path: string;

  constructor(id: string, parent: DocumentReference, firestore?: FakeFirestore);

  doc(id?: string): DocumentReference;
  get(): Promise<MockedQuerySnapshot>;
  add(data: DocumentData): Promise<DocumentReference>;
  isEqual(other: CollectionReference): boolean;

  /**
   * An internal method, meant mainly to be used by `get` and other internal objects to retrieve
   * the list of database records referenced by this CollectionReference.
   * @returns An array of mocked document records.
   */
  private _records(): Array<MockedDocument>
}

// Mocks exported from this module
export const mockBatch: vi.Mock;
export const mockRunTransaction: vi.Mock;

export const mockCollection: vi.Mock;
export const mockCollectionGroup: vi.Mock;
export const mockDoc: vi.Mock;
export const mockUpdate: vi.Mock;
export const mockSet: vi.Mock;
export const mockAdd: vi.Mock;
export const mockDelete: vi.Mock;
export const mockSettings: vi.Mock;

// FIXME: We should decide whether this should be exported from auth or firestore
export const mockUseEmulator: vi.Mock;
export const mockListDocuments: vi.Mock;

export const mockBatchDelete: vi.Mock;
export const mockBatchCommit: vi.Mock;
export const mockBatchUpdate: vi.Mock;
export const mockBatchSet: vi.Mock;

export const mockOnSnapShot: vi.Mock;

// Mocks exported from FieldValue
export const mockArrayUnionFieldValue: vi.Mock;
export const mockArrayRemoveFieldValue: vi.Mock;
export const mockDeleteFieldValue: vi.Mock;
export const mockIncrementFieldValue: vi.Mock;
export const mockServerTimestampFieldValue: vi.Mock;

// Mocks exported from Query
export const mockGet: vi.Mock;
export const mockWhere: vi.Mock;
export const mockLimit: vi.Mock;
export const mockOrderBy: vi.Mock;
export const mockOffset: vi.Mock;
export const mockStartAfter: vi.Mock;
export const mockStartAt: vi.Mock;
export const mockQueryOnSnapshot: vi.Mock;
export const mockWithConverter: vi.Mock;

// Mocks exported from Timestamp
export const mockTimestampToDate: vi.Mock;
export const mockTimestampToMillis: vi.Mock;
export const mockTimestampFromDate: vi.Mock;
export const mockTimestampFromMillis: vi.Mock;
export const mockTimestampNow: vi.Mock;

// Mocks exported from Transaction
export const mockGetAll: vi.Mock;
export const mockGetAllTransaction: vi.Mock;
export const mockGetTransaction: vi.Mock;
export const mockSetTransaction: vi.Mock;
export const mockUpdateTransaction: vi.Mock;
export const mockDeleteTransaction: vi.Mock;
export const mockCreateTransaction: vi.Mock;
export const mockListCollections: vi.Mock;
export const mockSelect: vi.Mock;
