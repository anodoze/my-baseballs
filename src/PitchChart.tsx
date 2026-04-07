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
  FF: '#FFB000',
  FC: '#FFDA8A',
  SI: '#FE6100',
  KC: '#B8CCFF',
  CU: '#648FFF',
  ST: '#0048FF',
  SL: '#785EF0',
  CH: '#EF9AC3',
  FS: '#DC267F'
};

// const PITCH_CATEGORIES: Record<string, 'Fast' | 'Breaking' | 'Offspeed'> = {
//   FF: 'Fast',
//   FC: 'Fast',
//   SI: 'Fast',
//   CU: 'Breaking',
//   KC: 'Breaking',
//   SL: 'Breaking',
//   ST: 'Breaking',
//   CH: 'Offspeed',
//   FS: 'Offspeed'
// };

// const CATEGORY_COLORS: Record<string, string> = {
//   Fast: '#FFB000',
//   Breaking: '#648FFF',
//   Offspeed: '#DC267F'
// };

interface PitchChartProps {
  pitchSelection: number[] | null;
  pitchTypes: string[] | null;
}

function PitchChart({ pitchSelection, pitchTypes, }: PitchChartProps) {
  if (!pitchSelection || !pitchTypes) return
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  const labels = pitchTypes?.map(type => PITCH_NAMES[type] || type);
  const colors = pitchTypes?.map(type => PITCH_COLORS[type] || '#999999');

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
          borderWidth: 2,
          borderColor: '#000'
        }]
      },
      options: {
        // maintainAspectRatio: true,
        aspectRatio: .55,
        layout: {
          padding: 4,
        },
        plugins: {
          legend: {
            position: 'bottom',
            align: 'start',
            labels: {
              color: '#fff',
              font: {
                size: 15,
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
    </div>
  ) 
}

export default PitchChart;