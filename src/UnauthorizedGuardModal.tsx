import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { ProgramId } from './types';
import { PROGRAMS } from './programData';
import { ShieldX, AlertOctagon, CheckCircle2, X } from 'lucide-react';

interface UnauthorizedGuardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UnauthorizedGuardModal: React.FC<UnauthorizedGuardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentUser } = useAuth();
  const [attemptedProgram, setAttemptedProgram] = useState<ProgramId>('GERMAN');
  const [simulationResult, setSimulationResult] = useState<string | null>(null);

  if (!isOpen || !currentUser) return null;

  const currentProgramName = PROGRAMS[currentUser.assignedProgram].name;

  const handleAttemptAccess = (prog: ProgramId) => {
    setAttemptedProgram(prog);
    if (prog === currentUser.assignedProgram) {
      setSimulationResult(`Access Allowed: /portal/${prog.toLowerCase()} belongs to your assigned enrollment.`);
    } else {
      setSimulationResult(
        `ACCESS DENIED (403 Forbidden): Direct URL access to /portal/${prog.toLowerCase()} is strictly blocked. You are assigned exclusively to ${currentProgramName}.`
      );
    }
  };

  const programs: ProgramId[] = ['IELTS', 'PTE', 'DET', 'GERMAN'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-red-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center">
              <ShieldX className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-red-900">
                Cross-Program URL Access Guard
              </h2>
              <p className="text-[11px] text-red-700">
                Rule: "Directly entering another program's URL should not bypass access restrictions"
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-700 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          <p className="text-slate-600 leading-relaxed">
            The brief states: <em>"An IELTS student should not see PTE, DET, or German in navigation... Directly entering another program's URL should not bypass access restrictions."</em>
          </p>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-[11px] text-slate-500">Currently Authenticated Student:</div>
            <div className="font-bold text-[#0F172A] mt-0.5">
              {currentUser.fullName} &bull; Assigned to:{' '}
              <span className="text-[#EA580C]">{currentProgramName}</span>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-2 uppercase tracking-wider text-[11px]">
              Simulate Direct Browser Navigation to Foreign URL:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {programs.map((p) => {
                const isMyProgram = p === currentUser.assignedProgram;
                return (
                  <button
                    key={p}
                    onClick={() => handleAttemptAccess(p)}
                    className={`p-2.5 rounded-lg border text-left font-semibold transition-all ${
                      isMyProgram
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                        : 'border-slate-200 bg-slate-50 hover:bg-red-50 hover:border-red-300 text-slate-700'
                    }`}
                  >
                    <div>/portal/{p.toLowerCase()}</div>
                    <div className="text-[10px] font-normal text-slate-500">
                      {isMyProgram ? 'Own Program (Permitted)' : 'Foreign Program (Blocked)'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {simulationResult && (
            <div
              className={`p-3.5 rounded-lg border text-xs flex items-start gap-2.5 ${
                simulationResult.includes('DENIED')
                  ? 'bg-red-50 border-red-200 text-red-800'
                  : 'bg-green-50 border-green-200 text-green-800'
              }`}
            >
              {simulationResult.includes('DENIED') ? (
                <AlertOctagon className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              )}
              <div className="font-medium leading-relaxed">{simulationResult}</div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#0F172A] text-white text-xs font-semibold hover:bg-slate-800"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
