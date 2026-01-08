import mongoose from 'mongoose';

const DeliverableSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['Reel', 'Post', 'Story', 'Ad', 'Blog', 'Video', 'Podcast', 'Design', 'Other']
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['To-do', 'In Progress', 'Review', 'Live'],
        default: 'To-do'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    completedAt: {
        type: Date
    },
    url: {
        type: String, // Link to the published content
        trim: true
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

const CampaignSchema = new mongoose.Schema({
    // Basic Information
    name: {
        type: String,
        required: true,
        trim: true
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: [
            'Reels',
            'Social Media Management',
            'Ads Management',
            'SEO',
            'Website Development',
            'Podcast',
            'Offline Shoot',
            'Influencer Marketing',
            'Content Writing',
            'Full 360 Strategy',
            'Custom'
        ]
    },
    description: {
        type: String,
        trim: true
    },

    // Timeline
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['To-do', 'In Progress', 'Review', 'Live', 'Completed', 'Cancelled'],
        default: 'To-do'
    },

    // Deliverables
    deliverables: [DeliverableSchema],

    // Team Assignment
    assignedTeam: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    accountManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Budget & Metrics
    budget: {
        type: Number,
        min: 0
    },
    spent: {
        type: Number,
        default: 0,
        min: 0
    },
    reelsCount: {
        type: Number,
        default: 0,
        min: 0
    },
    postsCount: {
        type: Number,
        default: 0,
        min: 0
    },
    targetReach: {
        type: Number,
        min: 0
    },
    actualReach: {
        type: Number,
        default: 0,
        min: 0
    },

    // Additional Details
    platforms: [{
        type: String,
        enum: ['Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'Twitter', 'Google', 'Website', 'Other']
    }],
    goals: [{
        type: String,
        enum: ['Awareness', 'Leads', 'Sales', 'Authority', 'Engagement', 'Traffic']
    }],
    notes: {
        type: String
    }
}, {
    timestamps: true
});

// Indexes for better query performance
CampaignSchema.index({ brandId: 1 });
CampaignSchema.index({ status: 1 });
CampaignSchema.index({ accountManager: 1 });
CampaignSchema.index({ startDate: 1, endDate: 1 });

const Campaign = mongoose.models.Campaign || mongoose.model('Campaign', CampaignSchema);

export default Campaign;
