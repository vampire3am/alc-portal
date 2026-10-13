import React, { useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import { AuthView } from './AuthView';
import { Sidebar } from './Sidebar';
import { StudentPortal } from './StudentPortal';
import { AdminModal } from './AdminModal';
import { UnauthorizedGuardModal } from './UnauthorizedGuardModal';
import { ViewTab } from './types';
import { PROGRAMS } from './programData';

const PortalApp: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [currentTab, setCurrentTab] = useState<ViewTab>('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isGuardModalOpen, setIsGuardModalOpen] = useState(false);

  if (!currentUser) {
    return <AuthView onLoginSuccess={() => setCurrentTab('dashboard')} />;
  }

  const assignedConfig = PROGRAMS[currentUser.assignedProgram];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Reusable Left Sidebar across programs */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        programName={assignedConfig.name}
        onLogout={logout}
        onSimulateUnauthorizedUrl={() => setIsGuardModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Program-Specific Portal Shell */}
      <StudentPortal
        user={currentUser}
        program={assignedConfig}
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenMobileMenu={() => setIsMobileOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Admin Program Assignment Modal */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      {/* Unauthorized Cross-Program Access Guard Demo */}
      <UnauthorizedGuardModal
        isOpen={isGuardModalOpen}
        onClose={() => setIsGuardModalOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <PortalApp />
    </AuthProvider>
  );
};

export default App;
