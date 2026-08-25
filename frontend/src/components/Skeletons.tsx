import React from 'react';

export function CardSkeleton() {
  return (
    <div className="bg-white border border-slate-150 rounded-2xl p-5 space-y-4 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="w-16 h-5 bg-slate-200 rounded-full"></div>
        <div className="w-20 h-5 bg-slate-200 rounded-full"></div>
      </div>
      
      <div className="space-y-2">
        <div className="h-5 bg-slate-200 rounded w-5/6"></div>
        <div className="h-3.5 bg-slate-200 rounded w-1/3"></div>
      </div>

      <div className="space-y-2 pt-2">
        <div className="h-3 bg-slate-200 rounded w-full"></div>
        <div className="h-3 bg-slate-200 rounded w-4/5"></div>
      </div>

      <div className="flex gap-1.5 pt-1">
        <div className="w-12 h-4 bg-slate-200 rounded-md"></div>
        <div className="w-12 h-4 bg-slate-200 rounded-md"></div>
        <div className="w-12 h-4 bg-slate-200 rounded-md"></div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
        <div className="w-20 h-4 bg-slate-200 rounded"></div>
        <div className="w-28 h-8 bg-slate-200 rounded-xl"></div>
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="bg-white border border-slate-150 rounded-3xl p-6 md:p-8 space-y-6 animate-pulse">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-slate-200"></div>
        <div className="space-y-2 text-center sm:text-left flex-1">
          <div className="h-6 bg-slate-200 rounded w-1/3 mx-auto sm:mx-0"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto sm:mx-0"></div>
          <div className="h-3.5 bg-slate-200 rounded w-1/4 mx-auto sm:mx-0"></div>
        </div>
      </div>
      
      <div className="border-t border-slate-100 pt-6 space-y-4">
        <div className="h-5 bg-slate-200 rounded w-1/4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="h-16 bg-slate-100 rounded-xl"></div>
          <div className="h-16 bg-slate-100 rounded-xl"></div>
          <div className="h-16 bg-slate-100 rounded-xl"></div>
          <div className="h-16 bg-slate-100 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
