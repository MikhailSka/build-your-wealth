import { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import { createPortal } from 'react-dom';
import './InfoButton.css';

interface InfoButtonProps {
  text: string;
}

export function InfoButton({ text }: InfoButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsVisible(false);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isMobile) {
      setIsVisible(!isVisible);
    }
  };

  const closeTooltip = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div 
        className="info-button"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <Info size={12} />
        {/* Desktop tooltip */}
        {!isMobile && (
          <div className={`desktop-tooltip ${isVisible ? 'visible' : ''}`}>
            {text}
          </div>
        )}
      </div>
      
      {/* Mobile modal */}
      {isVisible && isMobile && typeof window !== 'undefined' && createPortal(
        <div className="tooltip-overlay" onClick={closeTooltip}>
          <div className="tooltip-modal" onClick={(e) => e.stopPropagation()}>
            <button className="tooltip-close" onClick={closeTooltip}>×</button>
            <div className="tooltip-content">{text}</div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
} 