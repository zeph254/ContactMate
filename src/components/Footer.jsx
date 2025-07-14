import { useState, useEffect } from 'react';
import { FaDownload,FaHome,FaUser,FaInfoCircle,FaEnvelope,FaGithub,FaTwitter,FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [installClicked, setInstallClicked] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      console.log('🎯 beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
      
      // For iOS devices
      checkIosInstallability();
    };

    const checkIosInstallability = () => {
      // Check if iOS and in standalone mode
      const isIos = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone|ipad|ipod/.test(userAgent);
      };
      
      const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
      
      if (isIos() && !isInStandaloneMode()) {
        setIsInstallable(true);
      }
    };

    const checkInstallStatus = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      if (isStandalone) {
        console.log('ℹ️ App already installed');
        setIsInstallable(false);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', () => {
      console.log('🎉 App successfully installed');
      setIsInstallable(false);
    });

    checkInstallStatus();

    // Development override
    if (import.meta.env.MODE === 'development') {
      console.log('🔧 Development mode - simulating install availability');
      setIsInstallable(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.log('ℹ️ No deferred prompt, showing manual install instructions');
      
      // Show manual installation instructions
      const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
      const isSafari = /safari/i.test(navigator.userAgent);
      
      if (isIos && isSafari) {
        alert('To install this app, tap the Share button and select "Add to Home Screen"');
      } else {
        alert('To install this app, look for the install option in your browser menu (usually three dots in the top right corner)');
      }
      
      return;
    }

    console.log('🔄 Prompting installation');
    setInstallClicked(true);
    
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      console.log(`User ${outcome} the install prompt`);
      if (outcome === 'accepted') {
        console.log('✅ User accepted install');
      } else {
        console.log('❌ User dismissed install');
      }
    } catch (error) {
      console.error('⚠️ Error during installation:', error);
    } finally {
      setDeferredPrompt(null);
      setIsInstallable(false);
      setInstallClicked(false);
    }
  };

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/', icon: <FaHome className="mr-2" /> },
    { name: 'Contacts', path: '/contact', icon: <FaUser className="mr-2" /> },
    { name: 'About', path: '/about', icon: <FaInfoCircle className="mr-2" /> },
    { name: 'Contact Us', path: '/contact-us', icon: <FaEnvelope className="mr-2" /> }
  ];

  // Social links
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com', icon: <FaGithub /> },
    { name: 'Twitter', url: 'https://twitter.com', icon: <FaTwitter /> },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: <FaLinkedin /> }
  ];

  return (
    <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* App Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">ContactMate</h3>
            <p className="text-sm text-white/80">
              Your ultimate contact management solution for personal and professional use.
            </p>
        {isInstallable && (
          <div className="text-center mt-6">
            <button
              onClick={handleInstallClick}
              disabled={installClicked}
              className={`flex items-center justify-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition-all mx-auto ${
                installClicked ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label="Install App"
            >
              <FaDownload className="text-lg" />
              <span>{installClicked ? 'Installing...' : 'Install App'}</span>
            </button>
            <p className="text-xs text-white/80 mt-2">
              Add to your home screen for better experience
            </p>
          </div>
            )}
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="flex items-center text-white/80 hover:text-white transition-colors"
                  >
                    {link.icon}
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-white/80 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-white/80 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/cookies" className="text-white/80 hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="/licenses" className="text-white/80 hover:text-white transition-colors">Licenses</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-200 transition-colors text-2xl"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/70">
            &copy; {new Date().getFullYear()} ContactMate. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="/sitemap" className="text-sm text-white/70 hover:text-white">Sitemap</a>
            <a href="/accessibility" className="text-sm text-white/70 hover:text-white">Accessibility</a>
          </div>
        </div>

        {/* Development Notice */}
        {import.meta.env.MODE === 'development' && (
          <div className="text-center text-xs text-white/50 mt-4">
            Development mode - install prompt simulated
          </div>
        )}
      </div>
    </footer>
  );
}