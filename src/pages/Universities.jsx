import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, SortAsc } from 'lucide-react';
import SearchBar from '../components/UI/SearchBar';
import FilterDropdown from '../components/UI/FilterDropdown';
import UniversityCard from '../components/Cards/UniversityCard';
import UniversityApplicationForm from '../components/Forms/UniversityApplicationForm';
import Modal from '../components/UI/Modal';
import { CardSkeleton } from '../components/UI/LoadingSkeleton';
import { useApp } from '../contexts/AppContext';

// Import data
import universitiesData from '../data/universities.json';
import countriesData from '../data/countries.json';

const Universities = () => {
  const { country } = useParams();
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationUniversity, setApplicationUniversity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('ranking');
  const { searchQuery, selectedFilters, updateFilter, clearFilters } = useApp();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Update country filter when URL changes
    if (country && country !== selectedFilters.country) {
      updateFilter('country', country);
    }
  }, [country, selectedFilters.country, updateFilter]);

  const filterOptions = {
    countries: countriesData.map(c => ({ value: c.id, label: c.name })),
    courses: [
      { value: 'engineering', label: 'Engineering' },
      { value: 'business', label: 'Business' },
      { value: 'medicine', label: 'Medicine' },
      { value: 'arts', label: 'Arts & Humanities' },
      { value: 'it', label: 'Information Technology' }
    ],
    tuitionRanges: [
      { value: '0-20000', label: 'Under $20,000' },
      { value: '20000-40000', label: '$20,000 - $40,000' },
      { value: '40000-60000', label: '$40,000 - $60,000' },
      { value: '60000+', label: 'Above $60,000' }
    ]
  };

  const filteredAndSortedUniversities = useMemo(() => {
    let filtered = [...universitiesData];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(uni =>
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by country
    if (selectedFilters.country) {
      filtered = filtered.filter(uni => uni.country === selectedFilters.country);
    }

    // Filter by course
    if (selectedFilters.course) {
      filtered = filtered.filter(uni =>
        uni.courses.some(course =>
          course.toLowerCase().includes(selectedFilters.course.toLowerCase())
        )
      );
    }

    // Filter by tuition range
    if (selectedFilters.tuitionRange) {
      const [min, max] = selectedFilters.tuitionRange.split('-').map(v => v.replace('+', ''));
      filtered = filtered.filter(uni => {
        if (max) {
          return uni.tuitionFee >= parseInt(min) && uni.tuitionFee <= parseInt(max);
        } else {
          return uni.tuitionFee >= parseInt(min);
        }
      });
    }

    // Sort universities
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'ranking':
          return a.ranking - b.ranking;
        case 'tuition-low':
          return a.tuitionFee - b.tuitionFee;
        case 'tuition-high':
          return b.tuitionFee - a.tuitionFee;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'admission-rate':
          return a.admissionRate - b.admissionRate;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedFilters, sortBy]);

  const currentCountry = countriesData.find(c => c.id === selectedFilters.country);

  const handleApplyNow = (university) => {
    setApplicationUniversity(university);
    setShowApplicationForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {currentCountry ? `Universities in ${currentCountry.name}` : 'All Universities'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            {currentCountry 
              ? `Explore top-ranked universities in ${currentCountry.name} with world-class programs and excellent career prospects.`
              : 'Discover world-class universities across multiple countries with diverse programs and opportunities.'
            }
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1">
              <SearchBar placeholder="Search universities, cities, or programs..." />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-2">
              <FilterDropdown
                label="Country"
                options={filterOptions.countries}
                filterType="country"
              />
              <FilterDropdown
                label="Course"
                options={filterOptions.courses}
                filterType="course"
              />
              <FilterDropdown
                label="Tuition Range"
                options={filterOptions.tuitionRanges}
                filterType="tuitionRange"
              />
              <div className="min-w-[140px]">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="ranking">Ranking</option>
                  <option value="name">Name A-Z</option>
                  <option value="tuition-low">Tuition: Low to High</option>
                  <option value="tuition-high">Tuition: High to Low</option>
                  <option value="admission-rate">Admission Rate</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Active Filters */}
          {(searchQuery || Object.values(selectedFilters).some(v => v)) && (
            <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
              {searchQuery && (
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                  Search: {searchQuery}
                </span>
              )}
              {Object.entries(selectedFilters).map(([key, value]) => 
                value && (
                  <span
                    key={key}
                    className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm"
                  >
                    {key}: {value}
                  </span>
                )
              )}
              <button
                onClick={clearFilters}
                className="text-red-600 dark:text-red-400 text-sm hover:underline ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600 dark:text-gray-400">
            Showing {filteredAndSortedUniversities.length} universities
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <SortAsc className="h-4 w-4" />
            <span>Sorted by: {sortBy.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
          </div>
        </div>

        {/* Universities Grid */}
        {isLoading ? (
          <CardSkeleton count={6} />
        ) : filteredAndSortedUniversities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedUniversities.map((university) => (
              <UniversityCard
                key={university.id}
                university={university}
                onViewDetails={setSelectedUniversity}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Filter className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No universities found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search criteria or filters to find more universities.
            </p>
            <button
              onClick={clearFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* University Details Modal */}
        <Modal
          isOpen={selectedUniversity !== null}
          onClose={() => setSelectedUniversity(null)}
          title={selectedUniversity?.name}
          size="xl"
        >
          {selectedUniversity && (
            <div className="space-y-6">
              {/* Header Image */}
              <div className="relative h-64 rounded-lg overflow-hidden">
                <img
                  src={selectedUniversity.image}
                  alt={selectedUniversity.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    World Ranking #{selectedUniversity.ranking}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <img
                    src={selectedUniversity.logo}
                    alt={`${selectedUniversity.name} logo`}
                    className="w-16 h-16 bg-white rounded-lg shadow-sm object-cover"
                  />
                </div>
              </div>

              {/* University Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    University Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Location:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedUniversity.city}, {selectedUniversity.state}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Established:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedUniversity.establishedYear}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Students:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedUniversity.studentCount?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Accreditation:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedUniversity.accreditation}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Admission Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Annual Tuition:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ${selectedUniversity.tuitionFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Acceptance Rate:</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">
                        {selectedUniversity.admissionRate}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">World Ranking:</span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        #{selectedUniversity.ranking}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  About the University
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedUniversity.description}
                </p>
              </div>

              {/* Programs Offered */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Programs Offered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedUniversity.courses.map((course, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button 
                  onClick={() => handleApplyNow(selectedUniversity)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Apply Now
                </button>
                <button className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                  Request Information
                </button>
              </div>
            </div>
          )}
        </Modal>

        {/* University Application Form */}
        <UniversityApplicationForm
          university={applicationUniversity}
          isOpen={showApplicationForm}
          onClose={() => {
            setShowApplicationForm(false);
            setApplicationUniversity(null);
            setSelectedUniversity(null);
          }}
        />
      </div>
    </div>
  );
};

export default Universities;