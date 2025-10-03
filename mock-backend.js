const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// LinkedIn Professional Data
const companies = [
  'Microsoft', 'Google', 'Amazon', 'Apple', 'Meta', 'Tesla', 'Netflix', 'Adobe', 
  'Salesforce', 'Oracle', 'IBM', 'Intel', 'NVIDIA', 'Uber', 'Airbnb', 'LinkedIn',
  'Twitter', 'Spotify', 'Zoom', 'Slack', 'Dropbox', 'PayPal', 'Square', 'Stripe'
];

const positions = [
  'Software Engineer', 'Senior Software Engineer', 'Project Manager', 'Product Manager',
  'Data Scientist', 'ML Engineer', 'DevOps Engineer', 'Engineering Manager', 
  'VP Engineering', 'CTO', 'CEO', 'Head of Product', 'UX Designer', 'UI Designer',
  'Marketing Manager', 'Sales Manager', 'HR Manager', 'Business Analyst', 'Consultant',
  'Solution Architect', 'Technical Lead', 'Scrum Master', 'QA Engineer', 'Security Engineer'
];

const locations = [
  'San Francisco, CA', 'Seattle, WA', 'New York, NY', 'Austin, TX', 'Boston, MA',
  'Los Angeles, CA', 'Chicago, IL', 'Denver, CO', 'Atlanta, GA', 'Miami, FL',
  'London, UK', 'Berlin, Germany', 'Paris, France', 'Amsterdam, Netherlands',
  'Toronto, Canada', 'Sydney, Australia', 'Tokyo, Japan', 'Singapore', 'Bangalore, India'
];

const linkedinPostTemplates = {
  positive: [
    "Thrilled to announce our team's incredible achievement in {keyword}! Amazing collaboration and innovation. 🚀",
    "Just shipped a game-changing {keyword} feature! Proud of what we've built together. 💪",
    "Excited to share our success story with {keyword}. The future looks bright! ✨",
    "Celebrating a major milestone in {keyword} development. Grateful for this amazing team! 🎉",
    "Love working on cutting-edge {keyword} technology. Every day brings new possibilities! ❤️",
    "Our {keyword} project exceeded all expectations! Innovation at its finest. 🌟"
  ],
  negative: [
    "Facing some challenges with {keyword} implementation. Learning from setbacks. 😔",
    "The {keyword} rollout didn't go as planned. Time to regroup and improve. 😞",
    "Struggling with {keyword} adoption. Need to reassess our approach. 👎",
    "Disappointed with the {keyword} results this quarter. Back to the drawing board. 😕",
    "The {keyword} project hit some roadblocks. Lessons learned for next time. 😤",
    "Not satisfied with our {keyword} performance. Room for improvement. 📉"
  ],
  neutral: [
    "Working on {keyword} integration. Standard development process ongoing. 🔧",
    "Our {keyword} team is progressing steadily. Regular updates to follow. 📊",
    "Implementing {keyword} solutions as planned. Meeting project milestones. ⚙️",
    "The {keyword} initiative is moving forward. Standard business operations. 📋",
    "Continuing work on {keyword} optimization. Routine maintenance and updates. 🔄",
    "Regular {keyword} development cycle in progress. Following established procedures. 📝"
  ]
};

