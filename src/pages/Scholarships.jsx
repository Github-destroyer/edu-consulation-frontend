import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, Calendar, Award } from 'lucide-react';
import SearchBar from '../components/UI/SearchBar';
import FilterDropdown from '../components/UI/FilterDropdown';
import ScholarshipCard from '../components/Cards/ScholarshipCard';
import ScholarshipApplicationForm from '../components/Forms/ScholarshipApplicationForm';
import Modal from '../components/UI/Modal';
import { CardSkeleton } from '../components/UI/LoadingSkeleton';
import { useApp } from '../contexts/AppContext';

// Import data
import scholarshipsData from '../data/scholarships.json';
import countriesData from '../data/countries.json';

const Scholarships = () => {
  const { id } = useParams();
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationScholarship, setApplicationScholarship] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('deadline');
  const { searchQuery, selectedFilters, updateFilter, clearFilters } = useApp();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // If accessing specific scholarship from URL
    if (id) {
      const scholarship = scholarshipsData.find(s => s.id.toString() === id);
      if (scholarship) {
        setSelectedScholarship(scholarship);
      }
    }
  }, [id]);

  const filterOptions = {
    countries: countriesData.map(c => ({ value: c.id, label: c.name })),
    degreeLevel: [
      { value: 'undergraduate', label: 'Undergraduate' },
      { value: 'graduate', label: 'Graduate' },
      { value: 'phd', label: 'PhD' },
      { value: 'postdoc', label: 'Post-Doctoral' }
    ],
    type: [
      { value: 'full funding', label: 'Full Funding' },
      { value: 'partial funding', label: 'Partial Funding' },
      { value: 'tuition waiver', label: 'Tuition Waiver' },
      { value: 'stipend', label: 'Stipend Only' }
    ],
    amount: [
      { value: '0-25000', label: 'Under $25,000' },
      { value: '25000-50000', label: '$25,000 - $50,000' },
      { value: '50000-75000', label: '$50,000 - $75,000' },
      { value: '75000+', label: 'Above $75,000' }
    ]
  };

  const filteredAndSortedScholarships = useMemo(() => {
    let filtered = [...scholarshipsData];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(scholarship =>
        scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by country
    if (selectedFilters.country) {
      filtered = filtered.filter(scholarship => scholarship.country === selectedFilters.country);
    }

    // Filter by degree level
    if (selectedFilters.degreeLevel) {
      filtered = filtered.filter(scholarship => 
        scholarship.degreeLevel.toLowerCase().includes(selectedFilters.degreeLevel.toLowerCase())
      );
    }

    // Filter by type
    if (selectedFilters.scholarshipType) {
      filtered = filtered.filter(scholarship => 
        scholarship.type.toLowerCase() === selectedFilters.scholarshipType.toLowerCase()
      );
    }

    // Filter by amount
    if (selectedFilters.amount) {
      const [min, max] = selectedFilters.amount.split('-').map(v => v.replace('+', ''));
      filtered = filtered.filter(scholarship => {
        if (max) {
          return scholarship.amount >= parseInt(min) && scholarship.amount <= parseInt(max);
        } else {
          return scholarship.amount >= parseInt(min);
        }
      });
    }

    // Sort scholarships
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          return new Date(a.deadline) - new Date(b.deadline);
        case 'amount-high':
          return b.amount - a.amount;
        case 'amount-low':
          return a.amount - b.amount;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'success-rate':
          return (b.awards / b.applicants) - (a.awards / a.applicants);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedFilters, sortBy]);

  const handleApplyForScholarship = (scholarship) => {
    setApplicationScholarship(scholarship);
    setShowApplicationForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            International Scholarships
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            Discover prestigious scholarships worldwide that can fund your international education journey. 
            From full-ride scholarships to specialized grants, find opportunities that match your academic profile.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1">
              <SearchBar placeholder="Search scholarships by name, country, or description..." />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-2">
              <FilterDropdown
                label="Country"
                options={filterOptions.countries}
                filterType="country"
              />
              <FilterDropdown
                label="Degree Level"
                options={filterOptions.degreeLevel}
                filterType="degreeLevel"
              />
              <FilterDropdown
                label="Type"
                options={filterOptions.type}
                filterType="scholarshipType"
              />
              <FilterDropdown
                label="Amount"
                options={filterOptions.amount}
                filterType="amount"
              />
              <div className="min-w-[140px]">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="deadline">Deadline</option>
                  <option value="name">Name A-Z</option>
                  <option value="amount-high">Amount: High to Low</option>
                  <option value="amount-low">Amount: Low to High</option>
                  <option value="success-rate">Success Rate</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Active Filters */}
          {(searchQuery || Object.values(selectedFilters).some(v => v)) && (
            <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
              {searchQuery && (
                <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full text-sm">
                  Search: {searchQuery}
                </span>
              )}
              {Object.entries(selectedFilters).map(([key, value]) => 
                value && key !== 'course' && key !== 'tuitionRange' && key !== 'ranking' && (
                  <span
                    key={key}
                    className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full text-sm"
                  >
                    {key.replace('scholarshipType', 'type')}: {value}
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

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {scholarshipsData.length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Total Scholarships</div>
              </div>
              <Award className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${Math.round(scholarshipsData.reduce((acc, s) => acc + s.amount, 0) / scholarshipsData.length / 1000)}K
                </div>
                <div className="text-gray-600 dark:text-gray-400">Avg. Award Amount</div>
              </div>
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-bold">$</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round(scholarshipsData.reduce((acc, s) => acc + (s.awards / s.applicants * 100), 0) / scholarshipsData.length)}%
                </div>
                <div className="text-gray-600 dark:text-gray-400">Avg. Success Rate</div>
              </div>
              <Calendar className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600 dark:text-gray-400">
            Showing {filteredAndSortedScholarships.length} scholarships
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Sorted by: {sortBy.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
          </div>
        </div>

        {/* Scholarships Grid */}
        {isLoading ? (
          <CardSkeleton count={6} />
        ) : filteredAndSortedScholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedScholarships.map((scholarship) => (
              <ScholarshipCard
                key={scholarship.id}
                scholarship={scholarship}
                onViewDetails={setSelectedScholarship}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Filter className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No scholarships found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search criteria or filters to find more opportunities.
            </p>
            <button
              onClick={clearFilters}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Scholarship Details Modal */}
        <Modal
          isOpen={selectedScholarship !== null}
          onClose={() => setSelectedScholarship(null)}
          title={selectedScholarship?.name}
          size="xl"
        >
          {selectedScholarship && (
            <div className="space-y-6">
              {/* Header Image */}
              <div className="relative h-64 rounded-lg overflow-hidden">
                <img
                  src={selectedScholarship.image}
                  alt={selectedScholarship.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedScholarship.type.toLowerCase() === 'full funding'
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300'
                      : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                  }`}>
                    {selectedScholarship.type}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ${selectedScholarship.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Scholarship Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Country:</span>
                      <span className="font-medium text-gray-900 dark:text-white capitalize">
                        {selectedScholarship.country}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ${selectedScholarship.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Type:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedScholarship.type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedScholarship.duration}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Degree Level:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedScholarship.degreeLevel}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Application Statistics
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Application Deadline:</span>
                      <span className="font-medium text-red-600 dark:text-red-400">
                        {new Date(selectedScholarship.deadline).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Total Applicants:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedScholarship.applicants.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Awards Given:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedScholarship.awards}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Success Rate:</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">
                        {((selectedScholarship.awards / selectedScholarship.applicants) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  About This Scholarship
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedScholarship.description}
                </p>
              </div>

              {/* Eligibility Requirements */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Eligibility Requirements
                </h3>
                <ul className="space-y-2">
                  {selectedScholarship.eligibility.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Scholarship Benefits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedScholarship.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-emerald-100 dark:bg-emerald-900/30 rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button 
                  onClick={() => handleApplyForScholarship(selectedScholarship)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Apply for Scholarship
                </button>
                <button className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                  Get Application Help
                </button>
              </div>
            </div>
          )}
        </Modal>

        {/* Scholarship Application Form */}
        <ScholarshipApplicationForm
          scholarship={applicationScholarship}
          isOpen={showApplicationForm}
          onClose={() => {
            setShowApplicationForm(false);
            setApplicationScholarship(null);
            setSelectedScholarship(null);
          }}
        />
      </div>
    </div>
  );
};

export default Scholarships;