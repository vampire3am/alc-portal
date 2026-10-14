import React, { useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import { AuthView } from './AuthView';
import { Sidebar } from './Sidebar';
import { StudentPortal } from './StudentPortal';
import type { ViewTab } from './types';
import { PROGRAMS } from './programData';

const PortalApp: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [currentTab, setCurrentTab] = useState<ViewTab>('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (!currentUser) {
    return <AuthView onLoginSuccess={() => setCurrentTab('dashboard')} />;
  }

  const assignedConfig = PROGRAMS[currentUser.assignedProgram];

  return (
    <div className="flex min-h-screen bg-[var(--color-paper)]">
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        programName={assignedConfig.name}
        onLogout={() => {
          logout();
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