// Sample LinkedIn posts with professional data
const sampleLinkedInPosts = [
  {
    id: "1001",
    createdAt: new Date().toISOString(),
    originalText: "I absolutely love this new technology! It's amazing and works perfectly! 🚀",
    text: "I absolutely love this new technology! Its amazing and works perfectly!",
    userName: "TechEnthusiast",
    screenName: "techenthusiast",
    profileImageUrl: "https://via.placeholder.com/50x50/4CAF50/white?text=TE",
    sentimentType: 4 // Very Positive
  },
  {
    id: "1002",
    createdAt: new Date(Date.now() - 1000 * 60).toISOString(),
    originalText: "This is pretty good, I like the new features they added recently.",
    text: "This is pretty good, I like the new features they added recently.",
    userName: "CodeReviewer",
    screenName: "codereviewer",
    profileImageUrl: "https://via.placeholder.com/50x50/2196F3/white?text=CR",
    sentimentType: 3 // Positive
  },
  {
    id: "1003",
    createdAt: new Date(Date.now() - 2000 * 60).toISOString(),
    originalText: "It's okay, nothing special but does the job I guess.",
    text: "Its okay, nothing special but does the job I guess.",
    userName: "NeutralUser",
    screenName: "neutraluser",
    profileImageUrl: "https://via.placeholder.com/50x50/9E9E9E/white?text=NU",
    sentimentType: 2 // Neutral
  },
  {
    id: "1004",
    createdAt: new Date(Date.now() - 3000 * 60).toISOString(),
    originalText: "Not impressed with this at all. Expected much better quality.",
    text: "Not impressed with this at all. Expected much better quality.",
    userName: "CriticalUser",
    screenName: "criticaluser",
    profileImageUrl: "https://via.placeholder.com/50x50/FF9800/white?text=CU",
    sentimentType: 1 // Negative
  },
  {
    id: "1005",
    createdAt: new Date(Date.now() - 4000 * 60).toISOString(),
    originalText: "This is absolutely terrible! Worst experience ever! Complete waste of time! 😡",
    text: "This is absolutely terrible! Worst experience ever! Complete waste of time!",
    userName: "AngryCustomer",
    screenName: "angrycustomer",
    profileImageUrl: "https://via.placeholder.com/50x50/F44336/white?text=AC",
    sentimentType: 0 // Very Negative
  }
];

