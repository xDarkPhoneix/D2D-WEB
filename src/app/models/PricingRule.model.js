import mongoose from 'mongoose';

const ServiceCostSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true
    },
    basePrice: {
        type: Number,
        required: true,
        min: 0
    },
    unitPrice: {
        type: Number, // Per reel/post/hour etc.
        min: 0
    },
    unit: {
        type: String,
        enum: ['reel', 'post', 'story', 'hour', 'day', 'month', 'project']
    }
});

const PackageSchema = new mongoose.Schema({
    packageName: {
        type: String,
        required: true,
        enum: ['Presence', 'Growth', 'Dominance', 'Custom']
    },
    monthlyPrice: {
        type: Number,
        required: true,
        min: 0
    },
    inclusions: [{
        type: String
    }],
    reelsCount: {
        type: Number,
        default: 0
    },
    postsCount: {
        type: Number,
        default: 0
    },
    features: [{
        type: String
    }]
});

const DiscountRuleSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['startup', 'incubator', 'bulk', 'seasonal', 'custom']
    },
    percentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    conditions: {
        type: String // Description of conditions
    },
    minOrderValue: {
        type: Number,
        min: 0
    },
    validFrom: {
        type: Date
    },
    validUntil: {
        type: Date
    }
});

const PricingRuleSchema = new mongoose.Schema({
    // Rule Identification
    ruleName: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },

    // Service Costs
    services: [ServiceCostSchema],

    // Packages
    packages: [PackageSchema],

    // City Multipliers
    cityMultipliers: {
        type: Map,
        of: Number,
        default: {
            'Delhi': 1.2,
            'Mumbai': 1.5,
            'Bangalore': 1.3,
            'Hyderabad': 1.2,
            'Chennai': 1.2,
            'Pune': 1.1,
            'Kolkata': 1.1,
            'Ahmedabad': 1.0,
            'Jaipur': 1.0,
            'Lucknow': 0.9,
            'Other': 1.0
        }
    },

    // Offline Shoot Costs
    offlineShootBase: {
        type: Number,
        default: 5000,
        min: 0
    },
    offlineShootPerDay: {
        type: Number,
        default: 10000,
        min: 0
    },

    // Discount Rules
    discounts: [DiscountRuleSchema],

    // Activation
    isActive: {
        type: Boolean,
        default: true
    },

    // Versioning
    version: {
        type: Number,
        default: 1
    },

    // Notes
    notes: {
        type: String
    }
}, {
    timestamps: true
});

// Ensure only one active pricing rule at a time
PricingRuleSchema.index({ isActive: 1 });

const PricingRule = mongoose.models.PricingRule || mongoose.model('PricingRule', PricingRuleSchema);

export default PricingRule;
