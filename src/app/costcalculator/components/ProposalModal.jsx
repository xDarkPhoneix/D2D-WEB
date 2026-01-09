import { X, FileText, CheckCircle, Download } from 'lucide-react';

const ProposalModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleGenerateProposal = () => {
    console.log('=== PROPOSAL DATA ===');
    console.log('Business Type:', data.businessType);
    console.log('Industry:', data.industry);
    console.log('Monthly Goal:', data.monthlyGoal);
    console.log('Services:', data.services);
    console.log('City Tier:', data.cityTier);
    console.log('Timestamp:', new Date().toISOString());
    console.log('====================');

    alert(
      'Proposal data logged to console! In production, this would generate a PDF proposal.'
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <FileText className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Generate Proposal
          </h3>
          <p className="text-gray-600">
            Convert your estimate into a detailed proposal document
          </p>
        </div>

        {/* Proposal Features */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-4">
            Your Proposal Will Include:
          </h4>

          <div className="space-y-3">
            {[
              {
                title: 'Customized Service Breakdown',
                desc: 'Detailed cost analysis for each service',
              },
              {
                title: 'Timeline & Deliverables',
                desc: 'Expected outcomes and milestones',
              },
              {
                title: 'ROI Projections',
                desc: 'Estimated returns on your investment',
              },
              {
                title: 'Case Studies',
                desc: 'Success stories from similar clients',
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-600">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Note */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">i</span>
            </div>
            <div className="text-sm text-blue-900">
              <span className="font-semibold">Note:</span> This is a demo feature.
              In production, this would generate a comprehensive PDF proposal and
              send it to your email.
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleGenerateProposal}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
          >
            <Download className="w-5 h-5" />
            Generate Proposal
          </button>

          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProposalModal;
