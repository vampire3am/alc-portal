import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { ProgramId, GermanLevel } from './types';
import { PROGRAMS } from './programData';
import { ShieldCheck, X, Check, AlertTriangle } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const { users, currentUser, adminUpdateStudentProgram } = useAuth();
  const [selectedStudentId, setSelectedStudentId] = useState<string>(currentUser?.id || users[0]?.id || '');
  const [targetProgram, setTargetProgram] = useState<ProgramId>('GERMAN');
  const [targetLevel, setTargetLevel] = useState<GermanLevel>('A1');
  const [notification, setNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentSelectedStudent = users.find((u) => u.id === selectedStudentId);

  const handleUpdate = () => {
    if (!selectedStudentId) return;
    adminUpdateStudentProgram(
      selectedStudentId, 
      targetProgram, 
      targetProgram === 'GERMAN' ? targetLevel : undefined
    );
    setNotification(
      `Updated ${currentSelectedStudent?.fullName}'s assignment: Program = ${PROGRAMS[targetProgram].name}${targetProgram === 'GERMAN' ? `, Level = ${targetLevel}` : ''}.`
    );
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const programs: ProgramId[] = ['IELTS', 'PTE', 'DET', 'GERMAN'];
  const levels: GermanLevel[] = ['A1', 'A2', 'B1', 'B2'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0F172A] text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-[#EA580C]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#0F172A]">
                Administrator Program &amp; CEFR Progression Desk
              </h2>
              <p className="text-[11px] text-slate-500">
                Rule 1 &amp; 11: Progress students (A1 &rarr; A2 &rarr; B1 &rarr; B2) or reassign programs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          {notification && (
            <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600 shrink-0" />
              <span>{notification}</span>
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
              Select Student to Manage
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => {
                setSelectedStudentId(e.target.value);
                const st = users.find((u) => u.id === e.target.value);
                if (st) {
                  setTargetProgram(st.assignedProgram);
                  if (st.germanLevel) setTargetLevel(st.germanLevel);
                }
              }}
              className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
            >
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.fullName} ({u.email}) — Currently: {u.assignedProgram === 'GERMAN' ? `German ${u.germanLevel || 'A1'}` : PROGRAMS[u.assignedProgram]?.name}
                </option>
              ))}
            </select>
          </div>

          {currentSelectedStudent && (
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Current Program:</span>
                <span className="font-bold text-[#0F172A]">
                  {PROGRAMS[currentSelectedStudent.assignedProgram]?.name}
                </span>
              </div>
              {currentSelectedStudent.assignedProgram === 'GERMAN' && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Current CEFR Level:</span>
                  <span className="font-bold text-[#EA580C]">
                    Level {currentSelectedStudent.germanLevel || 'A1'} (Stored Account Property)
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">Student Phone:</span>
                <span className="font-semibold text-slate-700">
                  {currentSelectedStudent.phone}
                </span>
              </div>
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1.5 uppercase tracking-wider text-[11px]">
              Assigned Program
            </label>
            <div className="grid grid-cols-2 gap-2">
              {programs.map((pId) => {
                const isSelected = targetProgram === pId;
                return (
                  <button
                    key={pId}
                    type="button"
                    onClick={() => setTargetProgram(pId)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-[#EA580C] bg-orange-50/50 text-[#0F172A] font-bold ring-1 ring-[#EA580C]'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs">{PROGRAMS[pId].name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CEFR Level Progression Controls (Section 1 & 11) */}
          {targetProgram === 'GERMAN' && (
            <div className="p-3.5 bg-orange-50/40 rounded-xl border border-orange-200 space-y-2">
              <label className="block font-bold text-[#0F172A] uppercase tracking-wider text-[11px]">
                Progress or Set German CEFR Level
              </label>
              <p className="text-[11px] text-slate-600">
                Rule (Section 1 &amp; 11): The level is a separate account property so administrators can progress a student from A1 to A2, A2 to B1 without creating a new account.
              </p>
              <div className="grid grid-cols-4 gap-2 pt-1">
                {levels.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setTargetLevel(lvl)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all border ${
                      targetLevel === lvl
                        ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Level {lvl}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Students have zero controls to switch programs or advance their level. Level isolation is enforced strictly on backend filters and interface queries.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            Close
          </button>
          <button
            onClick={handleUpdate}
            className="px-5 py-2 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-xs font-semibold text-white shadow-xs"
          >
            Save Assignment / Level Progression
          </button>
        </div>
      </div>
    </div>
  );
};
