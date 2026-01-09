import { Package, MapPin } from 'lucide-react';

const CalculatorInputs = ({ data, onChange, onCalculate, onReset, services, pricingRule }) => {
  // Helper to get icon for service
  const getServiceIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('reel') || lowerName.includes('video')) return '🎬';
    if (lowerName.includes('ad')) return '📊';
    if (lowerName.includes('seo') || lowerName.includes('search')) return '🔍';
    if (lowerName.includes('web')) return '💻';
    if (lowerName.includes('shoot')) return '📸';
    if (lowerName.includes('podcast') || lowerName.includes('audio')) return '🎙️';
    return '✨';
  };

  // Use PricingRule services if available, otherwise fallback to DB services
  const serviceOptions = pricingRule?.services?.map(s => ({
    value: s.serviceName,
    label: s.serviceName,
    icon: getServiceIcon(s.serviceName),
    basePrice: s.basePrice,
    unitPrice: s.unitPrice,
    unit: s.unit // e.g., "per reel", "per month", "per day"
  })) || [];

  if (serviceOptions.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-900">No Services Available</h3>
        <p className="text-gray-500">Please contact the administrator to configure pricing services.</p>
      </div>
    );
  }

  const handleServiceToggle = (serviceName) => {
    const isCurrentlySelected = data.services.includes(serviceName);

    if (isCurrentlySelected) {
      // Remove service and its quantity
      const newServices = data.services.filter((s) => s !== serviceName);
      const newQuantities = { ...data.quantities };
      delete newQuantities[serviceName];
      onChange({ ...data, services: newServices, quantities: newQuantities });
    } else {
      // Add service with default quantity of 1
      const newServices = [...data.services, serviceName];
      const newQuantities = { ...data.quantities, [serviceName]: 1 };
      onChange({ ...data, services: newServices, quantities: newQuantities });
    }
  };

  const handleQuantityChange = (serviceName, quantity) => {
    const newQuantities = { ...data.quantities, [serviceName]: Math.max(1, parseInt(quantity) || 1) };
    onChange({ ...data, quantities: newQuantities });
  };

  const isFormValid = data.services.length > 0;

  // Check if offline shoot is selected
  const hasOfflineShoot = data.services.some(s => s.toLowerCase().includes('offline') || s.toLowerCase().includes('shoot'));

  // Generate city options from pricingRule.cityMultipliers
  const cityOptions = pricingRule?.cityMultipliers
    ? Object.keys(pricingRule.cityMultipliers).map(city => ({
      value: city,
      label: city,
      description: `Multiplier: ${pricingRule.cityMultipliers[city]}x`
    }))
    : [];

  return (
    <div className="space-y-8">

      {/* Services Needed */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
          <Package className="w-4 h-4" />
          Select Services (Select all that apply)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {serviceOptions.map((service) => (
            <button
              key={service.value}
              onClick={() => handleServiceToggle(service.value)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${data.services.includes(service.value)
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

      {/* Quantity Inputs for Selected Services */}
      {data.services.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>📊</span> Configure Service Quantities
          </h3>
          <div className="space-y-4">
            {data.services.map((serviceName) => {
              const serviceInfo = serviceOptions.find(s => s.value === serviceName);
              return (
                <div key={serviceName} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{serviceInfo?.icon || '✨'}</span>
                      <span className="font-medium text-gray-900">{serviceName}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Base: ₹{serviceInfo?.basePrice?.toLocaleString('en-IN') || 0} + ₹{serviceInfo?.unitPrice?.toLocaleString('en-IN') || 0} {serviceInfo?.unit || 'per unit'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Quantity:</label>
                    <input
                      type="number"
                      min="1"
                      value={data.quantities[serviceName] || 1}
                      onChange={(e) => handleQuantityChange(serviceName, e.target.value)}
                      className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-center font-semibold"
                    />
                    <span className="text-sm text-gray-600">{serviceInfo?.unit?.replace('per ', '') || 'units'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* City/Location (Conditional) */}
      {hasOfflineShoot && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <MapPin className="w-4 h-4" />
            Select City for Offline Shoot
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cityOptions.map((city) => (
              <button
                key={city.value}
                // Reuse cityTier field for city name to avoid schema changes
                onClick={() => onChange({ ...data, cityTier: city.value })}
                className={`p-4 rounded-lg border-2 transition-all text-center ${data.cityTier === city.value
                  ? 'border-blue-600 bg-white shadow-md'
                  : 'border-blue-300 bg-white hover:border-blue-500 hover:shadow-sm'
                  }`}
              >
                <div className="font-semibold text-gray-900 mb-1">
                  {city.label}
                </div>
                <div className="text-xs text-gray-600">
                  {city.description}
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
          className={`flex-1 py-4 px-6 rounded-lg font-semibold text-white transition-all ${isFormValid
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
