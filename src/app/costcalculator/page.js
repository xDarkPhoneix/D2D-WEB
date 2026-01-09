"use client"
import { useState, useEffect } from 'react';
import { Calculator, CheckCircle2, TrendingUp, Target, Award } from 'lucide-react';
import CalculatorInputs from './components/CalculatorInputs';
import CalculatorResults from './components/CalculatorResults';
import SavePlanModal from './components/SavePlanModal';
import ProposalModal from './components/ProposalModal';
// import CalculatorInputs from './calculator/CalculatorInputs';
// import CalculatorResults from './calculator/CalculatorResults';
// import SavePlanModal from './calculator/SavePlanModal';
// import ProposalModal from './calculator/ProposalModal';

const CostCalculator = () => {
  const [calculatorData, setCalculatorData] = useState({
    services: [],
    quantities: {}, // { serviceName: quantity }
    cityTier: 'tier-1',
  });

  const [services, setServices] = useState([]);
  const [pricingRule, setPricingRule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, pricingRes] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/admin/pricing/rules?active=true')
        ]);

        const servicesData = await servicesRes.json();
        const pricingData = await pricingRes.json();

        if (servicesData.success) {
          setServices(servicesData.services);
        }

        if (pricingData.success && pricingData.data) {
          setPricingRule(pricingData.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCalculate = () => {
    if (
      calculatorData.services.length > 0
    ) {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setCalculatorData({
      services: [],
      quantities: {},
      cityTier: 'tier-1',
    });
    setShowResults(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Calculator className="w-4 h-4" />
            Cost Calculator
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Estimate Your Marketing Investment
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get an instant cost breakdown tailored to your business needs. No commitment required.
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-sm text-gray-700">Transparent Pricing</span>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
            <TrendingUp className="w-5 h-5 text-blue-500 flex-shrink-0" />
            <span className="text-sm text-gray-700">Flexible Packages</span>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
            <Award className="w-5 h-5 text-purple-500 flex-shrink-0" />
            <span className="text-sm text-gray-700">ROI-Focused Solutions</span>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-8 md:p-12">
            <CalculatorInputs
              data={calculatorData}
              onChange={setCalculatorData}
              onCalculate={handleCalculate}
              onReset={handleReset}
              services={services}
              pricingRule={pricingRule}
            />

            {showResults && (
              <CalculatorResults
                data={calculatorData}
                onSavePlan={() => setShowSaveModal(true)}
                onConvertToProposal={() => setShowProposalModal(true)}
                services={services}
                pricingRule={pricingRule}
              />
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        {!showResults && (
          <div className="text-center mt-12">
            <p className="text-gray-600 flex items-center justify-center gap-2">
              <Target className="w-5 h-5" />
              Fill in the details above to see your customized pricing
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <SavePlanModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
      />

      {/* <ProposalModal
        isOpen={showProposalModal}
        onClose={() => setShowProposalModal(false)}
        data={calculatorData}
      /> */}
    </section>
  );
};

export default CostCalculator;
