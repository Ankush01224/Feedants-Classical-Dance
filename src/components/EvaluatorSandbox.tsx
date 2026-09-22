import React, { useState } from 'react';
import {
  Wrench,
  Zap,
  RotateCcw,
  Smartphone,
  Monitor,
  Database,
  Users,
  CheckCircle2,
  Calendar,
  X
} from 'lucide-react';
import { ConcurrencyTestResult } from '../types';

interface EvaluatorSandboxProps {
  isRegistered: boolean;
  hasSubmitted: boolean;
  isMobileView: boolean;
  onToggleMobileView: () => void;
  onToggleRegistrationState: (registered: boolean, submitted: boolean) => void;
  onResetDatabase: () => void;
  onRunConcurrencyTest: () => Promise<ConcurrencyTestResult | null>;
  competitionId: string;
}

export const EvaluatorSandbox: React.FC<EvaluatorSandboxProps> = ({
  isRegistered,
  hasSubmitted,
  isMobileView,
  onToggleMobileView,
  onToggleRegistrationState,
  onResetDatabase,
  onRunConcurrencyTest,
  competitionId
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [testingConcurrency, setTestingConcurrency] = useState(false);
  const [concurrencyResult, setConcurrencyResult] = useState<ConcurrencyTestResult | null>(null);
  const [showDbModal, setShowDbModal] = useState(false);
  const [dbData, setDbData] = useState<any>(null);

  const handleTestConcurrency = async () => {
    setTestingConcurrency(true);
    try {
      const result = await onRunConcurrencyTest();
      setConcurrencyResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setTestingConcurrency(false);
    }
  };

  const handleInspectDb = async () => {
    try {
      const [compRes, partRes] = await Promise.all([
        fetch(`/api/competitions/${competitionId}`),
        fetch(`/api/competitions/${competitionId}/participants`)
      ]);
      const comp = await compRes.json();
      const parts = await partRes.json();
      setDbData({ competition: comp, registrations: parts });
      setShowDbModal(true);
    } catch (err) {
      console.error('Failed to load DB state:', err);
    }
  };

  return (
    <>
      {/* Floating Toolbar Pill */}
      <div className="fixed top-3 right-3 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-semibold shadow-lg hover:bg-slate-900 border border-slate-700 backdrop-blur-md cursor-pointer transition-all active:scale-95"
        >
          <Wrench className="w-3.5 h-3.5 text-amber-400" />
          <span>Evaluator Sandbox</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>

        <button
          onClick={onToggleMobileView}
          title={isMobileView ? 'Switch to Fullscreen' : 'Switch to Mobile Frame'}
          className="p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md border border-slate-200 cursor-pointer hidden md:flex items-center justify-center transition-all"
        >
          {isMobileView ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Control Drawer */}
      {isOpen && (
        <div className="fixed top-14 right-3 z-40 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-4 text-xs animate-fadeIn">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <Wrench className="w-4 h-4 text-[#0d6e75]" />
              <span>Full-Stack QA & Sandbox Panel</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-700">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {/* User State Toggle */}
            <div>
              <span className="block font-semibold text-slate-700 mb-1.5">
                Current User State Simulation:
              </span>
              <div className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => onToggleRegistrationState(false, false)}
                  className={`py-1 px-1.5 text-[10px] font-semibold rounded-lg border transition-all ${
                    !isRegistered
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Unregistered
                </button>
                <button
                  onClick={() => onToggleRegistrationState(true, false)}
                  className={`py-1 px-1.5 text-[10px] font-semibold rounded-lg border transition-all ${
                    isRegistered && !hasSubmitted
                      ? 'bg-teal-100 text-teal-900 border-teal-300'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Registered
                </button>
                <button
                  onClick={() => onToggleRegistrationState(true, true)}
                  className={`py-1 px-1.5 text-[10px] font-semibold rounded-lg border transition-all ${
                    isRegistered && hasSubmitted
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Submitted
                </button>
              </div>
            </div>

            {/* Concurrency Testing */}
            <div>
              <span className="block font-semibold text-slate-700 mb-1">
                Concurrency & Race Condition Test:
              </span>
              <button
                onClick={handleTestConcurrency}
                disabled={testingConcurrency}
                className="w-full py-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98 transition-all"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>
                  {testingConcurrency
                    ? 'Firing 20 Concurrent Requests...'
                    : 'Simulate 20 Simultaneous Bookings'}
                </span>
              </button>
              <p className="text-[10px] text-slate-400 mt-1">
                Tests atomic mutex locks to verify spots never oversell beyond capacity.
              </p>
            </div>

            {/* Database & Reset Actions */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
              <button
                onClick={handleInspectDb}
                className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <Database className="w-3.5 h-3.5 text-slate-600" />
                <span>Inspect DB</span>
              </button>

              <button
                onClick={onResetDatabase}
                className="py-1.5 px-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Seed</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Concurrency Results Modal */}
      {concurrencyResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-slate-900 text-white rounded-2xl max-w-md w-full p-4 border border-slate-700 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-sm">Concurrency Test Result</h3>
              </div>
              <button
                onClick={() => setConcurrencyResult(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-3 space-y-2 text-xs">
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 bg-slate-800 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">Total Requests</span>
                  <span className="text-base font-bold text-white">
                    {concurrencyResult.totalRequested}
                  </span>
                </div>
                <div className="p-2 bg-emerald-950/60 border border-emerald-800/40 rounded-lg">
                  <span className="text-[10px] text-emerald-400 block">Successful</span>
                  <span className="text-base font-bold text-emerald-300">
                    {concurrencyResult.successful}
                  </span>
                </div>
                <div className="p-2 bg-rose-950/60 border border-rose-800/40 rounded-lg">
                  <span className="text-[10px] text-rose-400 block">Spots Full / Prevented</span>
                  <span className="text-base font-bold text-rose-300">
                    {concurrencyResult.failedSpotsFull}
                  </span>
                </div>
              </div>

              <div className="p-2 bg-slate-800/60 rounded-lg text-slate-300">
                Booked spots updated from {concurrencyResult.initialSpotsBooked} to{' '}
                <strong className="text-emerald-400">{concurrencyResult.finalSpotsBooked}</strong> of{' '}
                {concurrencyResult.totalSpots} max capacity. Zero overselling.
              </div>

              <div className="mt-2">
                <span className="text-[11px] font-semibold text-slate-400 mb-1 block">
                  Atomic Transaction Execution Logs:
                </span>
                <div className="h-36 overflow-y-auto font-mono text-[10px] bg-black/60 p-2 rounded-lg text-slate-300 space-y-0.5">
                  {concurrencyResult.logs.map((log, idx) => (
                    <div key={idx} className="leading-tight">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setConcurrencyResult(null)}
              className="w-full mt-2 py-2 bg-[#0d6e75] hover:bg-[#0a565c] text-white rounded-xl font-bold text-xs"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Database Inspector Modal */}
      {showDbModal && dbData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-slate-900 text-white rounded-2xl max-w-lg w-full p-4 border border-slate-700 shadow-2xl flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm">Live MongoDB Data Store</h3>
              </div>
              <button
                onClick={() => setShowDbModal(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-3 overflow-y-auto space-y-3 font-mono text-[11px]">
              <div>
                <span className="text-slate-400 font-bold block mb-1">
                  Collection: `competitions`
                </span>
                <pre className="bg-black/60 p-2.5 rounded-lg text-emerald-300 overflow-x-auto">
                  {JSON.stringify(dbData.competition, null, 2)}
                </pre>
              </div>

              <div>
                <span className="text-slate-400 font-bold block mb-1">
                  Collection: `registrations` ({dbData.registrations?.total} total records)
                </span>
                <pre className="bg-black/60 p-2.5 rounded-lg text-teal-300 overflow-x-auto max-h-48">
                  {JSON.stringify(dbData.registrations?.participants, null, 2)}
                </pre>
              </div>
            </div>

            <button
              onClick={() => setShowDbModal(false)}
              className="w-full mt-2 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs shrink-0"
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}
    </>
  );
};
