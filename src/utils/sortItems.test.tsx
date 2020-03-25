
import { sortItems } from './sortItems';

describe('sortItems', () => {
  test('should sort array', () => {
    const testArray: number[] = [1, 10, 5, 3, 30];
    const expectedArray: number[] = [1, 3, 5, 10, 30];
    const result: number[] = sortItems(testArray);
    expect(result).toEqual(expectedArray);
  });

  test('should reject incorrect data', () => {
    expect(() => {
      const incorrectData: any = 'test string';
      sortItems(incorrectData);
    }).toThrowError()
  });
  test('should return empty array when data is empty', () => {
    expect(sortItems()).toEqual([]);
  })
})


