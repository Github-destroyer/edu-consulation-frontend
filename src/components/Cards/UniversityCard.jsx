import React from 'react';
import { MapPin, Star, Users, Calendar, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const UniversityCard = ({ university, onViewDetails }) => {
  const formatTuition = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* University Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={university.image}
          alt={university.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            #{university.ranking}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <img
            src={university.logo}
            alt={`${university.name} logo`}
            className="w-12 h-12 bg-white rounded-lg shadow-sm object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {university.name}
          </h3>
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{university.city}, {university.state}</span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {university.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatTuition(university.tuitionFee)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Annual Tuition</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {university.admissionRate}%
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Acceptance Rate</div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{university.studentCount?.toLocaleString()} students</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Est. {university.establishedYear}</span>
          </div>
        </div>

        {/* Courses Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {university.courses.slice(0, 3).map((course) => (
            <span
              key={course}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
            >
              {course}
            </span>
          ))}
          {university.courses.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
              +{university.courses.length - 3} more
            </span>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={() => onViewDetails(university)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          <span>View Details</span>
          <ExternalLink className="h-4 w-4 ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default UniversityCard;