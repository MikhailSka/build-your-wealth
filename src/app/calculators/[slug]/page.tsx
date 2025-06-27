import { notFound } from 'next/navigation';
import CalculatorPageClient from './CalculatorPageClient';

// Calculator slug mapping
const calculatorSlugs = {
  'compound-interest': 1,
  'portfolio-allocation': 2,
  'retirement-planning': 3,
  'risk-assessment': 4,
  'mortgage': 5,
  'emergency-fund': 6,
  'debt-payoff': 7,
  'savings-goal': 8,
  'net-worth': 9,
  'investment-return': 10,
  'tax-impact': 11,
  'budget-planner': 12,
};

// Generate static params for all calculator slugs
export function generateStaticParams() {
  return Object.keys(calculatorSlugs).map((slug) => ({
    slug,
  }));
}

interface CalculatorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CalculatorPage({ params }: CalculatorPageProps) {
  const { slug } = await params;
  const calculatorId = calculatorSlugs[slug as keyof typeof calculatorSlugs];

  // If calculator doesn't exist, show 404
  if (!calculatorId) {
    notFound();
  }

  return <CalculatorPageClient calculatorId={calculatorId} />;
} 