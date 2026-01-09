import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema({
    // Basic Information
    name: {
        type: String,
        required: true,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    logo: {
        type: String, // URL to logo image
        trim: true
    },
    industry: {
        type: String,
        required: true,
        enum: [
            'Technology',
            'Retail',
            'Food & Beverage',
            'Healthcare',
            'Education',
            'Finance',
            'Manufacturing',
            'E-commerce',
            'Hospitality',
            'Real Estate',
            'Media & Entertainment',
            'Agriculture',
            'Dairy & FMCG',
            'Services',
            'Other'
        ]
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Startup Founder / Business Owner',
            'Cafe / Restaurant / Retail Brand',
            'D2C / E-commerce Brand',
            'Dairy / FMCG / Manufacturing Brand',
            'Incubation Centre / Accelerator / E-Cell',
            'Government Body / Institution / University',
            'Personal Brand / Founder / CXO'
        ]
    },

    // Contact Information
    primaryContact: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },

    // Social Media Handles
    socialHandles: {
        instagram: { type: String, trim: true },
        facebook: { type: String, trim: true },
        linkedin: { type: String, trim: true },
        youtube: { type: String, trim: true },
        twitter: { type: String, trim: true }
    },

    // Business Details
    teamSize: {
        type: String,
        enum: ['1-10', '11-50', '51-200', '201-500', '500+']
    },
    monthlyBudget: {
        type: String,
        enum: [
            'Less than ₹50,000',
            '₹50,000 - ₹1,00,000',
            '₹1,00,000 - ₹2,50,000',
            '₹2,50,000 - ₹5,00,000',
            'Above ₹5,00,000'
        ]
    },
    challenges: [{
        type: String
    }],

    // Management & Ownership
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    accountManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['lead', 'active', 'paused', 'deleted'],
        default: 'lead'
    },

    // Customization Settings
    dashboardWidgets: [{
        type: String,
        enum: [
            'analytics',
            'localSEO',
            'reels',
            'influencer',
            'pitchBranding',
            'founderContent',
            'linkedInFocus',
            'programCampaigns',
            'cohortTracking',
            'offlineShoot',
            'distributionMapping'
        ]
    }],
    preferredServices: [{
        type: String
    }],

    // Additional Notes
    notes: {
        type: String
    }
}, {
    timestamps: true
});

// Indexes for better query performance
BrandSchema.index({ ownerId: 1 });
BrandSchema.index({ accountManager: 1 });
BrandSchema.index({ status: 1 });
BrandSchema.index({ category: 1 });
BrandSchema.index({ industry: 1 });

const Brand = mongoose.models.Brand || mongoose.model('Brand', BrandSchema);

export default Brand;
