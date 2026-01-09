import mongoose from 'mongoose';

const CMSContentSchema = new mongoose.Schema({
    // Section Identification
    sectionType: {
        type: String,
        required: true,
        enum: [
            'hero',
            'usp',
            'process',
            'achievements',
            'brands',
            'discounts',
            'caseStudy',
            'testimonial',
            'faq',
            'custom'
        ]
    },
    sectionKey: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    // Content
    title: {
        type: String,
        trim: true
    },
    subtitle: {
        type: String,
        trim: true
    },
    content: {
        type: mongoose.Schema.Types.Mixed, // Flexible JSON object
        default: {}
    },

    // Media
    images: [{
        url: String,
        alt: String,
        caption: String
    }],
    videos: [{
        url: String,
        thumbnail: String,
        caption: String
    }],

    // For Achievements Section
    counters: [{
        label: String,
        value: Number,
        icon: String
    }],

    // For Brands Section
    brandLogos: [{
        name: String,
        logoUrl: String,
        websiteUrl: String,
        caseStudyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CMSContent'
        }
    }],

    // For Discounts/Programs Section
    programs: [{
        title: String,
        description: String,
        discount: String,
        eligibility: String,
        ctaText: String,
        ctaLink: String
    }],

    // For Process/Steps Section
    steps: [{
        stepNumber: Number,
        title: String,
        description: String,
        icon: String
    }],

    // For USP Section
    usps: [{
        title: String,
        description: String,
        icon: String
    }],

    // For Case Study
    caseStudy: {
        brandName: String,
        industry: String,
        challenge: String,
        solution: String,
        results: [{
            metric: String,
            value: String
        }],
        testimonial: {
            quote: String,
            author: String,
            position: String,
            companyLogo: String
        }
    },

    // Display Control
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },

    // Category-specific content
    categoryContent: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        default: new Map()
    },

    // Meta Data
    metaTitle: String,
    metaDescription: String,
    tags: [String],

    // Notes
    notes: {
        type: String
    }
}, {
    timestamps: true
});

// Indexes for better query performance
CMSContentSchema.index({ sectionType: 1 });
CMSContentSchema.index({ isActive: 1 });
CMSContentSchema.index({ order: 1 });

const CMSContent = mongoose.models.CMSContent || mongoose.model('CMSContent', CMSContentSchema);

export default CMSContent;
