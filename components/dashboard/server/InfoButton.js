// components/dashboard/server/InfoButton.js
import { useState, useEffect, useRef } from 'react';
import { Info } from 'lucide-react';

const sectionInfo = {
  general: "Configure basic bot settings and behavior for your server. These settings affect how the bot interacts and responds to users.",
  tools: "Enable or disable various bot tools and utilities. Customize which features are available to enhance your server's capabilities.",
  features: "Manage advanced bot features like image recognition and file handling. Control powerful functionalities to improve your server experience.",
  personality: "Customize your bot's personality and behavior patterns. Choose from preset personalities or create your own custom persona."
};

export default function InfoButton({ section }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className="info-button-wrapper">
      <button
        ref={buttonRef}
        className="info-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Information about ${section} settings`}
      >
        <Info size={18} />
      </button>
      
      {isOpen && (
        <div 
          ref={dropdownRef}
          className="info-dropdown"
          role="tooltip"
        >
          {sectionInfo[section]}
        </div>
      )}
    </div>
  );
}
