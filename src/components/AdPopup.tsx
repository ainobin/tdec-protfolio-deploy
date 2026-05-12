"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useActiveAd } from "@/context/AdContext";

// Module-level flag to track if initial modal has been shown (persists across remounts)
let hasShownInitialModal = false;

export default function AdPopup() {
  const { activeAd, isLoading, error } = useActiveAd();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Show modal when ad is first loaded (only once per session)
  useEffect(() => {
    // Only show modal once when ad first becomes available
    if (activeAd && !isLoading && !hasShownInitialModal) {
      hasShownInitialModal = true;
      // Use requestAnimationFrame to defer state update and avoid cascading render warning
      requestAnimationFrame(() => {
        setIsModalOpen(true);
      });
    }
  }, [activeAd, isLoading]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  // Don't render if loading or no ad
  if (isLoading || !activeAd) {
    return null;
  }

  // Don't render if there was an error and no cached ad
  if (error && !activeAd) {
    return null;
  }

  return (
    <>
      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-white/5 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scaleIn animate-attention"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-gray-900 bg-opacity-70 hover:bg-opacity-90 text-white rounded-full transition-all transform hover:scale-110"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content */}
            <div className="p-6">
              {activeAd.type === "image" && activeAd.imageUrl && (
                <div className="w-full relative">
                  <Image
                    src={activeAd.imageUrl}
                    alt="Advertisement"
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-lg"
                    style={{ maxHeight: "70vh", objectFit: "contain" }}
                    priority
                  />
                </div>
              )}

              {activeAd.type === "text" && activeAd.textContent && (
                <div className="prose max-w-none">
                  <div className="text-center">
                    <div className="text-4xl mb-4">📢</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 wrap-break-word line-clamp-2">
                      Announcement
                    </h2>
                    <div className="text-gray-700 text-lg whitespace-pre-wrap leading-relaxed wrap-break-word">
                      {activeAd.textContent}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Reopen Button */}
      {!isModalOpen && (
        <button
          onClick={openModal}
          className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center z-40 transition-all animate-pulse-custom"
          aria-label="View Advertisement"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
            />
          </svg>
        </button>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Attention zoom animation */
        @keyframes attentionZoom {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
        }

        @keyframes pulsing {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-in-out;
        }

        .animate-attention {
          animation: attentionZoom 2.5s ease-in-out infinite;
        }

        .animate-pulse-custom {
          animation: pulsing 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
