import React from 'react';

interface UnauthorizedGuardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UnauthorizedGuardModal: React.FC<UnauthorizedGuardModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-labelledby="scope-notice-title">
      <div className="alc-panel max-w-md p-6">
        <h2 id="scope-notice-title" className="text-xl font-semibold">Program access is restricted</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--color-ink-2)]">
          The AECS API must authorize the enrolled program on every protected request.
        </p>
        <button type="button" onClick={onClose} className="alc-button-primary mt-5">Close</button>
      </div>
    </div>
  );
};
