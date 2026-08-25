import React from 'react';
import { Badge } from './Badge';
import { Clock } from 'lucide-react';

interface DeadlineBadgeProps {
  deadlineISO: string;
}

export function DeadlineBadge({ deadlineISO }: DeadlineBadgeProps) {
  const deadline = new Date(deadlineISO);
  const now = new Date();
  
  // Reset hours to compare dates only
  const d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const d2 = new Date(deadline.getFullYear(), deadline.getMonth(), deadline.getDate());
  
  const diffTime = d2.getTime() - d1.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return (
      <Badge variant="gray" className="flex items-center gap-1">
        <Clock className="w-3.5 h-3.5" />
        <span>Closed</span>
      </Badge>
    );
  }

  if (diffDays === 0) {
    return (
      <Badge variant="danger" className="flex items-center gap-1 animate-pulse">
        <Clock className="w-3.5 h-3.5" />
        <span>Closes today</span>
      </Badge>
    );
  }

  if (diffDays === 1) {
    return (
      <Badge variant="danger" className="flex items-center gap-1">
        <Clock className="w-3.5 h-3.5" />
        <span>Closes tomorrow</span>
      </Badge>
    );
  }

  if (diffDays <= 3) {
    return (
      <Badge variant="warning" className="flex items-center gap-1">
        <Clock className="w-3.5 h-3.5" />
        <span>{diffDays} days left</span>
      </Badge>
    );
  }

  return (
    <Badge variant="info" className="flex items-center gap-1">
      <Clock className="w-3.5 h-3.5" />
      <span>{diffDays} days left</span>
    </Badge>
  );
}
