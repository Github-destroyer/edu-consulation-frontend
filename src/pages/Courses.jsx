import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Users, Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import CourseCard from '../components/Cards/CourseCard';

// Import data
import coursesData from '../data/courses.json';

const Courses = () => {
  const { category, subcategory } = useParams();

  // If no category is specified, show all categories
  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Course Categories
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Explore diverse academic programs across various fields of study. Find the perfect course 
              to advance your career and achieve your educational goals.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {coursesData.categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <CourseCard category={cat} />
              </motion.div>
            ))}
          </div>

          {/* Statistics */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Why Choose International Education?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  World-Class Education
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Access to top-ranked universities and cutting-edge programs globally
                </p>
              </div>
              <div className="text-center">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Global Network
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Build connections with students and professionals from around the world
                </p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Career Opportunities
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Enhanced job prospects and higher earning potential worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Find the selected category
  const selectedCategory = coursesData.categories.find(cat => cat.id === category);
  
  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Category Not Found
          </h1>
          <Link
            to="/courses"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Return to Course Categories
          </Link>
        </div>
      </div>
    );
  }

  // If subcategory is specified, show specific subcategory details
  if (subcategory) {
    const selectedSubcategory = selectedCategory.subcategories.find(sub => sub.id === subcategory);
    
    if (!selectedSubcategory) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Program Not Found
            </h1>
            <Link
              to={`/courses/${category}`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Return to {selectedCategory.name}
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Link to="/courses" className="hover:text-blue-600 dark:hover:text-blue-400">
                Courses
              </Link>
              <span>/</span>
              <Link 
                to={`/courses/${category}`}
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                {selectedCategory.name}
              </Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-white">{selectedSubcategory.name}</span>
            </div>
          </nav>

          {/* Back Button */}
          <Link
            to={`/courses/${category}`}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {selectedCategory.name}
          </Link>

          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {selectedSubcategory.name}
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    {selectedSubcategory.description}
                  </p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
                  <span className="text-4xl">{selectedCategory.icon}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Program Overview */}
          <div className="space-y-8">
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <BookOpen className="h-6 w-6 mr-3 text-blue-600 dark:text-blue-400" />
                Program Overview
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {selectedSubcategory.overview}
              </p>
            </section>

            {/* Career Opportunities */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Briefcase className="h-6 w-6 mr-3 text-emerald-600 dark:text-emerald-400" />
                Career Opportunities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedSubcategory.careerOpportunities.map((career, index) => (
                  <div
                    key={index}
                    className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800"
                  >
                    <h3 className="font-semibold text-emerald-900 dark:text-emerald-200">
                      {career}
                    </h3>
                  </div>
                ))}
              </div>
            </section>

            {/* Admission Process */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <GraduationCap className="h-6 w-6 mr-3 text-orange-600 dark:text-orange-400" />
                Admission Requirements
              </h2>
              <ul className="space-y-3">
                {selectedSubcategory.admissionProcess.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-orange-100 dark:bg-orange-900/30 rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Top Universities */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Users className="h-6 w-6 mr-3 text-blue-600 dark:text-blue-400" />
                Top Universities for {selectedSubcategory.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedSubcategory.topUniversities.map((university, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800 text-center"
                  >
                    <h3 className="font-semibold text-blue-900 dark:text-blue-200">
                      {university}
                    </h3>
                  </div>
                ))}
              </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-sm p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Start Your {selectedSubcategory.name} Journey?
              </h2>
              <p className="text-blue-100 mb-6">
                Get personalized guidance from our education consultants and find the perfect program for your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/universities"
                  className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  Find Universities
                </Link>
                <Link
                  to="/contact"
                  className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Get Consultation
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  // Show subcategories for the selected category
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Link to="/courses" className="hover:text-blue-600 dark:hover:text-blue-400">
              Courses
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">{selectedCategory.name}</span>
          </div>
        </nav>

        {/* Back Button */}
        <Link
          to="/courses"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to All Categories
        </Link>

        {/* Category Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="relative h-64">
            <img
              src={selectedCategory.image}
              alt={selectedCategory.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">{selectedCategory.icon}</div>
                <h1 className="text-4xl font-bold mb-4">{selectedCategory.name}</h1>
                <p className="text-xl text-blue-100 max-w-2xl">
                  {selectedCategory.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Subcategories Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {selectedCategory.name} Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {selectedCategory.subcategories.map((sub, index) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={`/courses/${category}/${sub.id}`}
                  className="block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 group"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {sub.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {sub.description}
                  </p>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                    <span>Learn More</span>
                    <ArrowLeft className="h-4 w-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-sm p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Explore {selectedCategory.name} Programs?
          </h2>
          <p className="text-blue-100 mb-6 text-lg">
            Connect with our expert counselors to find the perfect program and university for your career goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/universities"
              className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors duration-200"
            >
              Browse Universities
            </Link>
            <Link
              to="/contact"
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Get Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;