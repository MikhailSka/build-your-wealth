'use client';

import { Clock, TrendingUp, CheckCircle2, Play, Hourglass, Sparkles, Calendar, Film, Check } from 'lucide-react';
import { Lesson } from '@/types/lesson';
import { YouTubePlayer } from '../YouTubePlayer/YouTubePlayer';
import './TimelineItem.css';

interface TimelineItemProps {
  lesson: Lesson;
  index: number;
  onClick: () => void;
  onComplete?: (lesson: Lesson) => void;
  isLast?: boolean;
}

const statusMap = {
  'completed': {
    label: 'Completed',
    color: 'completed',
    icon: <CheckCircle2 size={22} />,
  },
  'in-progress': {
    label: 'In Progress',
    color: 'in-progress',
    icon: <Play size={22} />,
  },
  'coming-soon': {
    label: 'Coming Soon',
    color: 'coming-soon',
    icon: <Hourglass size={22} />,
  },
};

export const TimelineItem: React.FC<TimelineItemProps> = ({ lesson, index, onClick, onComplete, isLast }) => {
  // Debug logging
  console.log(`Lesson "${lesson.title}": isNew = ${lesson.isNew}`);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'var(--success-500)';
      case 'intermediate':
        return 'var(--warning-500)';
      case 'advanced':
        return 'var(--error-500)';
      default:
        return 'var(--primary-500)';
    }
  };

  const getDifficultyBg = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'var(--success-50)';
      case 'intermediate':
        return 'var(--warning-50)';
      case 'advanced':
        return 'var(--error-50)';
      default:
        return 'var(--primary-50)';
    }
  };

  // Generate deterministic progress based on lesson ID to avoid hydration mismatch
  const getProgressPercentage = (lessonId: string) => {
    let hash = 0;
    for (let i = 0; i < lessonId.length; i++) {
      const char = lessonId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    // Convert to positive number between 20-95%
    return Math.abs(hash % 76) + 20;
  };

  const status = lesson.status || 'in-progress';
  const statusProps = statusMap[status];
  const progressPercentage = getProgressPercentage(lesson.id);

  // Force show NEW badge for lesson #2 for debugging
  const shouldShowNew = lesson.isNew === true || lesson.id === '2';
  console.log(`Should show NEW badge for "${lesson.title}": ${shouldShowNew}`);

  // Render video placeholder based on lesson status
  const renderVideoPlaceholder = () => {
    if (lesson.status === 'coming-soon') {
      return (
        <div className="video-placeholder coming-soon">
          <div className="placeholder-icon-container">
            <Calendar size={48} />
            <Film size={32} className="film-icon" />
          </div>
          <span className="placeholder-title">Coming Soon</span>
          <span className="placeholder-subtitle">Video will be available soon</span>
        </div>
      );
    }
    
    return (
      <div className="video-placeholder no-video">
        <Play size={48} />
        <span>No video available</span>
      </div>
    );
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete(lesson);
    }
  };

  return (
    <div className="timeline-item" style={{position: 'relative', width: '100%'}}>
      <div className={`timeline-status-dot ${statusProps.color}`}>{statusProps.icon}</div>
      <div className="timeline-content">
        {/* Title section */}
        <div className="timeline-title-section">
          {/* Centered title row - FIRST */}
          <div className="timeline-title-row">
            <h3 className="timeline-title">{lesson.title}</h3>
            {shouldShowNew && (
              <span className="new-badge">
                <Sparkles size={16} />
                NEW
              </span>
            )}
          </div>
          
          {/* Meta info row - SECOND (under title) */}
          <div className="timeline-meta-row">
            <div className="timeline-meta-left">
              <span 
                className="timeline-duration"
                style={{ 
                  backgroundColor: getDifficultyBg(lesson.difficulty),
                  color: getDifficultyColor(lesson.difficulty),
                  borderColor: getDifficultyColor(lesson.difficulty) + '40'
                }}
              >
                <Clock size={14} />
                {lesson.duration}
              </span>
              <span className="timeline-category">
                {lesson.category}
              </span>
            </div>
            <div className="timeline-meta-right">
              <span className="timeline-level">
                <TrendingUp size={14} />
                {lesson.difficulty}
              </span>
            </div>
          </div>
        </div>

        <div className="timeline-layout">
          {/* Video Player or Placeholder */}
          <div className="timeline-video">
            {lesson.youtubeId && lesson.status !== 'coming-soon' ? (
              <YouTubePlayer 
                videoId={lesson.youtubeId} 
                title={lesson.title}
                className="lesson-video-player"
              />
            ) : (
              renderVideoPlaceholder()
            )}
          </div>

          {/* Narrower content on the right */}
          <div className="timeline-info">
            <p className="timeline-description">{lesson.description}</p>

            <div className="timeline-actions">
              <button 
                className="start-button" 
                onClick={onClick}
                disabled={lesson.status === 'coming-soon'}
              >
                <Play size={16} />
                {lesson.status === 'coming-soon' ? 'Coming Soon' : 'Start Lesson'}
              </button>
              
              {lesson.status !== 'coming-soon' && lesson.status !== 'completed' && (
                <button 
                  className="complete-button"
                  onClick={handleComplete}
                >
                  <Check size={16} />
                </button>
              )}
            </div>
            
            <div className="progress-section">
              <div className="progress-indicator">
                <span>Progress</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${lesson.status === 'coming-soon' ? 0 : progressPercentage}%` }}
                  ></div>
                </div>
                <span className="progress-text">{lesson.status === 'coming-soon' ? '0%' : `${progressPercentage}%`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isLast && <div className="timeline-connector-line" />}
    </div>
  );
}; 