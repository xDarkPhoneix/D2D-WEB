import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/db';
import PricingRule from '@/app/models/PricingRule.model';

export async function GET() {
    try {
        await connectDB();

        // 1. Deactivate existing rules
        await PricingRule.updateMany({}, { isActive: false });

        // 2. Create Default Rule
        const defaultRule = {
            ruleName: "Default 2026 Pricing",
            isActive: true,
            services: [
                { serviceName: "Instagram Reels", basePrice: 3000, unitPrice: 3000, unit: "reel" },
                { serviceName: "SEO Services", basePrice: 15000, unitPrice: 0, unit: "month" },
                { serviceName: "Website Development", basePrice: 25000, unitPrice: 0, unit: "project" },
                { serviceName: "Google Ads Management", basePrice: 10000, unitPrice: 2000, unit: "month" },
                { serviceName: "Offline Shoot", basePrice: 15000, unitPrice: 5000, unit: "day" },
                { serviceName: "Graphic Design", basePrice: 8000, unitPrice: 1000, unit: "month" }
            ],
            packages: [
                { packageName: "Presence", monthlyPrice: 25000, includes: ["SEO", "4 Reels"] },
                { packageName: "Growth", monthlyPrice: 50000, includes: ["SEO", "8 Reels", "Ads"] },
                { packageName: "Dominance", monthlyPrice: 100000, includes: ["All Services"] }
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
        };

        const newRule = await PricingRule.create(defaultRule);

        return NextResponse.json({
            success: true,
            message: "Seeded successfully",
            data: newRule
        });

    } catch (error) {
        console.error("Seeding error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
