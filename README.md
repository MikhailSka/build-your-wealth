# Build Your Wealth - Investment Learning Platform

A modern Next.js application for learning investment strategies through video lessons, interactive calculators, and visualizations.

## Features

- 🎥 **Video Lessons**: Structured learning path with YouTube integration
- 🔍 **Smart Search**: Real-time search across lesson titles, descriptions, and tags
- 📊 **Interactive Elements**: Calculators, charts, and visualizations
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- 🔐 **User Profiles**: Track progress and manage preferences

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main page component
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Header/           # Header with search and profile
│   ├── SearchBar/        # Search functionality
│   ├── ProfileMenu/      # User profile dropdown
│   ├── Timeline/         # Lesson timeline display
│   └── TimelineItem/     # Individual lesson cards
├── data/                 # Static data and configurations
│   └── lessons.ts        # Lesson data (easily configurable)
├── types/                # TypeScript type definitions
│   └── lesson.ts         # Lesson interface
└── utils/                # Utility functions
    └── supabaseClient.ts # Supabase integration
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Adding New Lessons

To add new lessons, simply update the `src/data/lessons.ts` file:

```typescript
{
  id: '6',
  title: 'Your New Lesson',
  description: 'Lesson description...',
  duration: '25:00',
  difficulty: 'Beginner',
  category: 'Your Category',
  tags: ['tag1', 'tag2'],
  youtubeUrl: 'https://youtube.com/watch?v=your-video',
  publishedAt: '2024-02-20',
  hasCalculator: true,
  hasCharts: true,
  hasVisualizations: false
}
```

## Design Principles

- **DRY (Don't Repeat Yourself)**: Components are reusable and modular
- **SOLID Principles**: Each component has a single responsibility
- **Type Safety**: Full TypeScript support with proper interfaces
- **Accessibility**: Semantic HTML and keyboard navigation
- **Performance**: Optimized for fast loading and smooth interactions

## Deployment

The project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Backend as a Service (database, auth, etc.)
- **Vercel** - Deployment platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own learning platform!
