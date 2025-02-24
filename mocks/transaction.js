const mockGetAll = vi.fn();
const mockGetAllTransaction = vi.fn();
const mockGetTransaction = vi.fn();
const mockSetTransaction = vi.fn();
const mockUpdateTransaction = vi.fn();
const mockDeleteTransaction = vi.fn();
const mockCreateTransaction = vi.fn();

class Transaction {
  getAll(...refsOrReadOptions) {
    mockGetAll(...arguments);
    mockGetAllTransaction(...arguments);
    // TODO: Assert that read options, if provided, are the last argument
    // Filter out the read options before calling .get()
    return Promise.all(refsOrReadOptions.filter(ref => !!ref.get).map(ref => ref.get()));
  }

  get(ref) {
    mockGetTransaction(...arguments);
    return Promise.resolve(ref._get());
  }

  set(ref) {
    mockSetTransaction(...arguments);
    const args = [...arguments];
    args.shift();
    ref.set(...args);
    return this;
  }

  update(ref) {
    mockUpdateTransaction(...arguments);
    const args = [...arguments];
    args.shift();
    ref.update(...args);
    return this;
  }

  delete(ref) {
    mockDeleteTransaction(...arguments);
    ref.delete();
    return this;
  }

  create(ref, options) {
    mockCreateTransaction(...arguments);
    ref.set(options);
    return this;
  }
}

export default {
  Transaction,
  mocks: {
    mockGetAll,
    mockGetAllTransaction,
    mockGetTransaction,
    mockSetTransaction,
    mockUpdateTransaction,
    mockDeleteTransaction,
    mockCreateTransaction,
  },
};
