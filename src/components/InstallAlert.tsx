"use client";

import { useEffect, useState } from "react";
import { Alert, Button } from "@nextui-org/react";

export default function InstallAlertClient() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallAlert, setShowInstallAlert] = useState(false); // Alert visibility state
  const [isVisible, setIsVisible] = useState(false); // For transitions

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault(); // Prevent the default mini-infobar from appearing
      setDeferredPrompt(event); // Save the event for triggering later

      // Show the alert with a delay for smooth appearance
      setShowInstallAlert(true);
      const appearTimer = setTimeout(() => {
        setIsVisible(true); // Trigger fade-in after 1 second
      }, 700);

      // Auto-hide the alert after 3 seconds (plus the initial delay)
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setShowInstallAlert(false);
        }, 500);
      }, 3000);

      return () => {
        clearTimeout(appearTimer);
        clearTimeout(hideTimer);
      };
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        setDeferredPrompt(null);
        setIsVisible(false);
        setTimeout(() => setShowInstallAlert(false), 500);
      });
    }
  };

  if (!showInstallAlert) return null;

  return (
    <div
      className={`fixed sm:top-[5%] top-[2%] left-1/2 transform -translate-x-1/2 w-[90%] sm:w-96 max-w-[300px] z-50 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Alert
        className="flex items-center justify-between"
        description=""
        endContent={
          <Button
            color="success"
            size="md"
            className="mx-auto"
            variant="flat"
            onPress={handleInstallClick}
          >
            Install
          </Button>
        }
        title="Install Available"
        variant="faded"
      />
    </div>
  );
}
