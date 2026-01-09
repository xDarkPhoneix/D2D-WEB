import { DollarSign, TrendingUp, FileText, Bookmark } from 'lucide-react';

const servicePricing = {
  reels: 25000,
  'paid-ads': 30000,
  seo: 20000,
  website: 50000,
  'offline-shoot': 15000,
  podcast: 35000,
};

const goalMultipliers = {
  awareness: 1.0,
  leads: 1.15,
  sales: 1.3,
  authority: 1.2,
};

const cityTierMultipliers = {
  'tier-1': 1.5,
  'tier-2': 1.2,
  'tier-3': 1.0,
};

const packageTiers = [
  { name: 'Presence', range: [0, 50000], color: 'bg-green-500' },
  { name: 'Growth', range: [50001, 100000], color: 'bg-blue-500' },
  { name: 'Dominance', range: [100001, 200000], color: 'bg-purple-500' },
  { name: 'Custom', range: [200001, Infinity], color: 'bg-orange-500' },
];

const CalculatorResults = ({ data, onSavePlan, onConvertToProposal }) => {
  const calculateCosts = () => {
    let baseTotal = 0;
    const serviceBreakdown = [];

    data.services.forEach((service) => {
      const baseCost = servicePricing[service] || 0;
      let serviceCost = baseCost;

      if (service === 'offline-shoot') {
        serviceCost = baseCost * cityTierMultipliers[data.cityTier];
      }

      serviceBreakdown.push({
        name: service,
        cost: serviceCost,
      });

      baseTotal += serviceCost;
    });

    const goalMultiplier = goalMultipliers[data.monthlyGoal] || 1.0;
    const finalTotal = Math.round(baseTotal * goalMultiplier);

    const reelsService = serviceBreakdown.find((s) => s.name === 'reels');
    const reelsPerMonth = 12;
    const costPerReel = reelsService
      ? Math.round(reelsService.cost / reelsPerMonth)
      : 0;

    const offlineShootService = serviceBreakdown.find(
      (s) => s.name === 'offline-shoot'
    );

    const recommendedPackage =
      packageTiers.find(
        (tier) =>
          finalTotal >= tier.range[0] && finalTotal <= tier.range[1]
      ) || packageTiers[packageTiers.length - 1];

    return {
      finalTotal,
      serviceBreakdown,
      reelsPerMonth,
      costPerReel,
      offlineShootCost: offlineShootService?.cost || 0,
      recommendedPackage,
      goalMultiplier,
    };
  };

  const results = calculateCosts();

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);

  const getServiceName = (serviceKey) => {
    const names = {
      reels: 'Reels / Short-form Content',
      'paid-ads': 'Paid Ads Management',
      seo: 'SEO & Content Marketing',
      website: 'Website / Landing Page',
      'offline-shoot': 'Offline Shoot',
      podcast: 'Podcast Production',
    };
    return names[serviceKey] || serviceKey;
  };

  return (
    <div className="mt-12 space-y-8 animate-fade-in">

      {/* Divider */}
      <div className="border-t-2 border-gray-200"></div>

      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <TrendingUp className="w-4 h-4" />
          Your Custom Estimate
        </div>
      </div>

      {/* Total Cost */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center shadow-2xl">
        <div className="flex items-center justify-center gap-2 mb-2">
          <DollarSign className="w-6 h-6" />
          <span className="text-lg font-medium">Estimated Monthly Investment</span>
        </div>
        <div className="text-5xl md:text-6xl font-bold mb-2">
          {formatCurrency(results.finalTotal)}
        </div>
        <div className="text-blue-100 text-sm">
          Based on {data.services.length} service
          {data.services.length > 1 ? 's' : ''} with{' '}
          {data.monthlyGoal.replace('-', ' ')} focus
        </div>
      </div>

      {/* Service Breakdown */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Service Breakdown
        </h3>
        <div className="space-y-3">
          {results.serviceBreakdown.map((service, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
            >
              <span className="font-medium text-gray-700">
                {getServiceName(service.name)}
              </span>
              <span className="font-bold text-gray-900">
                {formatCurrency(service.cost)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reels Breakdown */}
      {data.services.includes('reels') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
            <div className="text-sm text-purple-700 font-semibold mb-1">
              Cost Per Reel
            </div>
            <div className="text-3xl font-bold text-purple-900">
              {formatCurrency(results.costPerReel)}
            </div>
          </div>
          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
            <div className="text-sm text-purple-700 font-semibold mb-1">
              Reels Per Month
            </div>
            <div className="text-3xl font-bold text-purple-900">
              {results.reelsPerMonth}
            </div>
          </div>
        </div>
      )}

      {/* Offline Shoot */}
      {data.services.includes('offline-shoot') && (
        <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-orange-900 mb-3">
            Offline Shoot Details
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-orange-700 mb-1">
                City Tier:{' '}
                <span className="font-semibold">
                  {data.cityTier.toUpperCase()}
                </span>
              </div>
              <div className="text-sm text-orange-600">
                Multiplier: {cityTierMultipliers[data.cityTier]}x
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-orange-700 mb-1">
                Total Cost
              </div>
              <div className="text-2xl font-bold text-orange-900">
                {formatCurrency(results.offlineShootCost)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Package */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white">
        <h3 className="text-lg font-bold mb-3">
          Recommended Package
        </h3>
        <div
          className={`inline-block px-4 py-2 rounded-lg ${results.recommendedPackage.color} font-bold text-lg`}
        >
          {results.recommendedPackage.name}
        </div>
        <p className="text-sm text-gray-300 mt-2">
          Perfect for your {data.businessType.replace('-', ' ')} in the{' '}
          {data.industry.replace('-', ' ')} industry
        </p>
      </div>

      {/* CTAs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <button
          onClick={onSavePlan}
          className="flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold text-blue-700 bg-blue-100 hover:bg-blue-200 transition-all shadow-md hover:shadow-lg"
        >
          <Bookmark className="w-5 h-5" />
          Save This Plan
        </button>

        <button
          onClick={onConvertToProposal}
          className="flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
        >
          <FileText className="w-5 h-5" />
          Convert to Proposal
        </button>
      </div>

      {/* Disclaimer */}
      <div className="text-center text-sm text-gray-500 italic pt-4">
        All prices are estimates and may vary based on specific requirements.
        Final pricing will be confirmed during consultation.
      </div>
    </div>
  );
};

export default CalculatorResults;
