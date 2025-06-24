'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header/Header';
import { FinancialBackground } from '@/components/FinancialBackground/FinancialBackground';
import { Timeline } from '@/components/Timeline/Timeline';
import { lessonsData } from '@/data/lessons';
import { useTheme } from '@/contexts/ThemeContext';
import { Lesson } from '@/types/lesson';

export default function LessonsPage() {
  const [filteredLessons, setFilteredLessons] = useState<Lesson[]>(lessonsData);
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredLessons(lessonsData);
    } else {
      const filtered = lessonsData.filter(lesson =>
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredLessons(filtered);
    }
  }, [searchTerm]);

  const handleLessonClick = (lesson: Lesson) => {
    console.log('Lesson clicked:', lesson);
    if (lesson.youtubeUrl) {
      window.open(lesson.youtubeUrl, '_blank');
    }
  };

  return (
    <FinancialBackground>
      <Header />
      <main className="relative">
        <Timeline 
          lessons={filteredLessons}
          searchQuery={searchTerm}
          onLessonClick={handleLessonClick}
          onSearch={setSearchTerm}
        />
      </main>
    </FinancialBackground>
  );
} 