import React from 'react';
import { ArrowRight, BookOpen, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CourseCard = ({ category }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link
        to={`/courses/${category.id}`}
        className="block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300"
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          <div className="absolute top-4 left-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm w-12 h-12 rounded-lg flex items-center justify-center">
              <span className="text-2xl">{category.icon}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {category.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
              {category.description}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>{category.subcategories.length} Programs</span>
            </div>
          </div>

          {/* Subcategories Preview */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {category.subcategories.slice(0, 2).map((sub) => (
                <span
                  key={sub.id}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                >
                  {sub.name}
                </span>
              ))}
              {category.subcategories.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                  +{category.subcategories.length - 2} more
                </span>
              )}
            </div>
          </div>

          {/* Action */}
          <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
            <span>Explore Programs</span>
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CourseCard;