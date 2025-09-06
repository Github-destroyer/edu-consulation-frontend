import React from 'react';
import { Calendar, Users, Award, DollarSign, MapPin, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const ScholarshipCard = ({ scholarship, onViewDetails }) => {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDeadline = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'full funding':
        return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300';
      case 'partial funding':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      default:
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Header Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={scholarship.image}
          alt={scholarship.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(scholarship.type)}`}>
            {scholarship.type}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-lg">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {formatAmount(scholarship.amount)}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {scholarship.name}
          </h3>
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="capitalize">{scholarship.country}</span>
            <span className="mx-2">•</span>
            <Award className="h-4 w-4 mr-1" />
            <span>{scholarship.degreeLevel}</span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {scholarship.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {scholarship.awards}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Awards Given</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {(scholarship.awards / scholarship.applicants * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Success Rate</div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Deadline</span>
            </div>
            <span className="text-red-600 dark:text-red-400 font-medium">
              {formatDeadline(scholarship.deadline)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Users className="h-4 w-4 mr-2" />
              <span>Applicants</span>
            </div>
            <span className="text-gray-900 dark:text-white font-medium">
              {scholarship.applicants.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Benefits Preview */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Key Benefits:</h4>
          <div className="flex flex-wrap gap-1">
            {scholarship.benefits.slice(0, 2).map((benefit, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full"
              >
                {benefit}
              </span>
            ))}
            {scholarship.benefits.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                +{scholarship.benefits.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onViewDetails(scholarship)}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          <span>View Details & Apply</span>
          <ExternalLink className="h-4 w-4 ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default ScholarshipCard;