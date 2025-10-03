import React, { useState, useEffect } from 'react';
import './App.css';

interface DashboardData {
  totalPosts: number;
  sentimentDistribution: {
    positive: number;
    negative: number;
    neutral: number;
  };
  posts: any[];
}

const App: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/dashboard/analytics');
      const data = await response.json();
      
      setDashboardData(data.analytics);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <nav style={{
          backgroundColor: '#0078d4',
          color: '#ffffff',
          padding: '12px 24px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#ffffff',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#0078d4'
            }}>
              💼
            </div>
            <div>
              <h1 style={{ 
                margin: 0, 
                fontSize: '20px', 
                fontWeight: '600',
                color: '#ffffff'
              }}>
                LinkedIn Sentiment Analytics
              </h1>
              <p style={{ 
                margin: 0, 
                fontSize: '14px', 
                opacity: 0.9,
                color: '#ffffff'
              }}>
                Professional Social Media Intelligence Dashboard
              </p>
            </div>
          </div>
        </nav>
        
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading LinkedIn Analytics Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <nav style={{
        backgroundColor: '#0078d4',
        color: '#ffffff',
        padding: '12px 24px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#ffffff',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#0078d4'
          }}>
            💼
          </div>
          <div>
            <h1 style={{ 
              margin: 0, 
              fontSize: '20px', 
              fontWeight: '600',
              color: '#ffffff'
            }}>
              LinkedIn Sentiment Analytics
            </h1>
            <p style={{ 
              margin: 0, 
              fontSize: '14px', 
              opacity: 0.9,
              color: '#ffffff'
            }}>
              Professional Social Media Intelligence Dashboard
            </p>
          </div>
        </div>
        
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            padding: '6px 12px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            fontSize: '12px',
            fontWeight: '500'
          }}>
            🟢 Live Data
          </div>
          <div style={{
            fontSize: '12px',
            opacity: 0.8
          }}>
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </nav>
      
      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '600', color: '#323130', margin: '0 0 8px 0' }}>
            LinkedIn Sentiment Analytics
          </h1>
          <p style={{ color: '#605e5c', margin: 0, fontSize: '16px' }}>
            Real-time insights from professional posts
          </p>
        </div>
        
        {dashboardData && (
          <>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '24px',
              marginBottom: '32px'
            }}>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                border: '1px solid #edebe9',
                textAlign: 'center'
              }}>
                <h3 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 8px 0', color: '#323130' }}>
                  {dashboardData.totalPosts.toLocaleString()}
                </h3>
                <p style={{ color: '#605e5c', margin: 0, fontSize: '14px', fontWeight: '500' }}>
                  Total Posts
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                border: '1px solid #edebe9',
                textAlign: 'center'
              }}>
                <h3 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 8px 0', color: '#107c10' }}>
                  {dashboardData.sentimentDistribution.positive.toLocaleString()}
                </h3>
                <p style={{ color: '#605e5c', margin: 0, fontSize: '14px', fontWeight: '500' }}>
                  Positive Posts
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                border: '1px solid #edebe9',
                textAlign: 'center'
              }}>
                <h3 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 8px 0', color: '#d13438' }}>
                  {dashboardData.sentimentDistribution.negative.toLocaleString()}
                </h3>
                <p style={{ color: '#605e5c', margin: 0, fontSize: '14px', fontWeight: '500' }}>
                  Negative Posts
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                border: '1px solid #edebe9',
                textAlign: 'center'
              }}>
                <h3 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 8px 0', color: '#8a8100' }}>
                  {dashboardData.sentimentDistribution.neutral.toLocaleString()}
                </h3>
                <p style={{ color: '#605e5c', margin: 0, fontSize: '14px', fontWeight: '500' }}>
                  Neutral Posts
                </p>
              </div>
            </div>
            
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              border: '1px solid #edebe9'
            }}>
              <h3 style={{ marginBottom: '24px', color: '#323130', fontSize: '20px', fontWeight: '600' }}>
                Recent LinkedIn Posts ({dashboardData.posts.length})
              </h3>
              
              <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {dashboardData.posts.slice(0, 10).map((post: any) => (
                  <div key={post.id} style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    padding: '20px',
                    marginBottom: '16px',
                    border: '1px solid #edebe9',
                    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '12px'
                    }}>
                      <div>
                        <div style={{ fontWeight: '600', color: '#323130', fontSize: '16px', marginBottom: '4px' }}>
                          {post.authorName}
                        </div>
                        <div style={{ color: '#605e5c', fontSize: '14px', marginBottom: '2px' }}>
                          {post.authorPosition}
                        </div>
                        <div style={{ color: '#0078d4', fontSize: '14px', fontWeight: '500' }}>
                          {post.authorCompany}
                        </div>
                        <div style={{ 
                          color: '#8a8886', 
                          fontSize: '12px', 
                          marginTop: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <span>📍 {post.authorLocation}</span>
                          <span>•</span>
                          <span>{post.year}</span>
                        </div>
                      </div>
                      
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: '#8a8886', fontSize: '12px' }}>
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                        <div style={{ marginTop: '8px' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            backgroundColor: post.sentiment.type === 'positive' ? '#dff6dd' : 
                                           post.sentiment.type === 'negative' ? '#fde7e9' : '#fff4ce',
                            color: post.sentiment.type === 'positive' ? '#107c10' : 
                                   post.sentiment.type === 'negative' ? '#d13438' : '#8a8100',
                            border: `1px solid ${post.sentiment.type === 'positive' ? '#b4db4d' : 
                                                 post.sentiment.type === 'negative' ? '#f1707b' : '#ffb900'}`
                          }}>
                            {post.sentiment.type === 'positive' ? '😊' : 
                             post.sentiment.type === 'negative' ? '😟' : '😐'} {post.sentiment.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{
                      margin: '16px 0',
                      lineHeight: 1.6,
                      color: '#323130',
                      fontSize: '15px'
                    }}>
                      {post.content}
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '16px',
                      borderTop: '1px solid #f3f2f1'
                    }}>
                      <div style={{
                        display: 'flex',
                        gap: '20px',
                        color: '#8a8886',
                        fontSize: '14px'
                      }}>
                        <span>👍 {post.likes} likes</span>
                        <span>💬 {post.comments} comments</span>
                        <span>🔄 {post.shares} shares</span>
                        <span>👁️ {post.views} views</span>
                      </div>
                      
                      <div style={{ 
                        fontSize: '12px', 
                        color: '#8a8886'
                      }}>
                        Score: {post.sentiment.score.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;