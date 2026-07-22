"use client";

import { useState } from "react";
import { AlertTriangle, X, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitReport } from "@/lib/moderation";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId: string;
  targetType: "blog" | "comment" | "message" | "user";
}

const REPORT_REASONS = [
  "Spam or misleading content",
  "Harassment or hate speech",
  "Plagiarism or copyright violation",
  "Inappropriate or offensive material",
  "Malicious code or phishing link"
];

export function ReportModal({ isOpen, onClose, targetId, targetType }: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReason) return;

    setSubmitting(true);
    await submitReport({
      targetId,
      targetType,
      reason: selectedReason,
      details
    });
    setSubmitting(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <X size={20} />
        </button>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 size={48} className="text-emerald-500 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-white">Report Submitted</h3>
            <p className="text-sm text-zinc-400">Thank you for keeping our community safe. Our moderators will review this item.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <ShieldAlert size={24} />
              <h2 className="text-lg font-bold text-white">Report {targetType}</h2>
            </div>

            <p className="text-xs text-zinc-400">
              Select the primary reason for reporting this {targetType}:
            </p>

            <div className="space-y-2">
              {REPORT_REASONS.map((reason) => (
                <label
                  key={reason}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors text-xs font-medium ${
                    selectedReason === reason
                      ? "border-red-500 bg-red-500/10 text-white"
                      : "border-zinc-800 bg-zinc-950/50 text-zinc-300 hover:border-zinc-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="accent-red-500"
                  />
                  {reason}
                </label>
              ))}
            </div>

            <div>
              <textarea
                placeholder="Additional details (optional)..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs outline-none focus:border-red-500 resize-none"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={!selectedReason || submitting}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {submitting ? "Submitting..." : "Submit Report"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
