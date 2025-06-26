'use client';

import { useState } from 'react';
import './YouTubePlayer.css';

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  className?: string;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ 
  videoId, 
  title, 
  className = '' 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`youtube-player ${className}`}>
      <div className="youtube-wrapper">
        {!isLoaded && (
          <div className="youtube-loading">
            <div className="loading-spinner"></div>
          </div>
        )}
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={handleLoad}
          style={{ opacity: isLoaded ? 1 : 0 }}
        ></iframe>
      </div>
    </div>
  );
}; 