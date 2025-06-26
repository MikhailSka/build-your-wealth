import React, { useEffect, useState, useRef } from 'react';
import './FinancialBackground.css';

interface FinancialBackgroundProps {
  children: React.ReactNode;
  variant?: 'default' | 'minimal';
}

interface ChartPosition {
  top: number;
  animationDelay: number;
  scale: number;
  rotation: number;
  duration: number;
}

// Global state to persist animation across pages
let globalAnimationState: ChartPosition[] | null = null;
let globalAnimationStartTime: number | null = null;

export const FinancialBackground: React.FC<FinancialBackgroundProps> = ({ 
  children, 
  variant = 'default' 
}) => {
  const [chartPositions, setChartPositions] = useState<ChartPosition[]>([]);
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Generate or restore chart positions
  useEffect(() => {
    if (globalAnimationState && globalAnimationStartTime) {
      // Restore existing state and calculate current animation time
      const currentTime = Date.now();
      const elapsedTime = (currentTime - globalAnimationStartTime) / 1000; // Convert to seconds
      
      // Update delays based on elapsed time to maintain continuity
      const updatedPositions = globalAnimationState.map(pos => ({
        ...pos,
        animationDelay: pos.animationDelay - elapsedTime
      }));
      
      setChartPositions(updatedPositions);
    } else {
      // Generate new random positions
      const newPositions: ChartPosition[] = [];
      
      for (let i = 0; i < 8; i++) {
        newPositions.push({
          top: Math.random() * 85 + 5, // Random between 5% and 90%
          animationDelay: Math.random() * -20, // Random delay between 0 and -20s
          scale: 0.7 + Math.random() * 0.6, // Random scale between 0.7 and 1.3
          rotation: Math.random() * 360, // Random rotation
          duration: 20 + Math.random() * 15 // Random duration between 20-35s
        });
      }
      
      setChartPositions(newPositions);
      globalAnimationState = newPositions;
      globalAnimationStartTime = Date.now();
    }
  }, []);

  // Update global state when component unmounts or positions change
  useEffect(() => {
    if (chartPositions.length > 0) {
      globalAnimationState = chartPositions;
      if (!globalAnimationStartTime) {
        globalAnimationStartTime = Date.now();
      }
    }
  }, [chartPositions]);

  return (
    <div className={`financial-background ${variant}`} ref={backgroundRef}>
      {/* Gradient Background */}
      <div className="gradient-overlay" />
      
      {/* Animated Financial Elements */}
      {variant === 'default' && chartPositions.length > 0 && (
        <>
          {/* Financial Charts */}
          <div className="chart-lines">
            {/* Stock Chart 1 - Small */}
            <div 
              className="chart-line chart-line-dynamic chart-small"
              style={{
                top: `${chartPositions[0]?.top}%`,
                animationDelay: `${chartPositions[0]?.animationDelay}s`,
                animationDuration: `${chartPositions[0]?.duration}s`,
                '--initial-scale': chartPositions[0]?.scale,
                '--initial-rotation': `${chartPositions[0]?.rotation}deg`
              } as React.CSSProperties & { '--initial-scale': number; '--initial-rotation': string }}
            >
              <svg viewBox="0 0 200 120" fill="none">
                <defs>
                  <linearGradient id="stockGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0.1"/>
                  </linearGradient>
                </defs>
                <path
                  d="M10,100 L30,95 L50,80 L70,85 L90,70 L110,60 L130,45 L150,40 L170,25 L190,20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.8"
                />
                <path
                  d="M10,100 L30,95 L50,80 L70,85 L90,70 L110,60 L130,45 L150,40 L170,25 L190,20 L190,110 L10,110 Z"
                  fill="url(#stockGradient1)"
                />
                <circle cx="50" cy="80" r="2" fill="currentColor" opacity="0.6"/>
                <circle cx="90" cy="70" r="2" fill="currentColor" opacity="0.6"/>
                <circle cx="130" cy="45" r="2" fill="currentColor" opacity="0.6"/>
                <circle cx="170" cy="25" r="2" fill="currentColor" opacity="0.6"/>
              </svg>
            </div>

            {/* Pie Chart 1 - Medium */}
            <div 
              className="chart-line chart-line-dynamic chart-medium"
              style={{
                top: `${chartPositions[1]?.top}%`,
                animationDelay: `${chartPositions[1]?.animationDelay}s`,
                animationDuration: `${chartPositions[1]?.duration}s`,
                '--initial-scale': chartPositions[1]?.scale,
                '--initial-rotation': `${chartPositions[1]?.rotation}deg`
              } as React.CSSProperties & { '--initial-scale': number; '--initial-rotation': string }}
            >
              <svg viewBox="0 0 120 120" fill="none">
                <defs>
                  <linearGradient id="pieGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0.2"/>
                  </linearGradient>
                  <linearGradient id="pieGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0.1"/>
                  </linearGradient>
                </defs>
                <path d="M60,60 L60,10 A50,50 0 0,1 95.71,39.29 Z" fill="url(#pieGradient1)" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                <path d="M60,60 L95.71,39.29 A50,50 0 0,1 95.71,80.71 Z" fill="url(#pieGradient2)" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                <path d="M60,60 L95.71,80.71 A50,50 0 0,1 24.29,80.71 Z" fill="url(#pieGradient1)" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                <path d="M60,60 L24.29,80.71 A50,50 0 0,1 60,10 Z" fill="url(#pieGradient2)" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
                <circle cx="60" cy="60" r="15" fill="currentColor" opacity="0.2"/>
              </svg>
            </div>

            {/* Bar Chart 1 - Large */}
            <div 
              className="chart-line chart-line-dynamic chart-large"
              style={{
                top: `${chartPositions[2]?.top}%`,
                animationDelay: `${chartPositions[2]?.animationDelay}s`,
                animationDuration: `${chartPositions[2]?.duration}s`,
                '--initial-scale': chartPositions[2]?.scale,
                '--initial-rotation': `${chartPositions[2]?.rotation}deg`
              } as React.CSSProperties & { '--initial-scale': number; '--initial-rotation': string }}
            >
              <svg viewBox="0 0 160 100" fill="none">
                <defs>
                  <linearGradient id="barGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0.1"/>
                  </linearGradient>
                </defs>
                <rect x="10" y="70" width="15" height="25" fill="url(#barGradient1)" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                <rect x="30" y="60" width="15" height="35" fill="url(#barGradient1)" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                <rect x="50" y="45" width="15" height="50" fill="url(#barGradient1)" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                <rect x="70" y="50" width="15" height="45" fill="url(#barGradient1)" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                <rect x="90" y="35" width="15" height="60" fill="url(#barGradient1)" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                <rect x="110" y="25" width="15" height="70" fill="url(#barGradient1)" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                <rect x="130" y="15" width="15" height="80" fill="url(#barGradient1)" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                <line x1="5" y1="95" x2="150" y2="95" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
              </svg>
            </div>

            {/* Stock Chart 2 - Medium, different pattern */}
            <div 
              className="chart-line chart-line-dynamic chart-medium"
              style={{
                top: `${chartPositions[3]?.top}%`,
                animationDelay: `${chartPositions[3]?.animationDelay}s`,
                animationDuration: `${chartPositions[3]?.duration}s`,
                '--initial-scale': chartPositions[3]?.scale,
                '--initial-rotation': `${chartPositions[3]?.rotation}deg`
              } as React.CSSProperties & { '--initial-scale': number; '--initial-rotation': string }}
            >
              <svg viewBox="0 0 200 120" fill="none">
                <defs>
                  <linearGradient id="stockGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0.1"/>
                  </linearGradient>
                </defs>
                <path
                  d="M10,90 L30,85 L50,95 L70,75 L90,80 L110,65 L130,70 L150,55 L170,60 L190,45"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.7"
                />
                <path
                  d="M10,90 L30,85 L50,95 L70,75 L90,80 L110,65 L130,70 L150,55 L170,60 L190,45 L190,110 L10,110 Z"
                  fill="url(#stockGradient2)"
                />
              </svg>
            </div>

            {/* Pie Chart 2 - Small, different colors */}
            <div 
              className="chart-line chart-line-dynamic chart-small"
              style={{
                top: `${chartPositions[4]?.top}%`,
                animationDelay: `${chartPositions[4]?.animationDelay}s`,
                animationDuration: `${chartPositions[4]?.duration}s`,
                '--initial-scale': chartPositions[4]?.scale,
                '--initial-rotation': `${chartPositions[4]?.rotation}deg`
              } as React.CSSProperties & { '--initial-scale': number; '--initial-rotation': string }}
            >
              <svg viewBox="0 0 120 120" fill="none">
                <defs>
                  <linearGradient id="pieGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0.1"/>
                  </linearGradient>
                </defs>
                <path d="M60,60 L60,10 A50,50 0 1,1 60,110 Z" fill="url(#pieGradient3)" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                <path d="M60,60 L60,110 A50,50 0 0,1 60,10 Z" fill="url(#pieGradient1)" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                <circle cx="60" cy="60" r="20" fill="currentColor" opacity="0.1"/>
              </svg>
            </div>

            {/* Bar Chart 2 - Small, different heights */}
            <div 
              className="chart-line chart-line-dynamic chart-small"
              style={{
                top: `${chartPositions[5]?.top}%`,
                animationDelay: `${chartPositions[5]?.animationDelay}s`,
                animationDuration: `${chartPositions[5]?.duration}s`,
                '--initial-scale': chartPositions[5]?.scale,
                '--initial-rotation': `${chartPositions[5]?.rotation}deg`
              } as React.CSSProperties & { '--initial-scale': number; '--initial-rotation': string }}
            >
              <svg viewBox="0 0 140 80" fill="none">
                <defs>
                  <linearGradient id="barGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0.1"/>
                  </linearGradient>
                </defs>
                <rect x="10" y="60" width="12" height="15" fill="url(#barGradient2)" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                <rect x="25" y="45" width="12" height="30" fill="url(#barGradient2)" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                <rect x="40" y="50" width="12" height="25" fill="url(#barGradient2)" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                <rect x="55" y="35" width="12" height="40" fill="url(#barGradient2)" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                <rect x="70" y="40" width="12" height="35" fill="url(#barGradient2)" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                <rect x="85" y="25" width="12" height="50" fill="url(#barGradient2)" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                <line x1="5" y1="75" x2="100" y2="75" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
              </svg>
            </div>

            {/* Stock Chart 3 - Large, volatile pattern */}
            <div 
              className="chart-line chart-line-dynamic chart-large"
              style={{
                top: `${chartPositions[6]?.top}%`,
                animationDelay: `${chartPositions[6]?.animationDelay}s`,
                animationDuration: `${chartPositions[6]?.duration}s`,
                '--initial-scale': chartPositions[6]?.scale,
                '--initial-rotation': `${chartPositions[6]?.rotation}deg`
              } as React.CSSProperties & { '--initial-scale': number; '--initial-rotation': string }}
            >
              <svg viewBox="0 0 220 140" fill="none">
                <defs>
                  <linearGradient id="stockGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0.1"/>
                  </linearGradient>
                </defs>
                <path
                  d="M10,110 L25,105 L40,95 L55,100 L70,85 L85,90 L100,75 L115,80 L130,65 L145,70 L160,55 L175,50 L190,40 L205,35"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.8"
                />
                <path
                  d="M10,110 L25,105 L40,95 L55,100 L70,85 L85,90 L100,75 L115,80 L130,65 L145,70 L160,55 L175,50 L190,40 L205,35 L205,130 L10,130 Z"
                  fill="url(#stockGradient3)"
                />
              </svg>
            </div>

            {/* Pie Chart 3 - Large */}
            <div 
              className="chart-line chart-line-dynamic chart-large"
              style={{
                top: `${chartPositions[7]?.top}%`,
                animationDelay: `${chartPositions[7]?.animationDelay}s`,
                animationDuration: `${chartPositions[7]?.duration}s`,
                '--initial-scale': chartPositions[7]?.scale,
                '--initial-rotation': `${chartPositions[7]?.rotation}deg`
              } as React.CSSProperties & { '--initial-scale': number; '--initial-rotation': string }}
            >
              <svg viewBox="0 0 140 140" fill="none">
                <defs>
                  <linearGradient id="pieGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0.2"/>
                  </linearGradient>
                </defs>
                <path d="M70,70 L70,10 A60,60 0 0,1 122.32,40.68 Z" fill="url(#pieGradient4)" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                <path d="M70,70 L122.32,40.68 A60,60 0 0,1 122.32,99.32 Z" fill="url(#pieGradient1)" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                <path d="M70,70 L122.32,99.32 A60,60 0 0,1 17.68,99.32 Z" fill="url(#pieGradient4)" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                <path d="M70,70 L17.68,99.32 A60,60 0 0,1 70,10 Z" fill="url(#pieGradient1)" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
                <circle cx="70" cy="70" r="18" fill="currentColor" opacity="0.2"/>
              </svg>
            </div>
          </div>

          {/* Floating Geometric Shapes */}
          <div className="floating-shapes">
            <div className="shape shape-circle shape-1"></div>
            <div className="shape shape-triangle shape-2"></div>
            <div className="shape shape-square shape-3"></div>
            <div className="shape shape-circle shape-4"></div>
            <div className="shape shape-diamond shape-5"></div>
            <div className="shape shape-hexagon shape-6"></div>
          </div>



          {/* Animated Dots */}
          <div className="animated-dots">
            <div className="dot dot-1"></div>
            <div className="dot dot-2"></div>
            <div className="dot dot-3"></div>
            <div className="dot dot-4"></div>
            <div className="dot dot-5"></div>
            <div className="dot dot-6"></div>
            <div className="dot dot-7"></div>
            <div className="dot dot-8"></div>
          </div>
        </>
      )}
      
      {/* Content */}
      <div className="financial-background-content">
        {children}
      </div>
    </div>
  );
}; 