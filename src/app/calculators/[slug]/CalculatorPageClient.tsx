'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header/Header';
import { FinancialBackground } from '@/components/FinancialBackground/FinancialBackground';
import { CompoundInterestCalculator } from '@/components/calculators';


interface CalculatorPageClientProps {
  calculatorId: number;
}

export default function CalculatorPageClient({ calculatorId }: CalculatorPageClientProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBack = () => {
    router.push('/calculators');
  };

  // Show loading for hydration
  if (!mounted) {
    return null;
  }

  // Render the appropriate calculator
  switch (calculatorId) {
    case 1:
      return (
        <FinancialBackground>
          <Header />
          <main className="relative">
            <CompoundInterestCalculator onBack={handleBack} />
          </main>
        </FinancialBackground>
      );
    default:
      // For calculators that aren't implemented yet, redirect back
      router.push('/calculators');
      return null;
  }
} 