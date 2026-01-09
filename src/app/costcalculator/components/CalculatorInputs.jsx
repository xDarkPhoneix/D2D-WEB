import { Building2, Briefcase, Target, Package, MapPin } from 'lucide-react';

const businessTypes = [
  { value: 'startup', label: 'Startup' },
  { value: 'local-business', label: 'Local Business' },
  { value: 'sme', label: 'SME' },
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'personal-brand', label: 'Personal Brand' },
];

const industries = [
  { value: 'food-beverage', label: 'Food & Beverage' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'fashion', label: 'Fashion & Lifestyle' },
  { value: 'tech', label: 'Technology' },
  { value: 'fitness', label: 'Fitness & Wellness' },
  { value: 'finance', label: 'Finance & Consulting' },
  { value: 'hospitality', label: 'Hospitality & Tourism' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'other', label: 'Other' },
];

const monthlyGoals = [
  { value: 'awareness', label: 'Brand Awareness', description: 'Increase visibility & reach' },
  { value: 'leads', label: 'Generate Leads', description: 'Capture potential customers' },
  { value: 'sales', label: 'Drive Sales', description: 'Convert & close deals' },
  { value: 'authority', label: 'Build Authority', description: 'Establish thought leadership' },
];

const services = [
  { value: 'reels', label: 'Reels / Short-form Content', icon: '🎬' },
  { value: 'paid-ads', label: 'Paid Ads Management', icon: '📊' },
  { value: 'seo', label: 'SEO & Content Marketing', icon: '🔍' },
  { value: 'website', label: 'Website / Landing Page', icon: '💻' },
  { value: 'offline-shoot', label: 'Offline Shoot', icon: '📸' },
  { value: 'podcast', label: 'Podcast Production', icon: '🎙️' },
];

const cityTiers = [
  { value: 'tier-1', label: 'Tier 1', description: 'Mumbai, Delhi, Bangalore' },
  { value: 'tier-2', label: 'Tier 2', description: 'Pune, Jaipur, Chandigarh' },
  { value: 'tier-3', label: 'Tier 3', description: 'Other Cities' },
];

const CalculatorInputs = ({ data, onChange, onCalculate, onReset }) => {
  const handleServiceToggle = (service) => {
    const newServices = data.services.includes(service)
      ? data.services.filter((s) => s !== service)
      : [...data.services, service];

    onChange({ ...data, services: newServices });
  };

  const isFormValid =
    data.businessType &&
    data.industry &&
    data.monthlyGoal &&
    data.services.length > 0;

  const hasOfflineShoot = data.services.includes('offline-shoot');

  return (
    <div className="space-y-8">

      {/* Business Type & Industry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <Building2 className="w-4 h-4" />
            Business Type
          </label>
          <select
            value={data.businessType}
            onChange={(e) => onChange({ ...data, businessType: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-900 bg-white"
          >
            <option value="">Select business type</option>
            {businessTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <Briefcase className="w-4 h-4" />
            Industry
          </label>
          <select
            value={data.industry}
            onChange={(e) => onChange({ ...data, industry: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-900 bg-white"
          >
            <option value="">Select industry</option>
            {industries.map((industry) => (
              <option key={industry.value} value={industry.value}>
                {industry.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Monthly Goal */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
          <Target className="w-4 h-4" />
          Monthly Goal
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {monthlyGoals.map((goal) => (
            <button
              key={goal.value}
              onClick={() => onChange({ ...data, monthlyGoal: goal.value })}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                data.monthlyGoal === goal.value
                  ? 'border-blue-500 bg-blue-50 shadow-md scale-105'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
              }`}
            >
              <div className="font-semibold text-gray-900 mb-1">{goal.label}</div>
              <div className="text-xs text-gray-600">{goal.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Services Needed */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
          <Package className="w-4 h-4" />
          Services Needed (Select all that apply)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <button
              key={service.value}
              onClick={() => handleServiceToggle(service.value)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                data.services.includes(service.value)
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{service.icon}</span>
                <span className="font-medium text-gray-900 text-sm">
                  {service.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* City Tier (Conditional) */}
      {hasOfflineShoot && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <MapPin className="w-4 h-4" />
            Select City Tier for Offline Shoot
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cityTiers.map((tier) => (
              <button
                key={tier.value}
                onClick={() => onChange({ ...data, cityTier: tier.value })}
                className={`p-4 rounded-lg border-2 transition-all text-center ${
                  data.cityTier === tier.value
                    ? 'border-blue-600 bg-white shadow-md'
                    : 'border-blue-300 bg-white hover:border-blue-500 hover:shadow-sm'
                }`}
              >
                <div className="font-semibold text-gray-900 mb-1">
                  {tier.label}
                </div>
                <div className="text-xs text-gray-600">
                  {tier.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-gray-100">
        <button
          onClick={onCalculate}
          disabled={!isFormValid}
          className={`flex-1 py-4 px-6 rounded-lg font-semibold text-white transition-all ${
            isFormValid
              ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Calculate My Cost
        </button>

        <button
          onClick={onReset}
          className="px-6 py-4 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CalculatorInputs;
