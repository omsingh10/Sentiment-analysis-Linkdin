import React from "react";

export function Navigation() {
  return (
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
  );
}

export default Navigation;
