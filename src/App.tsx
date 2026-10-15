import React, { useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import { AuthView } from './AuthView';
import { Sidebar } from './Sidebar';
import { StudentPortal } from './StudentPortal';
import type { ViewTab } from './types';
import { PROGRAMS } from './programData';

const PortalApp: React.FC = () => {
  const { currentUser, isLoading, logout } = useAuth();
  const [currentTab, setCurrentTab] = useState<ViewTab>('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[var(--color-paper)] px-4">
        <div className="text-center" role="status">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-[var(--color-navy)] font-display text-sm font-bold text-white">ALC</div>
          <p className="mt-4 text-sm font-medium text-[var(--color-muted)]">Loading your workspace…</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <AuthView />;
  }

  const assignedConfig = PROGRAMS[currentUser.assignedProgram];

  return (
    <div className="flex min-h-screen bg-[var(--color-paper)]">
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        programName={assignedConfig.name}
        onLogout={async () => {
          await logout();
          window.scrollTo({ top: 0, left: 0 });
        }}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />
      <StudentPortal
        user={currentUser}
        program={assignedConfig}
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenMobileMenu={() => setIsMobileOpen(true)}
      />
    </div>
  );
};

export const App: React.FC = () => (
  <AuthProvider>
    <PortalApp />
  </AuthProvider>
);

export default App;
