import { DollarSign, TrendingUp, FileText, Bookmark } from 'lucide-react';

const CalculatorResults = ({ data, onSavePlan, onConvertToProposal, services, pricingRule }) => {
  const calculateCosts = () => {
    let baseTotal = 0;
    const serviceBreakdown = [];

    data.services.forEach((serviceName) => {
      // Find service in pricingRule
      const serviceData = pricingRule?.services?.find(s => s.serviceName === serviceName);
      if (!serviceData) return;

      const quantity = data.quantities?.[serviceName] || 1;

      // Calculate: basePrice + (quantity * unitPrice)
      let serviceCost = serviceData.basePrice + (quantity * serviceData.unitPrice);

      // Offline shoot multiplier logic
      if (serviceName.toLowerCase().includes('offline') || serviceName.toLowerCase().includes('shoot')) {
        const multiplier = pricingRule?.cityMultipliers?.[data.cityTier] || 1.0;
        serviceCost = serviceCost * multiplier;
      }

      serviceBreakdown.push({
        name: serviceName,
        cost: serviceCost,
        quantity: quantity,
        unit: serviceData.unit
      });

      baseTotal += serviceCost;
    });

    const finalTotal = Math.round(baseTotal);

    const reelsService = serviceBreakdown.find((s) => s.name.toLowerCase().includes('reel'));
    const costPerReel = reelsService?.quantity > 0
      ? Math.round(reelsService.cost / reelsService.quantity)
      : 0;

    const offlineShootService = serviceBreakdown.find(
      (s) => s.name.toLowerCase().includes('offline') || s.name.toLowerCase().includes('shoot')
    );

    // Dynamic Package Recommendation
    // Sort packages by price
    const packages = pricingRule?.packages?.slice().sort((a, b) => a.monthlyPrice - b.monthlyPrice) || [];

    // Find a package that is close to the final total
    // Default to the highest package if total exceeds all, or 'Custom'
    let recommendedPackage = packages.find(p => p.monthlyPrice >= finalTotal);

    if (!recommendedPackage) {
      // If total is higher than all packages, suggest Custom or the highest tier
      recommendedPackage = { name: 'Custom', monthlyPrice: finalTotal, color: 'bg-orange-500' };
    } else {
      // Add color property for UI consistency
      const index = packages.indexOf(recommendedPackage);
      const colors = ['bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-orange-500'];
      recommendedPackage = {
        ...recommendedPackage,
        name: recommendedPackage.packageName,
        color: colors[index % colors.length]
      };
    }

    return {
      finalTotal,
      serviceBreakdown,
      costPerReel,
      offlineShootCost: offlineShootService?.cost || 0,
      recommendedPackage,
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
    // In dynamic mode, serviceKey IS the service name
    return serviceKey;
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
          Based on {data.services.length} selected service
          {data.services.length > 1 ? 's' : ''}
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
              <div>
                <div className="font-medium text-gray-900">
                  {getServiceName(service.name)}
                </div>
                {service.quantity > 1 && (
                  <div className="text-sm text-gray-600">
                    {service.quantity} {service.unit?.replace('per ', '') || 'units'}
                  </div>
                )}
              </div>
              <span className="font-bold text-gray-900">
                {formatCurrency(service.cost)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reels Breakdown */}
      {data.services.some(s => s.toLowerCase().includes('reel')) && (
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
              Total Reels
            </div>
            <div className="text-3xl font-bold text-purple-900">
              {results.serviceBreakdown.find(s => s.name.toLowerCase().includes('reel'))?.quantity || 0}
            </div>
          </div>
        </div>
      )}

      {/* Offline Shoot */}
      {data.services.some(s => s.toLowerCase().includes('offline') || s.toLowerCase().includes('shoot')) && (
        <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-orange-900 mb-3">
            Offline Shoot Details
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-orange-700 mb-1">
                City:{' '}
                <span className="font-semibold">
                  {data.cityTier}
                </span>
              </div>
              <div className="text-sm text-orange-600">
                Multiplier: {pricingRule?.cityMultipliers?.[data.cityTier] || '1.0'}x
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
          Perfect for your marketing needs
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
