"use client";

import { useEffect, useState } from "react";
import { Download, Check, Smartphone } from "lucide-react";

export default function PWAHandler() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Service worker registration
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => {
            console.log("PWA ServiceWorker registered with scope:", reg.scope);
          })
          .catch((err) => {
            console.error("PWA ServiceWorker registration failed:", err);
          });
      });
    }

    // Check if app is already running in standalone/PWA mode
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
    }

    // Listen for PWA installation prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  if (isInstalled || !isInstallable) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-[#000000] text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border-2 border-[#B8860B] flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 max-w-[360px]">
      <div className="w-10 h-10 rounded-xl bg-[#B8860B]/20 border border-[#B8860B] flex items-center justify-center shrink-0">
        <Smartphone className="w-5 h-5 text-[#B8860B]" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-black tracking-tight text-white uppercase">
          Install Sweety POS
        </h4>
        <p className="text-[10px] text-gray-300 font-semibold truncate">
          Add app to home screen for fast offline access
        </p>
      </div>
      <button
        onClick={handleInstallClick}
        className="bg-[#B8860B] hover:bg-[#966d09] text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-sm flex items-center gap-1 shrink-0"
      >
        <Download className="w-3.5 h-3.5" />
        Install
      </button>
    </div>
  );
}
