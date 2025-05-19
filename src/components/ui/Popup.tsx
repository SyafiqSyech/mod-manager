import React, { useEffect, useRef } from 'react';
import { IconX } from '@tabler/icons-react';
import Portal from './Portal';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, title, children }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node) && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);
  
  useEffect(() => {
    if (isOpen && popupRef.current) {
      const focusableElements = popupRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <Portal>
      <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm">
        <div 
          ref={popupRef}
          className="bg-bg-secondary rounded-xl p-4 max-w-md w-full max-h-[90vh] overflow-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-bold text-contrast">{title}</div>
            <div 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-bg-secondary-muted cursor-pointer"
              aria-label="Close"
            >
              <IconX size={20} className="stroke-primary" />
            </div>
          </div>
          <div className="popup-content">
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Popup;