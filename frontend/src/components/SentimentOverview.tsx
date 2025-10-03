import React from 'react';

interface SentimentDistribution {
  positive: number;
  negative: number;
  neutral: number;
}

interface SentimentOverviewProps {
  data?: SentimentDistribution;
  totalPosts?: number;
}

const SentimentOverview: React.FC<SentimentOverviewProps> = ({ data, totalPosts = 0 }) => {
  if (!data) {
    return (
      <div className="overview-cards">
        <div className="overview-card">
          <h3>--</h3>
          <p>Total Posts</p>
        </div>
        <div className="overview-card positive">
          <h3>--</h3>
          <p>Positive</p>
        </div>
        <div className="overview-card negative">
          <h3>--</h3>
          <p>Negative</p>
        </div>
        <div className="overview-card neutral">
          <h3>--</h3>
          <p>Neutral</p>
        </div>
      </div>
    );
  }

  const positivePercentage = totalPosts > 0 ? Math.round((data.positive / totalPosts) * 100) : 0;
  const negativePercentage = totalPosts > 0 ? Math.round((data.negative / totalPosts) * 100) : 0;
  const neutralPercentage = totalPosts > 0 ? Math.round((data.neutral / totalPosts) * 100) : 0;

  return (
    <div className="overview-cards">
      <div className="overview-card">
        <h3>{totalPosts.toLocaleString()}</h3>
        <p>Total Posts</p>
        <div style={{ 
          marginTop: '12px', 
          fontSize: '12px', 
          color: '#605e5c',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span style={{ color: '#107c10' }}>+{positivePercentage}%</span>
          <span style={{ color: '#d13438' }}>-{negativePercentage}%</span>
          <span style={{ color: '#8a8100' }}>~{neutralPercentage}%</span>
        </div>
      </div>
      
      <div className="overview-card positive">
        <h3>{data.positive.toLocaleString()}</h3>
        <p>Positive ({positivePercentage}%)</p>
        <div style={{ 
          marginTop: '12px',
          height: '4px',
          backgroundColor: '#f3f2f1',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${positivePercentage}%`,
            backgroundColor: '#107c10',
            borderRadius: '2px'
          }} />
        </div>
      </div>
      
      <div className="overview-card negative">
        <h3>{data.negative.toLocaleString()}</h3>
        <p>Negative ({negativePercentage}%)</p>
        <div style={{ 
          marginTop: '12px',
          height: '4px',
          backgroundColor: '#f3f2f1',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${negativePercentage}%`,
            backgroundColor: '#d13438',
            borderRadius: '2px'
          }} />
        </div>
      </div>
      
      <div className="overview-card neutral">
        <h3>{data.neutral.toLocaleString()}</h3>
        <p>Neutral ({neutralPercentage}%)</p>
        <div style={{ 
          marginTop: '12px',
          height: '4px',
          backgroundColor: '#f3f2f1',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${neutralPercentage}%`,
            backgroundColor: '#8a8100',
            borderRadius: '2px'
          }} />
        </div>
      </div>
    </div>
  );
};

export default SentimentOverview;