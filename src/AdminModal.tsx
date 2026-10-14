import React from 'react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-labelledby="admin-unavailable-title">
      <div className="alc-panel max-w-md p-6">
        <h2 id="admin-unavailable-title" className="text-xl font-semibold">Administration is not part of the public demo</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--color-ink-2)]">
          Program assignment requires an authenticated server-side administrator console.
        </p>
        <button type="button" onClick={onClose} className="alc-button-primary mt-5">Close</button>
      </div>
    </div>
  );
};
