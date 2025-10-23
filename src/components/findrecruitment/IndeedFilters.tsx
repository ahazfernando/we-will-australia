"use client";

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface IndeedFiltersProps {
  onFilterChange: (filterType: string, value: string) => void;
}

// Define a type for the filter keys for better type safety
type FilterKeys = 'workType' | 'datePosted' | 'jobType' | 'experience' | 'salary' | 'education';

const IndeedFilters: React.FC<IndeedFiltersProps> = ({ onFilterChange }) => {

  const handleSelectChange = (filterType: FilterKeys, value: string) => {
    // Pass the filter change up to the parent component
    onFilterChange(filterType, value);
  };

  // An array to hold filter configuration for easier mapping
  const filters = [
    {
      name: 'Work type',
      type: 'workType' as FilterKeys,
      options: [
        { value: 'remote', label: 'Remote' },
        { value: 'onsite', label: 'On-site' },
        { value: 'hybrid', label: 'Hybrid' },
      ],
    },
    {
      name: 'Date posted',
      type: 'datePosted' as FilterKeys,
      options: [
        { value: 'today', label: 'Today' },
        { value: '3days', label: 'Past 3 days' },
        { value: 'week', label: 'Past week' },
        { value: 'month', label: 'Past month' },
      ],
    },
    {
      name: 'Job type',
      type: 'jobType' as FilterKeys,
      options: [
        { value: 'full-time', label: 'Full-time' },
        { value: 'part-time', label: 'Part-time' },
        { value: 'contract', label: 'Contract' },
        { value: 'volunteer', label: 'Volunteer' },
        { value: 'freelance', label: 'Freelance' },
        { value: 'internship', label: 'Internship' },
      ],
    },
    {
      name: 'Experience level',
      type: 'experience' as FilterKeys,
      options: [
        { value: 'entry', label: 'Entry level' },
        { value: 'intermediate', label: 'Intermediate level' },
        { value: 'expert', label: 'Expert level' },
      ],
    },
    {
      name: 'Salary',
      type: 'salary' as FilterKeys,
      options: [
        // FIXED: Values are now full numbers for easier backend processing
        { value: '30000', label: '$30,000+' },
        { value: '50000', label: '$50,000+' },
        { value: '70000', label: '$70,000+' },
        { value: '100000', label: '$100,000+' },
      ],
    },
  ];

  return (
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* On small screens, this div allows horizontal scrolling. On larger screens, it allows wrapping. */}
          <div className="overflow-x-auto whitespace-nowrap lg:overflow-x-visible lg:whitespace-normal py-2 -mx-2 px-2">
            <div className="flex lg:flex-wrap items-center gap-3">
              {filters.map((filter) => (
                  <Select key={filter.type} onValueChange={(value) => handleSelectChange(filter.type, value)}>
                    <SelectTrigger className="w-auto border-gray-300 rounded-full px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 focus:ring-2 focus:ring-ring focus:ring-offset-2 whitespace-nowrap">
                      <SelectValue placeholder={filter.name} />
                    </SelectTrigger>
                    <SelectContent>
                      {filter.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default IndeedFilters;