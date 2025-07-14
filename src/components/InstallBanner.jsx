import { useEffect, useState } from 'react';
import { FaDownload, FaTimes } from 'react-icons/fa';

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if already installed
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleMediaChange = (e) => {
      setIsVisible(!e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);
    setIsVisible(!mediaQuery.matches);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User ${outcome} the install prompt`);
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h3 className="font-bold">Install ContactMate</h3>
          <p>Add to your home screen for easy access</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleInstall}
            className="bg-white text-blue-600 px-4 py-2 rounded flex items-center gap-2"
          >
            <FaDownload /> Install
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-blue-200"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  );
}