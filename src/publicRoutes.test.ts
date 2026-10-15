import { describe, expect, it } from 'vitest';
import { parsePublicRoute, publicRouteTitle, routeHref } from './publicRoutes';

describe('public routes', () => {
  it('maps known routes and removes query strings', () => {
    expect(parsePublicRoute('#/programs')).toBe('programs');
    expect(parsePublicRoute('#/contact?from=footer')).toBe('contact');
  });

  it('falls back to home for unknown or empty routes', () => {
    expect(parsePublicRoute('')).toBe('home');
    expect(parsePublicRoute('#/missing')).toBe('home');
  });

  it('creates stable hrefs and titles', () => {
    expect(routeHref('sign-in')).toBe('#/sign-in');
    expect(publicRouteTitle('enrollment')).toContain('Enrollment');
  });
});
