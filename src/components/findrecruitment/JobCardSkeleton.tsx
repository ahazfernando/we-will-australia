"use client";

import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const JobCardSkeleton: React.FC = () => {
  return (
    <div className="p-4 border-l-4 border-transparent">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <Skeleton className="h-6 w-3/4 mb-2" />

          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-1" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="mt-2 space-y-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
          <div className="mt-2">
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCardSkeleton;
