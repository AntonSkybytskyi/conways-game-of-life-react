import React from 'react';
import { render } from '@testing-library/react';
import Game from './Game';

test('should render Game component without crashing', () => {
  render(<Game />);
});

describe('Grid Settings', () => {
  test('allow user to change grid size', () => {

  });
});

describe('Game', () => {
  test('allow user makes selection', () => {

  });
  test('allow user to remove selected item', () => {

  });
});
