import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 h-full">
      {/* Quote Icon */}
      <div className="mb-4">
        <Quote className="h-8 w-8 text-blue-600 dark:text-blue-400" />
      </div>
      
      {/* Testimonial Text */}
      <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
        "{testimonial.testimonial}"
      </blockquote>
      
      {/* Rating */}
      <div className="flex items-center mb-4">
        {[...Array(testimonial.rating)].map((_, index) => (
          <Star
            key={index}
            className="h-4 w-4 text-yellow-400 fill-current"
          />
        ))}
      </div>
      
      {/* Student Info */}
      <div className="flex items-center">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {testimonial.name}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {testimonial.course} at {testimonial.university}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Class of {testimonial.graduationYear}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;