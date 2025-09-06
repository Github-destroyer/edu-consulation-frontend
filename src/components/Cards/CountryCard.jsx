import React from 'react';
import { ArrowRight, GraduationCap, DollarSign, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CountryCard = ({ country }) => {
  const formatTuition = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link
        to={`/universities/${country.id}`}
        className="block bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={country.image}
            alt={country.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="text-3xl">{country.flag}</span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-2xl font-bold text-white mb-1">
              {country.name}
            </h3>
            <p className="text-gray-200 text-sm line-clamp-2">
              {country.description}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {country.universityCount}+
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Universities</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatTuition(country.averageTuition)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Avg. Tuition</div>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-center justify-center mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {country.studyDuration}
            </span>
          </div>

          {/* Popular Courses */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Popular Courses:
            </h4>
            <div className="flex flex-wrap gap-1">
              {country.popularCourses.map((course) => (
                <span
                  key={course}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>

          {/* Action */}
          <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
            <span>Explore Universities</span>
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform duration-200" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CountryCard;