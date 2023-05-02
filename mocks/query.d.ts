import type { FakeFirestore } from './firestore';
import type { MockedQuerySnapshot } from './helpers/buildQuerySnapShot';

export class Query {
  constructor(collectionName: string, firestore: typeof FakeFirestore);

  get(): Promise<MockedQuerySnapshot>;
  select(): Query;
  where(): Query;
  offset(): Query;
  limit(): Query;
  orderBy(): Query;
  startAfter(): Query;
  startAt(): Query;
  withConverter(): Query;
  onSnapshot(): () => void;
}

export const mocks: {
  mockGet: vi.Mock,
  mockSelect: vi.Mock,
  mockWhere: vi.Mock,
  mockLimit: vi.Mock,
  mockOrderBy: vi.Mock,
  mockOffset: vi.Mock,
  mockStartAfter: vi.Mock,
  mockStartAt: vi.Mock,
  mockQueryOnSnapshot: vi.Mock,
  mockWithConverter: vi.Mock,
};
