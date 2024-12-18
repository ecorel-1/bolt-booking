import React from 'react';
import { Trophy } from 'lucide-react';

interface RewardsBarProps {
  points: number;
}

export function RewardsBar({ points }: RewardsBarProps) {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6" />
          <h2 className="text-lg font-semibold">Your Rewards</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">{points}</span>
          <span>points</span>
        </div>
      </div>
    </div>
  );
}