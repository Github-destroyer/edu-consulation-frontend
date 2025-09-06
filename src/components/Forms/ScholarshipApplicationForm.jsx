import React, { useState } from 'react';
import { X, Upload, User, GraduationCap, DollarSign, FileText, Send, AlertCircle, CheckCircle, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const ScholarshipApplicationForm = ({ scholarship, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    address: '',
    
    // Academic Information
    currentEducationLevel: '',
    currentInstitution: '',
    fieldOfStudy: '',
    currentGPA: '',
    previousDegree: '',
    graduationYear: '',
    
    // Financial Information
    familyIncome: '',
    currentFunding: '',
    fundingGap: '',
    
    // Essays and Motivation
    whyDeserve: '',
    careerGoals: '',
    contributionPlans: '',
    leadershipExperience: '',
    challenges: '',
    
    // Additional Information
    extracurriculars: '',
    volunteering: '',
    achievements: '',
    references: {
      academic: { name: '', email: '', position: '', institution: '' },
      professional: { name: '', email: '', position: '', organization: '' }
    },
    
    // Documents
    documents: {
      transcript: null,
      essay: null,
      recommendation: null,
      financial: null,
      passport: null
    }
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const educationLevels = [
    { value: 'high-school', label: 'High School' },
    { value: 'bachelors', label: "Bachelor's Degree" },
    { value: 'masters', label: "Master's Degree" },
    { value: 'phd', label: 'PhD' },
    { value: 'other', label: 'Other' }
  ];

  const incomeRanges = [
    { value: '0-25000', label: 'Under $25,000' },
    { value: '25000-50000', label: '$25,000 - $50,000' },
    { value: '50000-75000', label: '$50,000 - $75,000' },
    { value: '75000-100000', label: '$75,000 - $100,000' },
    { value: '100000+', label: 'Above $100,000' }
  ];

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    const requiredFields = {
      firstName: 'First name is required',
      lastName: 'Last name is required',
      email: 'Email is required',
      phone: 'Phone number is required',
      dateOfBirth: 'Date of birth is required',
      nationality: 'Nationality is required',
      currentEducationLevel: 'Current education level is required',
      fieldOfStudy: 'Field of study is required',
      whyDeserve: 'Please explain why you deserve this scholarship',
      careerGoals: 'Please describe your career goals'
    };

    Object.keys(requiredFields).forEach(field => {
      if (!formData[field]?.trim()) {
        newErrors[field] = requiredFields[field];
      }
    });

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // GPA validation
    if (formData.currentGPA && (isNaN(formData.currentGPA) || formData.currentGPA < 0 || formData.currentGPA > 4)) {
      newErrors.currentGPA = 'GPA should be between 0 and 4';
    }

    // Essay length validation
    if (formData.whyDeserve && formData.whyDeserve.length < 100) {
      newErrors.whyDeserve = 'Please provide at least 100 characters';
    }

    if (formData.careerGoals && formData.careerGoals.length < 100) {
      newErrors.careerGoals = 'Please provide at least 100 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitStatus('success');
    setTimeout(() => {
      setSubmitStatus('');
      onClose();
      // Reset form
      setFormData({
        firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', 
        nationality: '', address: '', currentEducationLevel: '', 
        currentInstitution: '', fieldOfStudy: '', currentGPA: '', 
        previousDegree: '', graduationYear: '', familyIncome: '', 
        currentFunding: '', fundingGap: '', whyDeserve: '', careerGoals: '', 
        contributionPlans: '', leadershipExperience: '', challenges: '', 
        extracurriculars: '', volunteering: '', achievements: '', 
        references: { academic: {}, professional: {} }, documents: {}
      });
    }, 2000);
    
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleReferenceChange = (type, field, value) => {
    setFormData(prev => ({
      ...prev,
      references: {
        ...prev.references,
        [type]: {
          ...prev.references[type],
          [field]: value
        }
      }
    }));
  };

  const handleFileUpload = (documentType, file) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: file
      }
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
            <div>
              <h2 className="text-2xl font-bold">Apply for {scholarship?.name}</h2>
              <p className="text-emerald-100">Complete your scholarship application</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Success Message */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="m-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4 flex items-center"
            >
              <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mr-3" />
              <div>
                <h3 className="text-emerald-800 dark:text-emerald-200 font-semibold">Scholarship Application Submitted!</h3>
                <p className="text-emerald-700 dark:text-emerald-300 text-sm">Thank you for applying. We'll review your application and notify you about the results.</p>
              </div>
            </motion.div>
          )}
          
          {/* Form Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Personal Information */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <User className="h-6 w-6 mr-3 text-blue-600 dark:text-blue-400" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200 ${
                        errors.firstName 
                          ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                      } text-gray-900 dark:text-white`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200 ${
                        errors.lastName 
                          ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                      } text-gray-900 dark:text-white`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200 ${
                        errors.email 
                          ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                      } text-gray-900 dark:text-white`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200 ${
                        errors.phone 
                          ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                      } text-gray-900 dark:text-white`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200 ${
                        errors.dateOfBirth 
                          ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                      } text-gray-900 dark:text-white`}
                    />
                    {errors.dateOfBirth && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nationality *
                    </label>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200 ${
                        errors.nationality 
                          ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                      } text-gray-900 dark:text-white`}
                      placeholder="Enter your nationality"
                    />
                    {errors.nationality && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.nationality}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* Academic Information */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <GraduationCap className="h-6 w-6 mr-3 text-emerald-600 dark:text-emerald-400" />
                  Academic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current Education Level *
                    </label>
                    <select
                      name="currentEducationLevel"
                      value={formData.currentEducationLevel}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200 ${
                        errors.currentEducationLevel 
                          ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                      } text-gray-900 dark:text-white`}
                    >
                      <option value="">Select education level</option>
                      {educationLevels.map(level => (
                        <option key={level.value} value={level.value}>{level.label}</option>
                      ))}
                    </select>
                    {errors.currentEducationLevel && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.currentEducationLevel}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Field of Study *
                    </label>
                    <input
                      type="text"
                      name="fieldOfStudy"
                      value={formData.fieldOfStudy}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200 ${
                        errors.fieldOfStudy 
                          ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                      } text-gray-900 dark:text-white`}
                      placeholder="e.g., Computer Science, Business Administration"
                    />
                    {errors.fieldOfStudy && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.fieldOfStudy}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current Institution
                    </label>
                    <input
                      type="text"
                      name="currentInstitution"
                      value={formData.currentInstitution}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                      placeholder="Enter your current institution"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current GPA (4.0 scale)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="4"
                      name="currentGPA"
                      value={formData.currentGPA}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                      placeholder="Enter your GPA"
                    />
                  </div>
                </div>
              </section>

              {/* Financial Information */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <DollarSign className="h-6 w-6 mr-3 text-green-600 dark:text-green-400" />
                  Financial Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Family Annual Income
                    </label>
                    <select
                      name="familyIncome"
                      value={formData.familyIncome}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                    >
                      <option value="">Select income range</option>
                      {incomeRanges.map(income => (
                        <option key={income.value} value={income.value}>{income.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current Funding Sources
                    </label>
                    <input
                      type="text"
                      name="currentFunding"
                      value={formData.currentFunding}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                      placeholder="e.g., Parents, Part-time job, Loans"
                    />
                  </div>
                </div>
              </section>

              {/* Essays and Motivation */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Heart className="h-6 w-6 mr-3 text-red-600 dark:text-red-400" />
                  Essays and Motivation
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Why do you deserve this scholarship? * (minimum 100 characters)
                    </label>
                    <textarea
                      name="whyDeserve"
                      value={formData.whyDeserve}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200 resize-vertical ${
                        errors.whyDeserve 
                          ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                      } text-gray-900 dark:text-white`}
                      placeholder="Explain your financial need, academic achievements, and personal circumstances..."
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.whyDeserve && (
                        <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.whyDeserve}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                        {formData.whyDeserve.length} characters
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      What are your career goals? * (minimum 100 characters)
                    </label>
                    <textarea
                      name="careerGoals"
                      value={formData.careerGoals}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200 resize-vertical ${
                        errors.careerGoals 
                          ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                      } text-gray-900 dark:text-white`}
                      placeholder="Describe your short-term and long-term career objectives and how this scholarship will help..."
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.careerGoals && (
                        <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.careerGoals}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                        {formData.careerGoals.length} characters
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      How do you plan to contribute to your community?
                    </label>
                    <textarea
                      name="contributionPlans"
                      value={formData.contributionPlans}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 resize-vertical"
                      placeholder="Describe how you plan to give back to your community or society..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Leadership Experience and Extracurricular Activities
                    </label>
                    <textarea
                      name="leadershipExperience"
                      value={formData.leadershipExperience}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 resize-vertical"
                      placeholder="Describe your leadership roles, volunteer work, and extracurricular activities..."
                    />
                  </div>
                </div>
              </section>

              {/* References */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FileText className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400" />
                  References
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Academic Reference */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Academic Reference</h4>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.references.academic.name}
                        onChange={(e) => handleReferenceChange('academic', 'name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.references.academic.email}
                        onChange={(e) => handleReferenceChange('academic', 'email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                      />
                      <input
                        type="text"
                        placeholder="Position/Title"
                        value={formData.references.academic.position}
                        onChange={(e) => handleReferenceChange('academic', 'position', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                      />
                      <input
                        type="text"
                        placeholder="Institution"
                        value={formData.references.academic.institution}
                        onChange={(e) => handleReferenceChange('academic', 'institution', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                      />
                    </div>
                  </div>

                  {/* Professional Reference */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Professional Reference (Optional)</h4>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.references.professional.name}
                        onChange={(e) => handleReferenceChange('professional', 'name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.references.professional.email}
                        onChange={(e) => handleReferenceChange('professional', 'email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                      />
                      <input
                        type="text"
                        placeholder="Position/Title"
                        value={formData.references.professional.position}
                        onChange={(e) => handleReferenceChange('professional', 'position', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                      />
                      <input
                        type="text"
                        placeholder="Organization"
                        value={formData.references.professional.organization}
                        onChange={(e) => handleReferenceChange('professional', 'organization', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Document Upload */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Upload className="h-6 w-6 mr-3 text-emerald-600 dark:text-emerald-400" />
                  Supporting Documents
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { key: 'transcript', label: 'Academic Transcript', required: true },
                    { key: 'essay', label: 'Personal Essay', required: true },
                    { key: 'recommendation', label: 'Letter of Recommendation', required: false },
                    { key: 'financial', label: 'Financial Documents', required: false },
                    { key: 'passport', label: 'Passport/ID Copy', required: true }
                  ].map(doc => (
                    <div key={doc.key} className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-emerald-400 dark:hover:border-emerald-500 transition-colors duration-200">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {doc.label} {doc.required && <span className="text-red-500">*</span>}
                      </p>
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload(doc.key, e.target.files[0])}
                        className="hidden"
                        id={`upload-${doc.key}`}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <label
                        htmlFor={`upload-${doc.key}`}
                        className="cursor-pointer bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-lg text-sm hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors duration-200"
                      >
                        Choose File
                      </label>
                      {formData.documents[doc.key] && (
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">
                          ✓ {formData.documents[doc.key].name}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Submit Scholarship Application
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScholarshipApplicationForm;