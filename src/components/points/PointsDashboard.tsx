import React from 'react';
import { Award, TrendingUp, Gift, History } from 'lucide-react';

interface PointsHistory {
  id: string;
  date: string;
  description: string;
  points: number;
  type: 'earned' | 'spent';
}

interface PointsStats {
  totalPoints: number;
  pointsEarned: number;
  pointsSpent: number;
  nextReward: {
    name: string;
    pointsNeeded: number;
  };
}

const mockHistory: PointsHistory[] = [
  {
    id: '1',
    date: '2024-03-15',
    description: 'Yoga Class Booking',
    points: 50,
    type: 'earned',
  },
  {
    id: '2',
    date: '2024-03-10',
    description: 'Gym Session',
    points: 30,
    type: 'earned',
  },
  {
    id: '3',
    date: '2024-03-05',
    description: 'Free Session Reward',
    points: -100,
    type: 'spent',
  },
];

const mockStats: PointsStats = {
  totalPoints: 350,
  pointsEarned: 450,
  pointsSpent: 100,
  nextReward: {
    name: 'Free Adventure Session',
    pointsNeeded: 50,
  },
};

export function PointsDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Points"
          value={mockStats.totalPoints}
          icon={<Award className="w-8 h-8 text-blue-500" />}
          description="Available balance"
        />
        <StatCard
          title="Points Earned"
          value={mockStats.pointsEarned}
          icon={<TrendingUp className="w-8 h-8 text-green-500" />}
          description="Total earned"
        />
        <StatCard
          title="Points Spent"
          value={mockStats.pointsSpent}
          icon={<History className="w-8 h-8 text-purple-500" />}
          description="Total redeemed"
        />
        <StatCard
          title="Next Reward"
          value={mockStats.nextReward.pointsNeeded}
          icon={<Gift className="w-8 h-8 text-orange-500" />}
          description={mockStats.nextReward.name}
          suffix=" points needed"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Points History</h3>
        <div className="space-y-4">
          {mockHistory.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium">{item.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`font-semibold ${
                  item.type === 'earned'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {item.type === 'earned' ? '+' : '-'}{item.points} points
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Available Rewards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Free Session', points: 200, icon: '🎯' },
            { name: 'Premium Class', points: 300, icon: '⭐' },
            { name: 'Adventure Pack', points: 500, icon: '🎒' },
          ].map((reward, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">{reward.icon}</div>
              <h4 className="font-semibold">{reward.name}</h4>
              <p className="text-sm text-gray-500">{reward.points} points</p>
              <button
                disabled={mockStats.totalPoints < reward.points}
                className={`mt-2 w-full px-4 py-2 rounded-lg text-sm ${
                  mockStats.totalPoints >= reward.points
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Redeem
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
  suffix?: string;
}

function StatCard({ title, value, icon, description, suffix = '' }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
      </div>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-semibold mt-1">
        {value.toLocaleString()}{suffix}
      </p>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  );
}