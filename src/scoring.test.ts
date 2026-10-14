import { describe, expect, it } from 'vitest';
import { estimateIeltsBand, formatCountdown } from './scoring';

describe('estimateIeltsBand', () => {
  it('does not invent a score when nothing was attempted', () => {
    expect(estimateIeltsBand(0, 0)).toBeNull();
  });

  it('uses the attempted-question ratio for a transparent practice estimate', () => {
    expect(estimateIeltsBand(9, 10)).toBe(9);
    expect(estimateIeltsBand(7, 10)).toBe(7);
    expect(estimateIeltsBand(2, 10)).toBe(5);
  });
});

describe('formatCountdown', () => {
  it('formats minutes and clamps negative values', () => {
    expect(formatCountdown(3600)).toBe('60:00');
    expect(formatCountdown(65)).toBe('01:05');
    expect(formatCountdown(-1)).toBe('00:00');
  });
});
