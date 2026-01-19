import { useEffect, useRef } from 'react';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const PITCH_NAMES: Record<string, string> = {
  FF: 'Fastball',
  FC: 'Cutter',
  SI: 'Sinker',
  CU: 'Curveball',
  KC: 'Knuckle Curve',
  SL: 'Slider',
  ST: 'Sweeper',
  CH: 'Changeup',
  FS: 'Splitter'
};

const PITCH_COLORS: Record<string, string> = {
  FF: '#dd1111',
  FC: '#ff84b3',
  SI: '#740505',
  CU: '#8be8ff',
  KC: '#228be0',
  SL: '#1c24b5',
  ST: '#b810dd',
  CH: '#144117',
  FS: '#32c386'
};

const PITCH_CATEGORIES: Record<string, 'Fast' | 'Breaking' | 'Offspeed'> = {
  FF: 'Fast',
  FC: 'Fast',
  SI: 'Fast',
  CU: 'Breaking',
  KC: 'Breaking',
  SL: 'Breaking',
  ST: 'Breaking',
  CH: 'Offspeed',
  FS: 'Offspeed'
};

const CATEGORY_COLORS: Record<string, string> = {
  Fast: '#FF6384',
  Breaking: '#36A2EB',
  Offspeed: '#4BC0C0'
};

interface PitchChartProps {
  pitchSelection: number[];
  pitchTypes: string[];
  pitchTypeBonuses: Record<string, number>;
  pitchCategoryBonuses: Record<string, number>;
}

function PitchChart({ pitchSelection, pitchTypes, pitchCategoryBonuses, pitchTypeBonuses }: PitchChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  const labels = pitchTypes.map(type => PITCH_NAMES[type] || type);
  const colors = pitchTypes.map(type => PITCH_COLORS[type] || '#999999');

  const pitchBonuses = Object.entries(pitchTypeBonuses).map(([type, bonus]) => {
    const category = PITCH_CATEGORIES[type];
    const color = category ? CATEGORY_COLORS[category] : '#999';    
    return (
      <div key={type}>
        <span style={{ color }}>
          {PITCH_NAMES[type] || type}
        </span>
        : {(bonus * 100).toFixed(0)}%
      </div>
    );
  })

  const categoryBonuses = Object.entries(pitchCategoryBonuses).map(([category, bonus]) => {
    const color = category ? CATEGORY_COLORS[category] : '#999';
    return (
      <div key={category}>
        <span style={{ color }}>
          {category}
        </span>
        : {(bonus * 100).toFixed(0)}%
      </div>
    );
  })

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    chartRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: pitchSelection,
          backgroundColor: colors,
          borderWidth: 0.5,
        }]
      },
      options: {
        // maintainAspectRatio: true,
        // aspectRatio: 0.8,
        layout: {
          padding: 4,
        },
        plugins: {
          legend: {
            position: 'bottom',
            align: 'start',
            labels: {
              color: '#FFFFFF',
              font: {
                size: 16,
              },
              padding: 6,
              boxWidth: 24,  // default is 40
              boxHeight: 12, // default is fontSize
              useBorderRadius: false,
              // borderWidth: 0,
            }
          }
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [pitchSelection, pitchTypes]);

  return (
    <div className='pitch-chart'>
        <canvas ref={canvasRef} />
      <div className='pitch-bonuses'>
        <h3>Pitch Type Bonuses</h3>
        {pitchBonuses}
      </div>
      <div className='pitch-bonuses'>
        <h3>Pitch Category Bonuses</h3>
        {categoryBonuses}
      </div>
    </div>
  ) 
}

export default PitchChart;

// Fast
// FF: Fastball
// FC: Cutter
// SI: Sinker

// Breaking
// CU: Curveball
// KC: Knuckle Curve
// SL: Slider
// ST: Sweeper

// Offspeed
// CH: Changeup
// FS: Splitter

// PitchTypeBonuses [ 
//   FS: 0.05,
//   CU: 0.1
// ]