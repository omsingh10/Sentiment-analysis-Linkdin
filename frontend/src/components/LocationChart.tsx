import React, { useEffect, useRef } from 'react';
import * as Highcharts from 'highcharts';

interface LocationData {
  location: string;
  count: number;
  avgSentiment: number;
}

interface LocationChartProps {
  data?: LocationData[];
}

const LocationChart: React.FC<LocationChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<Highcharts.Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Take top 8 locations and prepare data for pie chart
    const topLocations = data.slice(0, 8);
    const chartData = topLocations.map(item => ({
      name: item.location,
      y: item.count,
      color: item.avgSentiment > 0.1 ? '#107c10' : 
             item.avgSentiment < -0.1 ? '#d13438' : '#8a8100'
    }));

    const options: Highcharts.Options = {
      chart: {
        type: 'pie',
        height: 300,
        backgroundColor: 'transparent',
        style: {
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
        }
      },
      title: {
        text: 'Top Locations',
        style: {
          fontSize: '18px',
          fontWeight: '600',
          color: '#323130'
        }
      },
      subtitle: {
        text: 'Posts by location',
        style: {
          color: '#605e5c'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f}%',
            style: {
              color: '#323130',
              fontSize: '11px'
            }
          },
          showInLegend: false,
          size: '80%'
        }
      },
      series: [{
        type: 'pie',
        name: 'Posts',
        data: chartData
      }],
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
          const point = this.point as any;
          const locationData = topLocations.find(l => l.location === point.name);
          const sentiment = locationData ? locationData.avgSentiment : 0;
          const sentimentText = sentiment > 0.1 ? 'Positive' : 
                               sentiment < -0.1 ? 'Negative' : 'Neutral';
          
          return `<b>${point.name}</b><br/>
                  Posts: ${point.y} (${point.percentage.toFixed(1)}%)<br/>
                  Avg Sentiment: ${sentimentText} (${sentiment.toFixed(2)})`;
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
    <div className="chart-container">
      {!data ? (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '300px',
          color: '#605e5c'
        }}>
          Loading location data...
        </div>
      ) : (
        <div ref={chartRef} />
      )}
    </div>
  );
};

export default LocationChart;