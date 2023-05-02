import type { Query } from './query';
import type { MockedQuerySnapshot } from './helpers/buildQuerySnapShot';

export class Transaction {
  getAll(...refsOrReadOptions: Array<Query | Record<string, never>>): Promise<Array<MockedQuerySnapshot>>;
  get(ref: Query): Promise<MockedQuerySnapshot>;
  set(ref: Query): Transaction;
  update(ref: Query): Transaction;
  delete(ref: Query): Transaction;
  create(ref: Query, options: unknown): Transaction;
}

export const mocks: {
  mockGetAll: vi.Mock;
  mockGetAllTransaction: vi.Mock;
  mockGetTransaction: vi.Mock;
  mockSetTransaction: vi.Mock;
  mockUpdateTransaction: vi.Mock;
  mockDeleteTransaction: vi.Mock;
  mockCreateTransaction: vi.Mock;
};
