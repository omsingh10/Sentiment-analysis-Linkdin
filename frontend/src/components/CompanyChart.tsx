import React, { useEffect, useRef } from 'react';
import * as Highcharts from 'highcharts';

interface CompanyData {
  company: string;
  count: number;
  avgSentiment: number;
}

interface CompanyChartProps {
  data?: CompanyData[];
}

const CompanyChart: React.FC<CompanyChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<Highcharts.Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Take top 10 companies and prepare data
    const topCompanies = data.slice(0, 10);
    const chartData = topCompanies.map(item => ({
      name: item.company,
      y: item.count,
      color: item.avgSentiment > 0.1 ? '#107c10' : 
             item.avgSentiment < -0.1 ? '#d13438' : '#8a8100'
    }));

    const options: Highcharts.Options = {
      chart: {
        type: 'column',
        height: 300,
        backgroundColor: 'transparent',
        style: {
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
        }
      },
      title: {
        text: 'Top Companies',
        style: {
          fontSize: '18px',
          fontWeight: '600',
          color: '#323130'
        }
      },
      subtitle: {
        text: 'Posts by company',
        style: {
          color: '#605e5c'
        }
      },
      xAxis: {
        type: 'category',
        labels: {
          rotation: -45,
          style: {
            color: '#605e5c',
            fontSize: '11px'
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
        enabled: false
      },
      plotOptions: {
        column: {
          borderRadius: 3,
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            style: {
              color: '#323130',
              fontSize: '10px',
              fontWeight: '600'
            }
          }
        }
      },
      series: [{
        type: 'column',
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
          const companyData = topCompanies.find(c => c.company === point.name);
          const sentiment = companyData ? companyData.avgSentiment : 0;
          const sentimentText = sentiment > 0.1 ? 'Positive' : 
                               sentiment < -0.1 ? 'Negative' : 'Neutral';
          
          return `<b>${point.name}</b><br/>
                  Posts: ${point.y}<br/>
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
          Loading company data...
        </div>
      ) : (
        <div ref={chartRef} />
      )}
    </div>
  );
};

export default CompanyChart;