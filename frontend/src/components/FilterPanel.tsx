import React, { useState, useEffect } from 'react';

interface FilterOptions {
  companies: string[];
  positions: string[];
  locations: string[];
  years: number[];
}

interface Filters {
  company: string;
  position: string;
  year: string;
  location: string;
}

interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/filters');
        const data = await response.json();
        setFilterOptions(data);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const resetFilters: Filters = {
      company: 'all',
      position: 'all',
      year: 'all',
      location: 'all'
    };
    onFilterChange(resetFilters);
  };

  if (!filterOptions) {
    return (
      <div className="filter-panel">
        <h3>Filters</h3>
        <p>Loading filter options...</p>
      </div>
    );
  }

  return (
    <div className="filter-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>Filters</h3>
        <button 
          onClick={resetFilters}
          style={{
            padding: '6px 12px',
            border: '1px solid #c8c6c4',
            borderRadius: '4px',
            backgroundColor: '#ffffff',
            color: '#323130',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>

      <div className="filter-group">
        <label htmlFor="company-filter">Company</label>
        <select
          id="company-filter"
          value={filters.company}
          onChange={(e) => handleFilterChange('company', e.target.value)}
        >
          <option value="all">All Companies</option>
          {filterOptions.companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="position-filter">Position</label>
        <select
          id="position-filter"
          value={filters.position}
          onChange={(e) => handleFilterChange('position', e.target.value)}
        >
          <option value="all">All Positions</option>
          {filterOptions.positions.map((position) => (
            <option key={position} value={position}>
              {position}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="year-filter">Year</label>
        <select
          id="year-filter"
          value={filters.year}
          onChange={(e) => handleFilterChange('year', e.target.value)}
        >
          <option value="all">All Years</option>
          {filterOptions.years.map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="location-filter">Location</label>
        <select
          id="location-filter"
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
        >
          <option value="all">All Locations</option>
          {filterOptions.locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div style={{ 
        marginTop: '24px', 
        padding: '16px', 
        backgroundColor: '#f8f6f4', 
        borderRadius: '6px',
        border: '1px solid #edebe9'
      }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#323130' }}>Active Filters</h4>
        <div style={{ fontSize: '12px', color: '#605e5c' }}>
          {filters.company !== 'all' && <div>Company: {filters.company}</div>}
          {filters.position !== 'all' && <div>Position: {filters.position}</div>}
          {filters.year !== 'all' && <div>Year: {filters.year}</div>}
          {filters.location !== 'all' && <div>Location: {filters.location}</div>}
          {Object.values(filters).every(f => f === 'all') && <div>No filters applied</div>}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;