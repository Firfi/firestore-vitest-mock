export class Timestamp {
  constructor(seconds: number, nanoseconds: number);

  isEqual(other: Timestamp): boolean;
  toDate(): Date;
  toMillis(): number;
  valueOf(): string;

  static fromDate(date: Date): Timestamp;
  static fromMillis(millis: number): Timestamp;
  static now(): Timestamp;
}

export const mocks: {
  mockTimestampToDate: vi.Mock;
  mockTimestampToMillis: vi.Mock;
  mockTimestampFromDate: vi.Mock;
  mockTimestampFromMillis: vi.Mock;
  mockTimestampNow: vi.Mock;
};
