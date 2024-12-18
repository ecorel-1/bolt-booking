```typescript
import React, { useState } from 'react';
import { Plus, Award, Star, Edit2, Trash2, X } from 'lucide-react';
import { LoadingSpinner } from '../../../common/LoadingSpinner';
import { ErrorAlert } from '../../../common/ErrorAlert';

interface RewardTier {
  id: string;
  name: string;
  pointsRequired: number;
  benefits: string[];
  status: 'active' | 'inactive';
}

interface RewardRule {
  id: string;
  name: string;
  description: string;
  pointsAwarded: number;
  type: 'booking' | 'referral' | 'review' | 'custom';
  status: 'active' | 'inactive';
}

export function ProviderRewardsManagement() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTierModal, setShowTierModal] = useState(false);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState<RewardTier | null>(null);
  const [selectedRule, setSelectedRule] = useState<RewardRule | null>(null);

  // Mock data
  const tiers: RewardTier[] = [
    {
      id: '1',
      name: 'Bronze',
      pointsRequired: 100,
      benefits: ['5% discount on bookings', 'Priority support'],
      status: 'active',
    },
    {
      id: '2',
      name: 'Silver',
      pointsRequired: 500,
      benefits: ['10% discount on bookings', 'Priority support', 'Free upgrades'],
      status: 'active',
    },
    {
      id: '3',
      name: 'Gold',
      pointsRequired: 1000,
      benefits: ['15% discount on bookings', 'VIP support', 'Free upgrades', 'Exclusive events'],
      status: 'active',
    },
  ];

  const rules: RewardRule[] = [
    {
      id: '1',
      name: 'First Booking',
      description: 'Earn points on your first booking',
      pointsAwarded: 100,
      type: 'booking',
      status: 'active',
    },
    {
      id: '2',
      name: 'Referral Bonus',
      description: 'Earn points when you refer a friend',
      pointsAwarded: 50,
      type: 'referral',
      status: 'active',
    },
    {
      id: '3',
      name: 'Review Reward',
      description: 'Earn points for leaving a review',
      pointsAwarded: 25,
      type: 'review',
      status: 'active',
    },
  ];

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="space-y-8">
      {/* Reward Tiers Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Reward Tiers</h2>
          <button
            onClick={() => {
              setSelectedTier(null);
              setShowTierModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Tier
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-600"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{tier.name}</h3>
                  <p className="text-sm text-gray-500">
                    {tier.pointsRequired} points required
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedTier(tier);
                      setShowTierModal(true);
                    }}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      // Handle delete
                    }}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <ul className="space-y-2">
                {tier.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-1" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-4 border-t">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    tier.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {tier.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reward Rules Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Reward Rules</h2>
          <button
            onClick={() => {
              setSelectedRule(null);
              setShowRuleModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Rule
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rules.map((rule) => (
                <tr key={rule.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {rule.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {rule.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {rule.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>{rule.pointsAwarded}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        rule.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {rule.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedRule(rule);
                          setShowRuleModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          // Handle delete
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add modals for creating/editing tiers and rules */}
    </div>
  );
}
```