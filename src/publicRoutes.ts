export type PublicRoute =
  | 'home'
  | 'programs'
  | 'how-it-works'
  | 'enrollment'
  | 'about'
  | 'contact'
  | 'sign-in'
  | 'privacy'
  | 'terms';

const routePaths: Record<PublicRoute, string> = {
  home: '/',
  programs: '/programs',
  'how-it-works': '/how-it-works',
  enrollment: '/enrollment',
  about: '/about',
  contact: '/contact',
  'sign-in': '/sign-in',
  privacy: '/privacy',
  terms: '/terms',
};

export const routeHref = (route: PublicRoute) => `#${routePaths[route]}`;

export const parsePublicRoute = (hash: string): PublicRoute => {
  const path = hash.replace(/^#/, '').split('?')[0].replace(/\/+$/, '') || '/';
  const match = (Object.entries(routePaths) as Array<[PublicRoute, string]>).find(([, value]) => value === path);
  return match?.[0] ?? 'home';
};

export const publicRouteTitle = (route: PublicRoute) => {
  const titles: Record<PublicRoute, string> = {
    home: 'AECS Learning Center',
    programs: 'Programs · AECS Learning Center',
    'how-it-works': 'How it works · AECS Learning Center',
    enrollment: 'Enrollment · AECS Learning Center',
    about: 'About · AECS Learning Center',
    contact: 'Contact · AECS Learning Center',
    'sign-in': 'Sign in · AECS Learning Center',
    privacy: 'Privacy · AECS Learning Center',
    terms: 'Terms · AECS Learning Center',
  };
  return titles[route];
};
