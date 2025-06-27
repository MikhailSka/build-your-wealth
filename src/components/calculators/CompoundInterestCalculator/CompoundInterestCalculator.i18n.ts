export const compoundInterestCalculatorTranslations = {
  en: {
    title: 'Compound Interest Calculator',
    description: 'Calculate how your investments grow over time with compound interest',
    backButton: 'Back to Calculators',
    
    // Input Section
    inputSection: {
      title: 'Investment Parameters',
      
      startingAmount: {
        label: 'Starting Amount',
        info: 'The amount of money you initially invest or deposit. This is your starting principal that will grow through compound interest over time.'
      },
      
      investmentPeriod: {
        label: 'Investment Period',
        info: 'The number of years you plan to keep your money invested. Longer periods typically result in more significant compound growth.',
        suffix: 'years'
      },
      
      returnRate: {
        label: 'Return Rate',
        info: 'The yearly interest rate (as a percentage) that your investment will earn. This rate is compounded according to your selected frequency.'
      },
      
      compound: {
        label: 'Compound',
        info: 'How often the interest is calculated and added to your principal. More frequent compounding generally results in higher returns.',
        options: {
          annually: 'Annually',
          semiAnnually: 'Semi-annually',
          quarterly: 'Quarterly',
          monthly: 'Monthly',
          daily: 'Daily'
        }
      },
      
      regularContribution: {
        label: 'Regular Contribution',
        info: 'Additional amount you plan to contribute regularly to your investment. This will be added according to your selected contribution frequency.'
      },
      
      contributionFrequency: {
        label: 'Contribution Frequency',
        info: 'How often you will make additional contributions to your investment. More frequent contributions can significantly boost your total returns.',
        options: {
          none: 'No regular contributions',
          monthly: 'Monthly',
          quarterly: 'Quarterly',
          annually: 'Annually'
        }
      },
      
      contributionTiming: {
        label: 'Contribute at the',
        info: 'Whether you make contributions at the beginning or end of each period. Beginning-of-period contributions earn interest for the full period.',
        options: {
          beginning: 'Beginning',
          end: 'End'
        }
      }
    },
    
    // Results Section
    resultsSection: {
      title: 'Calculation Results',
      
      finalAmount: {
        label: 'Final Amount',
        description: 'Total value of your investment after compound interest'
      },
      
      pieChart: {
        title: 'Investment Breakdown',
        startingAmount: 'Starting Amount',
        totalContributions: 'Total Contributions',
        interest: 'Interest'
      }
    },

    // Charts Section
    chartsSection: {
      title: 'Visual Analysis',
      
      growthChart: {
        title: 'Capital Growth Over Time',
        xAxisLabel: 'Year',
        yAxisLabel: 'Amount ($)',
        tooltipPrefix: 'Year'
      }
    },

    // Accumulation Schedule
    accumulationSchedule: {
      title: 'Accumulation Schedule',
      yearSelector: {
        label: 'Select Year',
        allYears: 'All Years'
      },
      year: 'Year',
      month: 'Month',
      yearLabel: 'Year',
      monthLabel: 'Month',
      startingBalance: 'Starting Balance',
      contribution: 'Contribution',
      interest: 'Interest',
      endingBalance: 'Ending Balance'
    }
  },

  ru: {
    title: 'Калькулятор Сложных Процентов',
    description: 'Рассчитайте, как растут ваши инвестиции со временем благодаря сложным процентам',
    backButton: 'Назад к Калькуляторам',
    
    // Input Section
    inputSection: {
      title: 'Параметры Инвестиций',
      
      startingAmount: {
        label: 'Начальная Сумма',
        info: 'Сумма денег, которую вы первоначально инвестируете или вкладываете. Это ваш стартовый капитал, который будет расти благодаря сложным процентам со временем.'
      },
      
      investmentPeriod: {
        label: 'Период Инвестиций',
        info: 'Количество лет, в течение которых вы планируете держать деньги в инвестициях. Более длительные периоды обычно приводят к более значительному росту сложных процентов.',
        suffix: 'лет'
      },
      
      returnRate: {
        label: 'Доходность',
        info: 'Годовая процентная ставка (в процентах), которую будут приносить ваши инвестиции. Эта ставка капитализируется согласно выбранной частоте.'
      },
      
      compound: {
        label: 'Капитализация',
        info: 'Как часто проценты рассчитываются и добавляются к вашему основному капиталу. Более частая капитализация обычно приводит к более высокой доходности.',
        options: {
          annually: 'Ежегодно',
          semiAnnually: 'Раз в полгода',
          quarterly: 'Ежеквартально',
          monthly: 'Ежемесячно',
          daily: 'Ежедневно'
        }
      },
      
      regularContribution: {
        label: 'Регулярные Взносы',
        info: 'Дополнительная сумма, которую вы планируете регулярно вносить в свои инвестиции. Она будет добавляться согласно выбранной частоте взносов.'
      },
      
      contributionFrequency: {
        label: 'Частота Взносов',
        info: 'Как часто вы будете делать дополнительные взносы в свои инвестиции. Более частые взносы могут значительно увеличить общую доходность.',
        options: {
          none: 'Без регулярных взносов',
          monthly: 'Ежемесячно',
          quarterly: 'Ежеквартально',
          annually: 'Ежегодно'
        }
      },
      
      contributionTiming: {
        label: 'Вносить в',
        info: 'Делаете ли вы взносы в начале или в конце каждого периода. Взносы в начале периода приносят проценты за весь период.',
        options: {
          beginning: 'Начале',
          end: 'Конце'
        }
      }
    },
    
    // Results Section
    resultsSection: {
      title: 'Результаты Расчета',
      
      finalAmount: {
        label: 'Итоговая Сумма',
        description: 'Общая стоимость ваших инвестиций после сложных процентов'
      },
      
      pieChart: {
        title: 'Структура Инвестиций',
        startingAmount: 'Начальная Сумма',
        totalContributions: 'Общие Взносы',
        interest: 'Проценты'
      }
    },

    // Charts Section
    chartsSection: {
      title: 'Визуальный Анализ',
      
      growthChart: {
        title: 'Рост Капитала Во Времени',
        xAxisLabel: 'Год',
        yAxisLabel: 'Сумма (₽)',
        tooltipPrefix: 'Год'
      }
    },

    // Accumulation Schedule
    accumulationSchedule: {
      title: 'График Накопления',
      yearSelector: {
        label: 'Выбрать Год',
        allYears: 'Все Годы'
      },
      year: 'Год',
      month: 'Месяц',
      yearLabel: 'Год',
      monthLabel: 'Месяц',
      startingBalance: 'Начальный Баланс',
      contribution: 'Взнос',
      interest: 'Проценты',
      endingBalance: 'Конечный Баланс'
    }
  }
};

// Default to English, but this should be controlled by the language context
export const t = compoundInterestCalculatorTranslations.en; 