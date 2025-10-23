"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface FilterSidebarProps {
  filters: {
    category: string;
    jobTypes: string[];
    experienceLevels: string[];
    salaryRanges: string[];
    salaryRange: [number, number];
  };
  onFiltersChange: (filters: any) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFiltersChange }) => {
  const handleJobTypeChange = (jobType: string, checked: boolean) => {
    const newJobTypes = checked
      ? [...filters.jobTypes, jobType]
      : filters.jobTypes.filter(type => type !== jobType);
    
    onFiltersChange({
      ...filters,
      jobTypes: newJobTypes,
    });
  };

  const handleExperienceLevelChange = (level: string, checked: boolean) => {
    const newLevels = checked
      ? [...filters.experienceLevels, level]
      : filters.experienceLevels.filter(l => l !== level);
    
    onFiltersChange({
      ...filters,
      experienceLevels: newLevels,
    });
  };

  const handleSalaryRangeChange = (range: string, checked: boolean) => {
    const newRanges = checked
      ? [...filters.salaryRanges, range]
      : filters.salaryRanges.filter(r => r !== range);
    
    onFiltersChange({
      ...filters,
      salaryRanges: newRanges,
    });
  };

  const handleSliderChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      salaryRange: value as [number, number],
    });
  };

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Filter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Category</Label>
          <Select value={filters.category} onValueChange={(value) => onFiltersChange({ ...filters, category: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Anytime">Anytime</SelectItem>
              <SelectItem value="Today">Today</SelectItem>
              <SelectItem value="This Week">This Week</SelectItem>
              <SelectItem value="This Month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Job Type Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Job Type</Label>
          <div className="space-y-2">
            {['Full-Time', 'Part-Time', 'Freelance', 'Internship', 'Volunteer'].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`job-type-${type}`}
                  checked={filters.jobTypes.includes(type)}
                  onCheckedChange={(checked) => handleJobTypeChange(type, checked as boolean)}
                />
                <Label htmlFor={`job-type-${type}`} className="text-sm">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Level Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Experience Level</Label>
          <div className="space-y-2">
            {['Entry Level', 'Intermediate', 'Expert'].map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  id={`experience-${level}`}
                  checked={filters.experienceLevels.includes(level)}
                  onCheckedChange={(checked) => handleExperienceLevelChange(level, checked as boolean)}
                />
                <Label htmlFor={`experience-${level}`} className="text-sm">
                  {level}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Expected Salary Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Expected Salary</Label>
          <div className="space-y-2">
            {['Under $100', '$100 to $1k', '$1k to $5k'].map((range) => (
              <div key={range} className="flex items-center space-x-2">
                <Checkbox
                  id={`salary-${range}`}
                  checked={filters.salaryRanges.includes(range)}
                  onCheckedChange={(checked) => handleSalaryRangeChange(range, checked as boolean)}
                />
                <Label htmlFor={`salary-${range}`} className="text-sm">
                  {range}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Salary Slider */}
        {/*<div className="space-y-3">*/}
        {/*  <Label className="text-sm font-medium">Salary Range</Label>*/}
        {/*  <div className="px-2">*/}
        {/*    <Slider*/}
        {/*      value={filters.salaryRange}*/}
        {/*      onValueChange={handleSliderChange}*/}
        {/*      min={10}*/}
        {/*      max={100}*/}
        {/*      step={1}*/}
        {/*      className="w-full"*/}
        {/*    />*/}
        {/*    <div className="flex justify-between text-xs text-gray-500 mt-1">*/}
        {/*      <span>${filters.salaryRange[0]}</span>*/}
        {/*      <span>${filters.salaryRange[1]}</span>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/* Number of proposals */}
        {/*<div className="space-y-2">*/}
        {/*  <Label className="text-sm font-medium">Number of proposals</Label>*/}
        {/*  <div className="text-sm text-gray-500">*/}
        {/*    This filter will be available soon*/}
        {/*  </div>*/}
        {/*</div>*/}
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
