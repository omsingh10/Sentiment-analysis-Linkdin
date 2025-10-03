import React from 'react';

interface LinkedInPost {
  id: string;
  content: string;
  authorName: string;
  authorPosition: string;
  authorCompany: string;
  authorLocation: string;
  createdAt: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  sentiment: {
    type: 'positive' | 'negative' | 'neutral';
    score: number;
  };
  year: number;
}

interface PostListProps {
  posts?: LinkedInPost[];
}

const PostList: React.FC<PostListProps> = ({ posts = [] }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getSentimentIcon = (sentiment: LinkedInPost['sentiment']) => {
    switch (sentiment.type) {
      case 'positive':
        return '😊';
      case 'negative':
        return '😟';
      default:
        return '😐';
    }
  };

  if (posts.length === 0) {
    return (
      <div className="posts-section">
        <h3>Recent LinkedIn Posts</h3>
        <div style={{ 
          textAlign: 'center', 
          padding: '40px',
          color: '#605e5c'
        }}>
          No posts available with current filters
        </div>
      </div>
    );
  }

  return (
    <div className="posts-section">
      <h3 style={{ marginBottom: '24px', color: '#323130', fontSize: '20px', fontWeight: '600' }}>
        Recent LinkedIn Posts ({posts.length})
      </h3>
      
      <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
        {posts.slice(0, 20).map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <div className="post-author">
                <div className="author-name">{post.authorName}</div>
                <div className="author-position">{post.authorPosition}</div>
                <div className="author-company">{post.authorCompany}</div>
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
                <div className="post-date">{formatDate(post.createdAt)}</div>
                <div style={{ marginTop: '8px' }}>
                  <span 
                    className={`sentiment-badge ${post.sentiment.type}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    {getSentimentIcon(post.sentiment)}
                    {post.sentiment.type}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="post-content">
              {post.content}
            </div>
            
            <div className="post-stats">
              <div className="engagement-stats">
                <span>👍 {formatNumber(post.likes)} likes</span>
                <span>💬 {formatNumber(post.comments)} comments</span>
                <span>🔄 {formatNumber(post.shares)} shares</span>
                <span>👁️ {formatNumber(post.views)} views</span>
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: '#8a8886',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>Sentiment Score: {post.sentiment.score.toFixed(2)}</span>
                <div style={{
                  width: '40px',
                  height: '4px',
                  backgroundColor: '#f3f2f1',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.abs(post.sentiment.score) * 100}%`,
                    backgroundColor: post.sentiment.type === 'positive' ? '#107c10' : 
                                   post.sentiment.type === 'negative' ? '#d13438' : '#8a8100',
                    borderRadius: '2px'
                  }} />
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {posts.length > 20 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            color: '#605e5c',
            fontSize: '14px'
          }}>
            Showing first 20 posts of {posts.length} total
          </div>
        )}
      </div>
    </div>
  );
};

export default PostList;