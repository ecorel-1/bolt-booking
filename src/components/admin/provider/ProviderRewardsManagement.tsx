```typescript
// Previous imports remain the same...

interface TierFormData {
  name: string;
  pointsRequired: number;
  benefits: string[];
  status: 'active' | 'inactive';
}

interface RuleFormData {
  name: string;
  description: string;
  pointsAwarded: number;
  type: 'booking' | 'referral' | 'review' | 'custom';
  status: 'active' | 'inactive';
}

export function ProviderRewardsManagement() {
  // Previous state declarations remain the same...
  const [tierFormData, setTierFormData] = useState<TierFormData>({
    name: '',
    pointsRequired: 0,
    benefits: [''],
    status: 'active',
  });

  const [ruleFormData, setRuleFormData] = useState<RuleFormData>({
    name: '',
    description: '',
    pointsAwarded: 0,
    type: 'booking',
    status: 'active',
  });

  // Initialize form data when editing
  useEffect(() => {
    if (selectedTier) {
      setTierFormData({
        name: selectedTier.name,
        pointsRequired: selectedTier.pointsRequired,
        benefits: selectedTier.benefits,
        status: selectedTier.status,
      });
    } else {
      setTierFormData({
        name: '',
        pointsRequired: 0,
        benefits: [''],
        status: 'active',
      });
    }
  }, [selectedTier]);

  useEffect(() => {
    if (selectedRule) {
      setRuleFormData({
        name: selectedRule.name,
        description: selectedRule.description,
        pointsAwarded: selectedRule.pointsAwarded,
        type: selectedRule.type,
        status: selectedRule.status,
      });
    } else {
      setRuleFormData({
        name: '',
        description: '',
        pointsAwarded: 0,
        type: 'booking',
        status: 'active',
      });
    }
  }, [selectedRule]);

  const handleAddBenefit = () => {
    setTierFormData({
      ...tierFormData,
      benefits: [...tierFormData.benefits, ''],
    });
  };

  const handleRemoveBenefit = (index: number) => {
    setTierFormData({
      ...tierFormData,
      benefits: tierFormData.benefits.filter((_, i) => i !== index),
    });
  };

  const handleBenefitChange = (index: number, value: string) => {
    const newBenefits = [...tierFormData.benefits];
    newBenefits[index] = value;
    setTierFormData({
      ...tierFormData,
      benefits: newBenefits,
    });
  };

  const handleTierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle tier creation/update logic here
    setShowTierModal(false);
  };

  const handleRuleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle rule creation/update logic here
    setShowRuleModal(false);
  };

  // Previous JSX until the modals...

  {/* Updated Tier Modal */}
  {showTierModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {selectedTier ? 'Edit Reward Tier' : 'Add Reward Tier'}
          </h3>
          <button
            onClick={() => setShowTierModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleTierSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tier Name
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={tierFormData.name}
              onChange={(e) => setTierFormData({ ...tierFormData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Points Required
            </label>
            <input
              type="number"
              required
              min="0"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={tierFormData.pointsRequired}
              onChange={(e) => setTierFormData({ ...tierFormData, pointsRequired: parseInt(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Benefits
            </label>
            <div className="space-y-2">
              {tierFormData.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    required
                    className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={benefit}
                    onChange={(e) => handleBenefitChange(index, e.target.value)}
                    placeholder="Enter benefit"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveBenefit(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddBenefit}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md"
              >
                <Plus className="h-4 w-4" />
                Add Benefit
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={tierFormData.status}
              onChange={(e) => setTierFormData({ ...tierFormData, status: e.target.value as 'active' | 'inactive' })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setShowTierModal(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {selectedTier ? 'Update' : 'Create'} Tier
            </button>
          </div>
        </form>
      </div>
    </div>
  )}

  {/* Updated Rule Modal */}
  {showRuleModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {selectedRule ? 'Edit Reward Rule' : 'Add Reward Rule'}
          </h3>
          <button
            onClick={() => setShowRuleModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleRuleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rule Name
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={ruleFormData.name}
              onChange={(e) => setRuleFormData({ ...ruleFormData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              value={ruleFormData.description}
              onChange={(e) => setRuleFormData({ ...ruleFormData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Points Awarded
            </label>
            <input
              type="number"
              required
              min="0"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={ruleFormData.pointsAwarded}
              onChange={(e) => setRuleFormData({ ...ruleFormData, pointsAwarded: parseInt(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rule Type
            </label>
            <select
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={ruleFormData.type}
              onChange={(e) => setRuleFormData({ ...ruleFormData, type: e.target.value as 'booking' | 'referral' | 'review' | 'custom' })}
            >
              <option value="booking">Booking</option>
              <option value="referral">Referral</option>
              <option value="review">Review</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={ruleFormData.status}
              onChange={(e) => setRuleFormData({ ...ruleFormData, status: e.target.value as 'active' | 'inactive' })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setShowRuleModal(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {selectedRule ? 'Update' : 'Create'} Rule
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
```