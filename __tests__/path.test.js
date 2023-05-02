import { mockFirebase } from '../index';
mockFirebase({ database: {} });
import path from '../mocks/path';

describe('Single values transformed by field sentinels', () => {
  let firebase;
  beforeAll(async () => {
    firebase = await import('firebase');
  });
  test('isEqual', () => {
    const path1 = new firebase.firestore.FieldPath('collection', 'doc1');
    const path2 = new firebase.firestore.FieldPath('collection', 'doc2');
    expect(path1.isEqual(path1)).toBe(true);
    expect(path2.isEqual(path2)).toBe(true);
    expect(path1.isEqual(path2)).toBe(false);
  });

  test('compareTo', () => {
    const path1 = new path.Path(['abc', 'def', 'ghij']);
    const path2 = new path.Path(['abc', 'def', 'ghik']);
    expect(path1.compareTo(path2)).toBe(-1);
    const path3 = new path.Path(['abc', 'def', 'ghi']);
    expect(path1.compareTo(path3)).toBe(1);
    const path4 = new path.Path(['abc', 'def']);
    const path5 = new path.Path(['abc', 'def']);
    expect(path1.compareTo(path4)).toBe(1);
    expect(path4.compareTo(path5)).toBe(0);
    const path6 = new path.Path(['abc', 'def', 'ghi', 'klm']);
    expect(path6.compareTo(path1)).toBe(-1);
    expect(path3.compareTo(path6)).toBe(-1);
  });

  test('documentId', () => {
    const path = firebase.firestore.FieldPath.documentId();
    expect(path === firebase.firestore.FieldPath.documentId()).toBe(true);
  });
});
