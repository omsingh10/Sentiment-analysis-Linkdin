import React, { useEffect, useRef } from 'react';
import * as Highcharts from 'highcharts';

interface TrendData {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
}

interface TrendChartProps {
  data?: TrendData[];
}

const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<Highcharts.Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Prepare data for Highcharts
    const categories = data.map(item => item.date);
    const positiveData = data.map(item => item.positive);
    const negativeData = data.map(item => item.negative);
    const neutralData = data.map(item => item.neutral);

    const options: Highcharts.Options = {
      chart: {
        type: 'line',
        height: 400,
        backgroundColor: 'transparent',
        style: {
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
        }
      },
      title: {
        text: 'Sentiment Trends Over Time',
        style: {
          fontSize: '18px',
          fontWeight: '600',
          color: '#323130'
        }
      },
      subtitle: {
        text: 'Daily sentiment distribution of LinkedIn posts',
        style: {
          color: '#605e5c'
        }
      },
      xAxis: {
        categories: categories,
        labels: {
          style: {
            color: '#605e5c'
          }
        },
        lineColor: '#edebe9',
        tickColor: '#edebe9'
      },
      yAxis: {
        title: {
          text: 'Number of Posts',
          style: {
            color: '#605e5c'
          }
        },
        labels: {
          style: {
            color: '#605e5c'
          }
        },
        gridLineColor: '#f3f2f1'
      },
      legend: {
        align: 'right',
        verticalAlign: 'top',
        layout: 'horizontal',
        itemStyle: {
          color: '#605e5c'
        }
      },
      plotOptions: {
        line: {
          marker: {
            enabled: true,
            radius: 4
          },
          lineWidth: 3
        }
      },
      series: [
        {
          type: 'line',
          name: 'Positive',
          data: positiveData,
          color: '#107c10',
          marker: {
            fillColor: '#107c10'
          }
        },
        {
          type: 'line',
          name: 'Negative',
          data: negativeData,
          color: '#d13438',
          marker: {
            fillColor: '#d13438'
          }
        },
        {
          type: 'line',
          name: 'Neutral',
          data: neutralData,
          color: '#8a8100',
          marker: {
            fillColor: '#8a8100'
          }
        }
      ],
      credits: {
        enabled: false
      },
      tooltip: {
        backgroundColor: '#ffffff',
        borderColor: '#edebe9',
        style: {
          color: '#323130'
        },
        formatter: function() {
          return `<b>${this.series.name}</b><br/>
                  Date: ${this.x}<br/>
                  Posts: ${this.y}`;
        }
      }
    };

    chartInstance.current = Highcharts.chart(chartRef.current, options);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="chart-container large">
      {!data ? (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '400px',
          color: '#605e5c'
        }}>
          Loading trend data...
        </div>
      ) : (
        <div ref={chartRef} />
      )}
    </div>
  );
};

export default TrendChart;