const mongoose = require('mongoose');

const MONGODB_URL = "mongodb+srv://d2d:d2d@cluster0.p4itu.mongodb.net/d2d?retryWrites=true&w=majority";

const pricingRuleSchema = new mongoose.Schema({
    ruleName: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    services: [{
        serviceName: String,
        basePrice: Number,
        unitPrice: Number,
        unit: String
    }],
    packages: [{
        packageName: String,
        monthlyPrice: Number,
        includes: [String]
    }],
    cityMultipliers: { type: Map, of: Number },
    offlineShootBase: Number,
    offlineShootPerDay: Number,
    discounts: [{
        condition: String, // '>3_services', 'yearly_contract'
        value: Number, // Percentage or fixed amount
        type: String // 'percentage', 'fixed'
    }]
}, { timestamps: true });

const PricingRule = mongoose.models.PricingRule || mongoose.model('PricingRule', pricingRuleSchema);

async function seed() {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log('Connected to DB');

        // Check if any rule exists
        const existing = await PricingRule.findOne({ isActive: true });
        if (existing) {
            console.log('Active rule already exists. Skipping seed.');
            process.exit(0);
        }

        const newRule = new PricingRule({
            ruleName: "Default 2026 Pricing",
            isActive: true,
            services: [
                { serviceName: "Instagram Reels", basePrice: 3000, unitPrice: 3000, unit: "per reel" },
                { serviceName: "SEO Services", basePrice: 15000, unitPrice: 15000, unit: "per month" },
                { serviceName: "Website Development", basePrice: 25000, unitPrice: 25000, unit: "project" },
                { serviceName: "Google Ads Management", basePrice: 10000, unitPrice: 10000, unit: "per month" },
                { serviceName: "Offline Shoot", basePrice: 15000, unitPrice: 5000, unit: "per day" },
                { serviceName: "Graphic Design", basePrice: 8000, unitPrice: 8000, unit: "per month" }
            ],
            packages: [
                { packageName: "Starter", monthlyPrice: 25000, includes: ["SEO", "4 Reels"] },
                { packageName: "Growth", monthlyPrice: 50000, includes: ["SEO", "8 Reels", "Ads"] },
                { packageName: "Premium", monthlyPrice: 100000, includes: ["All Services"] }
            ],
            cityMultipliers: {
                "Patna": 1.0,
                "Delhi": 1.5,
                "Mumbai": 2.0,
                "Bangalore": 1.8
            },
            offlineShootBase: 10000,
            offlineShootPerDay: 5000,
            discounts: []
        });

        await newRule.save();
        console.log('Seeded default pricing rule successfully!');
    } catch (error) {
        console.error('Error seeding:', error);
    } finally {
        await mongoose.disconnect();
    }
}

seed();
