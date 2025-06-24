'use client';

import { Calculator, BarChart3, Eye, Play, Clock, TrendingUp, CheckCircle2, Loader2, Hourglass } from 'lucide-react';
import { Lesson } from '@/types/lesson';
import './TimelineItem.css';

interface TimelineItemProps {
  lesson: Lesson;
  index: number;
  onClick: () => void;
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
    icon: <Loader2 size={22} className="spin" />,
  },
  'coming-soon': {
    label: 'Coming Soon',
    color: 'coming-soon',
    icon: <Hourglass size={22} />,
  },
};

export const TimelineItem: React.FC<TimelineItemProps> = ({ lesson, index, onClick, isLast }) => {
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

  return (
    <div className="timeline-item" style={{position: 'relative', width: '100%'}}>
      <div className={`timeline-status-dot ${statusProps.color}`}>{statusProps.icon}</div>
      <div className="timeline-content">
        <div className="timeline-header">
          <h3 className="timeline-title">{lesson.title}</h3>
          <div className="timeline-meta">
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
            <span className="timeline-level">
              <TrendingUp size={14} />
              {lesson.difficulty}
            </span>
          </div>
        </div>

        <p className="timeline-description">{lesson.description}</p>

        <div className="timeline-features">
          {lesson.hasCalculator && (
            <span className="feature-tag">
              <Calculator className="feature-icon" />
              Calculator
            </span>
          )}
          {lesson.hasCharts && (
            <span className="feature-tag">
              <BarChart3 className="feature-icon" />
              Charts
            </span>
          )}
          {lesson.hasVisualizations && (
            <span className="feature-tag">
              <Eye className="feature-icon" />
              Visualizations
            </span>
          )}
          {lesson.tags.slice(0, 3).map((tag, tagIndex) => (
            <span key={tagIndex} className="feature-tag">
              {tag}
            </span>
          ))}
          {lesson.tags.length > 3 && (
            <span className="feature-tag">
              +{lesson.tags.length - 3} more
            </span>
          )}
        </div>

        <div className="timeline-actions">
          <button className="start-button" onClick={onClick}>
            <Play size={16} />
            Start Lesson
          </button>
          <button className="preview-button">
            <Eye size={16} />
            Preview
          </button>
          <div className="progress-indicator">
            <span>Progress</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {!isLast && <div className="timeline-connector-line" />}
    </div>
  );
}; 