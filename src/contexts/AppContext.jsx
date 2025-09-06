import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    country: '',
    course: '',
    tuitionRange: '',
    ranking: '',
    degreeLevel: '',
    scholarshipType: ''
  });

  const updateFilter = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      country: '',
      course: '',
      tuitionRange: '',
      ranking: '',
      degreeLevel: '',
      scholarshipType: ''
    });
    setSearchQuery('');
  };

  const value = {
    searchQuery,
    setSearchQuery,
    selectedFilters,
    updateFilter,
    clearFilters
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};