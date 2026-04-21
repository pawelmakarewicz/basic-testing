// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  // Add
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  // Subtract
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 2, b: 5, action: Action.Subtract, expected: -3 },

  // Multiply
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 4, b: 0, action: Action.Multiply, expected: 0 },

  // Divide
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 5, b: 2, action: Action.Divide, expected: 2.5 },

  // Exponentiate
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 5, b: 0, action: Action.Exponentiate, expected: 1 },
];

describe('simpleCalculator', () => {
  it.each(testCases)(
    'should return $expected for $a $action $b',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: 'invalid' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '1', b: 2, action: Action.Add })).toBeNull();

    expect(
      simpleCalculator({ a: 1, b: undefined, action: Action.Add }),
    ).toBeNull();
  });
});
