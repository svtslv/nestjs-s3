import * as index from '../src/index';

describe('Index', () => {
  test('should return 5 exports', () => {
    expect(Object.keys(index)).toHaveLength(5);
  });
});