// Generate LinkedIn posts with professional data
function generateLinkedInPosts(keyword, count = 10) {
  const sentiments = ['positive', 'negative', 'neutral'];
  const posts = [];
  
  for (let i = 0; i < count; i++) {
    const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
    const templates = linkedinPostTemplates[sentiment];
    const text = templates[Math.floor(Math.random() * templates.length)].replace('{keyword}', keyword);
    
    const company = companies[Math.floor(Math.random() * companies.length)];
    const position = positions[Math.floor(Math.random() * positions.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    
    // Generate realistic names
    const firstNames = ['John', 'Sarah', 'Michael', 'Emily', 'David', 'Lisa', 'Robert', 'Jennifer', 'William', 'Jessica'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `${firstName} ${lastName}`;
    
    let sentimentType;
    if (sentiment === 'positive') {
      sentimentType = Math.random() > 0.5 ? 4 : 3; // Very positive or positive
    } else if (sentiment === 'negative') {
      sentimentType = Math.random() > 0.5 ? 0 : 1; // Very negative or negative
    } else {
      sentimentType = 2; // Neutral
    }

    // Generate realistic engagement numbers
    const likes = Math.floor(Math.random() * 500) + 10;
    const comments = Math.floor(Math.random() * 50) + 1;
    const shares = Math.floor(Math.random() * 20) + 1;
    
    // Generate dates from the last 3 years
    const baseDate = new Date();
    const daysBack = Math.floor(Math.random() * 1095); // 3 years
    const postDate = new Date(baseDate.getTime() - (daysBack * 24 * 60 * 60 * 1000));

    // Create sentiment object with proper structure
    const sentimentScore = parseFloat((sentimentType / 4).toFixed(2));
    const sentimentTypeMap = {
      0: 'negative',  // Very negative
      1: 'negative',  // Negative
      2: 'neutral',   // Neutral
      3: 'positive',  // Positive
      4: 'positive'   // Very positive
    };

    posts.push({
      id: `post_${1000 + i}`,
      createdAt: postDate.toISOString(),
      originalText: text,
      text: text.replace(/[🚀💪✨🎉❤️🌟😔😞👎😕😤📉🔧📊⚙️📋🔄📝]/g, ''), // Clean version
      content: text, // Dashboard expects 'content' field
      
      // Author information
      authorName: fullName,
      authorPosition: position,
      authorCompany: company,
      authorLocation: location,
      profileImageUrl: `https://via.placeholder.com/60x60/0077B5/white?text=${firstName[0]}${lastName[0]}`,
      
      // Engagement metrics
      likes: likes,
      comments: comments,
      shares: shares,
      views: Math.floor(Math.random() * 2000) + 100, // Add views for dashboard
      
      // Sentiment analysis with proper structure
      sentiment: {
        type: sentimentTypeMap[sentimentType],
        score: sentimentScore
      },
      
      // Additional metadata
      hashtags: extractHashtags(text),
      year: postDate.getFullYear(),
      month: postDate.getMonth() + 1
    });
  }
  
  return posts;
}

// Helper function to extract hashtags
function extractHashtags(text) {
  const hashtagRegex = /#[a-zA-Z0-9_]+/g;
  return text.match(hashtagRegex) || [];
}

// Generate dashboard analytics data
function generateDashboardData(posts) {
  const analytics = {
    totalPosts: posts.length,
    sentimentDistribution: {
      positive: posts.filter(p => p.sentiment && p.sentiment.type === 'positive').length,
      negative: posts.filter(p => p.sentiment && p.sentiment.type === 'negative').length,
      neutral: posts.filter(p => p.sentiment && p.sentiment.type === 'neutral').length
    },
    posts: posts,
    topCompanies: getTopCompanies(posts),
    topLocations: getTopLocations(posts)
  };
  
  return analytics;
}

// Helper function to get top companies
function getTopCompanies(posts) {
  const companies = {};
  posts.forEach(post => {
    if (!companies[post.authorCompany]) {
      companies[post.authorCompany] = { company: post.authorCompany, count: 0, avgSentiment: 0 };
    }
    companies[post.authorCompany].count++;
    companies[post.authorCompany].avgSentiment += (post.sentiment && post.sentiment.score) ? post.sentiment.score : 0;
  });
  
  return Object.values(companies)
    .map(comp => ({
      ...comp,
      avgSentiment: comp.avgSentiment / comp.count
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

// Helper function to get top locations
function getTopLocations(posts) {
  const locations = {};
  posts.forEach(post => {
    if (!locations[post.authorLocation]) {
      locations[post.authorLocation] = { location: post.authorLocation, count: 0, avgSentiment: 0 };
    }
    locations[post.authorLocation].count++;
    locations[post.authorLocation].avgSentiment += (post.sentiment && post.sentiment.score) ? post.sentiment.score : 0;
  });
  
  return Object.values(locations)
    .map(loc => ({
      ...loc,
      avgSentiment: loc.avgSentiment / loc.count
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

// Helper functions for analytics
function getTopItems(posts, field, limit = 10) {
  const counts = {};
  posts.forEach(post => {
    counts[post[field]] = (counts[post[field]] || 0) + 1;
  });
  
  return Object.entries(counts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

function getSentimentByCategory(posts, category) {
  const result = {};
  posts.forEach(post => {
    const key = post[category];
    if (!result[key]) {
      result[key] = { veryPositive: 0, positive: 0, neutral: 0, negative: 0, veryNegative: 0 };
    }
    
    switch(post.sentimentType) {
      case 4: result[key].veryPositive++; break;
      case 3: result[key].positive++; break;
      case 2: result[key].neutral++; break;
      case 1: result[key].negative++; break;
      case 0: result[key].veryNegative++; break;
    }
  });
  
  return result;
}

function getSentimentTrends(posts) {
  const trends = {};
  posts.forEach(post => {
    const monthKey = `${post.year}-${post.month.toString().padStart(2, '0')}`;
    if (!trends[monthKey]) {
      trends[monthKey] = { veryPositive: 0, positive: 0, neutral: 0, negative: 0, veryNegative: 0 };
    }
    
    switch(post.sentimentType) {
      case 4: trends[monthKey].veryPositive++; break;
      case 3: trends[monthKey].positive++; break;
      case 2: trends[monthKey].neutral++; break;
      case 1: trends[monthKey].negative++; break;
      case 0: trends[monthKey].veryNegative++; break;
    }
  });
  
  return Object.keys(trends).sort().map(month => ({
    month,
    ...trends[month]
  }));
}

function getPostsByYear(posts) {
  const years = {};
  posts.forEach(post => {
    years[post.year] = (years[post.year] || 0) + 1;
  });
  
  return Object.entries(years).map(([year, count]) => ({ year: parseInt(year), count }));
}

// LinkedIn posts search endpoint
app.get('/api/linkedin/posts/:keyword/:count', (req, res) => {
  const { keyword, count } = req.params;
  const postCount = parseInt(count) || 100;
  
  console.log(`LinkedIn posts search for keyword: ${keyword}, count: ${postCount}`);
  
  const posts = generateLinkedInPosts(keyword, Math.min(postCount, 200));
  const analytics = generateDashboardData(posts);
  
  res.json({
    posts: posts,
    analytics: analytics,
    keyword: keyword,
    totalCount: posts.length
  });
});

// Dashboard analytics endpoint with dynamic data
app.get('/api/dashboard/analytics', (req, res) => {
  const { company, position, year, location } = req.query;
  
  console.log(`Dashboard analytics request - filters:`, { company, position, year, location });
  
  // Generate a large dataset for comprehensive analytics with some randomization
  let allPosts = [];
  const keywords = ['Innovation', 'Technology', 'Leadership', 'Growth', 'Success', 'Teamwork'];
  
  // Add some randomness to make data dynamic - vary the count slightly
  const baseCount = 50;
  const variation = Math.floor(Math.random() * 10) - 5; // -5 to +5
  
  keywords.forEach(keyword => {
    const dynamicCount = Math.max(45, baseCount + variation);
    const posts = generateLinkedInPosts(keyword, dynamicCount);
    allPosts = allPosts.concat(posts);
  });
  
  // Occasionally add some new "live" posts with recent timestamps
  if (Math.random() > 0.7) { // 30% chance
    const livePostCount = Math.floor(Math.random() * 3) + 1; // 1-3 new posts
    const liveKeyword = keywords[Math.floor(Math.random() * keywords.length)];
    const livePosts = generateLinkedInPosts(liveKeyword, livePostCount).map(post => ({
      ...post,
      createdAt: new Date(Date.now() - Math.random() * 300000).toISOString(), // Last 5 minutes
      id: `live_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }));
    allPosts = [...livePosts, ...allPosts];
  }
  
  // Apply filters
  let filteredPosts = allPosts;
  
  if (company && company !== 'all') {
    filteredPosts = filteredPosts.filter(post => post.authorCompany === company);
  }
  
  if (position && position !== 'all') {
    filteredPosts = filteredPosts.filter(post => post.authorPosition === position);
  }
  
  if (year && year !== 'all') {
    filteredPosts = filteredPosts.filter(post => post.year === parseInt(year));
  }
  
  if (location && location !== 'all') {
    filteredPosts = filteredPosts.filter(post => post.authorLocation === location);
  }
  
  // Sort by creation date (newest first)
  filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  const analytics = generateDashboardData(filteredPosts);
  
  res.json({
    posts: filteredPosts.slice(0, 50), // Return latest 50 posts
    analytics: analytics,
    filters: { company, position, year, location },
    totalCount: filteredPosts.length,
    timestamp: new Date().toISOString()
  });
});

// Get filter options
app.get('/api/filters', (req, res) => {
  res.json({
    companies: companies,
    positions: positions,
    locations: locations,
    years: [2022, 2023, 2024, 2025]
  });
});

// Stream endpoint for real-time updates
app.get('/api/linkedin/stream/:keyword', (req, res) => {
  const { keyword } = req.params;
  
  console.log(`LinkedIn stream for keyword: ${keyword}`);
  
  // Set headers for Server-Sent Events
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Send periodic posts
  const interval = setInterval(() => {
    const posts = generateLinkedInPosts(keyword, 1);
    const post = posts[0];
    
    // Update timestamp to current time
    post.createdAt = new Date().toISOString();
    post.id = `post_${Date.now()}`;
    
    res.write(`data: ${JSON.stringify(post)}\n\n`);
  }, 5000); // Send a new post every 5 seconds
  
  // Handle client disconnect
  req.on('close', () => {
    console.log('Client disconnected from LinkedIn stream');
    clearInterval(interval);
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Mock sentiment analysis backend is running!' });
});

// Default endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Mock Twitter Sentiment Analysis Backend',
    endpoints: {
      search: '/search/{keyword}/{count}',
      stream: '/stream/{keyword}',
      health: '/health'
    }
  });
});

app.listen(port, () => {
  console.log(`🚀 LinkedIn Analytics Backend running at http://localhost:${port}`);
  console.log(`📊 LinkedIn API Endpoints available:`);
  console.log(`   • Dashboard Analytics: http://localhost:${port}/api/dashboard/analytics`);
  console.log(`   • Filter Options: http://localhost:${port}/api/filters`);
  console.log(`   • LinkedIn Posts: http://localhost:${port}/api/linkedin/posts/{keyword}/{count}`);
  console.log(`   • LinkedIn Stream: http://localhost:${port}/api/linkedin/stream/{keyword}`);
  console.log(`   • Health Check: http://localhost:${port}/health`);
});