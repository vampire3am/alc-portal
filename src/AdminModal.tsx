import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { ProgramId } from './types';
import { PROGRAMS } from './programData';
import { ShieldCheck, X, Check, AlertTriangle, Users } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const { users, currentUser, adminUpdateStudentProgram } = useAuth();
  const [selectedStudentId, setSelectedStudentId] = useState<string>(currentUser?.id || users[0]?.id || '');
  const [targetProgram, setTargetProgram] = useState<ProgramId>('IELTS');
  const [notification, setNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentSelectedStudent = users.find((u) => u.id === selectedStudentId);

  const handleUpdate = () => {
    if (!selectedStudentId) return;
    adminUpdateStudentProgram(selectedStudentId, targetProgram);
    setNotification(
      `Updated ${currentSelectedStudent?.fullName}'s assigned program to ${PROGRAMS[targetProgram].name}.`
    );
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const programs: ProgramId[] = ['IELTS', 'PTE', 'DET', 'GERMAN'];

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
                Administrator Program Assignment Desk
              </h2>
              <p className="text-[11px] text-slate-500">
                Rule 3: Authorized administrators can correct or change assigned programs
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
                if (st) setTargetProgram(st.assignedProgram);
              }}
              className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
            >
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.fullName} ({u.email}) — Currently: {PROGRAMS[u.assignedProgram]?.name || u.assignedProgram}
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
              Reassign to New Program
            </label>
            <div className="grid grid-cols-2 gap-2">
              {programs.map((pId) => {
                const isCurrent = currentSelectedStudent?.assignedProgram === pId;
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
                    <div className="flex items-center justify-between">
                      <span className="text-xs">{PROGRAMS[pId].name}</span>
                      {isCurrent && (
                        <span className="text-[10px] text-slate-400 font-normal">Current</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Once updated, the student portal immediately refreshes with the isolated navigation and materials for the new program. The student themselves has zero controls to switch programs.
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
            Save Assignment Change
          </button>
        </div>
      </div>
    </div>
  );
};
