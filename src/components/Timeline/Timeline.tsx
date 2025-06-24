'use client';

import { TimelineProps } from '@/types/lesson';
import { TimelineItem } from './TimelineItem';
import { SearchBar } from '../SearchBar/SearchBar';
import './Timeline.css';

interface TimelineComponentProps extends TimelineProps {
  onSearch: (query: string) => void;
}

export const Timeline: React.FC<TimelineComponentProps> = ({ 
  lessons, 
  searchQuery, 
  onLessonClick,
  onSearch
}) => {
  const filteredLessons = lessons.filter(lesson => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      lesson.title.toLowerCase().includes(query) ||
      lesson.description.toLowerCase().includes(query) ||
      lesson.category.toLowerCase().includes(query) ||
      lesson.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  if (filteredLessons.length === 0) {
    return (
      <div className="timeline-empty">
        <div className="empty-state">
          <h3>No lessons found</h3>
          <p>Try adjusting your search terms or browse all lessons.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="timeline">
      <div className="timeline-header">
        <h2>Investment Lessons</h2>
        <p>{filteredLessons.length} lesson{filteredLessons.length !== 1 ? 's' : ''} available</p>
      </div>
      
      <div className="timeline-search">
        <SearchBar onSearch={onSearch} />
      </div>
      
      <div className="timeline-container">
        {filteredLessons.map((lesson, index) => (
          <TimelineItem
            key={lesson.id}
            lesson={lesson}
            index={index}
            onClick={() => onLessonClick(lesson)}
            isLast={index === filteredLessons.length - 1}
          />
        ))}
      </div>
    </div>
  );
}; 