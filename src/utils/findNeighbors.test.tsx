
import findNeighbors from './findNeighbors';

describe('findNeighbors', () => {
  const columns = 5;
  const size = 25;
  describe('regilar row', () => {
    test('should check item from center', () => {
      const expectNeighbors = [6, 7, 8, 11, 13, 16, 17, 18];
      const position = 12;
      const result = findNeighbors(position, columns, size);
      expect(result).toEqual(expectNeighbors);
    });
    test('should check fist item in row', () => {
      const expectNeighbors = [5, 6, 9, 11, 14, 15, 16, 19];
      const position = 10;
      const result = findNeighbors(position, columns, size);
      expect(result).toEqual(expectNeighbors);
    });
    test('should check last item in row', () => {
      const expectNeighbors = [5, 8, 9, 10, 13, 15, 18, 19];
      const position = 14;
      const result = findNeighbors(position, columns, size);
      expect(result).toEqual(expectNeighbors);
    });
  });
  describe('fist row', () => {
    test('should check fist item in row', () => {
      const expectNeighbors = [1, 4, 5, 6, 9, 20, 21, 24];
      const position = 0;
      const result = findNeighbors(position, columns, size);
      expect(result).toEqual(expectNeighbors);
    });

    test('should check item from center', () => {
      const expectNeighbors = [1, 3, 6, 7, 8, 21, 22, 23];
      const position = 2;
      const result = findNeighbors(position, columns, size);
      expect(result).toEqual(expectNeighbors);
    });

    test('should check last item in row', () => {
      const expectNeighbors = [0, 3, 5, 8, 9, 20, 23, 24];
      const position = 4;
      const result = findNeighbors(position, columns, size);
      expect(result).toEqual(expectNeighbors);
    });
  });
  describe('last row', () => {
    test('should check fist item in row', () => {
      const expectNeighbors = [0, 1, 4, 15, 16, 19, 21, 24];
      const position = 20;
      const result = findNeighbors(position, columns, size);
      expect(result).toEqual(expectNeighbors);
    });

    test('should check item from center', () => {
      const expectNeighbors = [1, 2, 3, 16, 17, 18, 21, 23];
      const position = 22;
      const result = findNeighbors(position, columns, size);
      expect(result).toEqual(expectNeighbors);
    });

    test('should check last item in row', () => {
      const expectNeighbors = [0, 3, 4, 15, 18, 19, 20, 23];
      const position = 24;
      const result = findNeighbors(position, columns, size);
      expect(result).toEqual(expectNeighbors);
    });
  });


});
