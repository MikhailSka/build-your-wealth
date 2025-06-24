export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  tags: string[];
  youtubeUrl?: string;
  thumbnailUrl?: string;
  publishedAt: string;
  isCompleted?: boolean;
  hasCalculator?: boolean;
  hasCharts?: boolean;
  hasVisualizations?: boolean;
  status?: 'completed' | 'in-progress' | 'coming-soon';
}

export interface TimelineProps {
  lessons: Lesson[];
  searchQuery: string;
  onLessonClick: (lesson: Lesson) => void;
} 