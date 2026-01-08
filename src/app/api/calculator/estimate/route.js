import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import PricingRule from '@/app/models/PricingRule.model';

// POST - Calculate pricing estimate
export async function POST(request) {
    try {
        await connectDB();

        const {
            businessType,
            industry,
            city,
            goals,
            services,
            offlineShoot
        } = await request.json();

        // Get active pricing rule
        const pricingRule = await PricingRule.findOne({ isActive: true });

        if (!pricingRule) {
            return NextResponse.json(
                { success: false, error: 'No active pricing rule found' },
                { status: 404 }
            );
        }

        // Calculate costs
        let subtotal = 0;
        const breakdown = [];

        // Get city multiplier
        const cityMultiplier = pricingRule.cityMultipliers.get(city) || 1.0;

        // Calculate service costs
        if (services && Array.isArray(services)) {
            services.forEach(serviceName => {
                const service = pricingRule.services.find(s => s.serviceName === serviceName);
                if (service) {
                    const cost = service.basePrice * cityMultiplier;
                    subtotal += cost;
                    breakdown.push({
                        service: serviceName,
                        basePrice: service.basePrice,
                        cityMultiplier,
                        totalCost: cost,
                        unit: service.unit
                    });
                }
            });
        }

        // Add offline shoot cost if selected
        if (offlineShoot) {
            const shootCost = (pricingRule.offlineShootBase + pricingRule.offlineShootPerDay) * cityMultiplier;
            subtotal += shootCost;
            breakdown.push({
                service: 'Offline Shoot',
                baseCost: pricingRule.offlineShootBase + pricingRule.offlineShootPerDay,
                cityMultiplier,
                totalCost: shootCost,
                unit: 'day'
            });
        }

        // Check for applicable discounts
        let discount = 0;
        let appliedDiscount = null;

        const applicableDiscounts = pricingRule.discounts.filter(d => {
            // Check if discount is valid
            if (d.validFrom && new Date(d.validFrom) > new Date()) return false;
            if (d.validUntil && new Date(d.validUntil) < new Date()) return false;

            // Check discount type matches business type
            if (d.type === 'startup' && businessType?.includes('Startup')) return true;
            if (d.type === 'incubator' && businessType?.includes('Incubation')) return true;
            if (d.type === 'bulk' && subtotal >= (d.minOrderValue || 0)) return true;
            if (d.type === 'seasonal') return true;

            return false;
        });

        if (applicableDiscounts.length > 0) {
            // Apply highest discount
            appliedDiscount = applicableDiscounts.reduce((max, curr) =>
                curr.percentage > max.percentage ? curr : max
            );
            discount = (subtotal * appliedDiscount.percentage) / 100;
        }

        const total = subtotal - discount;

        // Recommend package based on total
        let recommendedPackage = null;
        if (pricingRule.packages && pricingRule.packages.length > 0) {
            // Sort packages by price
            const sortedPackages = [...pricingRule.packages].sort((a, b) =>
                a.monthlyPrice - b.monthlyPrice
            );

            // Find package closest to calculated total
            recommendedPackage = sortedPackages.reduce((closest, pkg) => {
                const currentDiff = Math.abs(pkg.monthlyPrice - total);
                const closestDiff = Math.abs(closest.monthlyPrice - total);
                return currentDiff < closestDiff ? pkg : closest;
            });
        }

        return NextResponse.json({
            success: true,
            data: {
                monthlyEstimate: {
                    subtotal: Math.round(subtotal),
                    discount: Math.round(discount),
                    discountPercentage: appliedDiscount?.percentage || 0,
                    total: Math.round(total)
                },
                breakdown,
                cityMultiplier,
                appliedDiscount: appliedDiscount ? {
                    type: appliedDiscount.type,
                    percentage: appliedDiscount.percentage,
                    conditions: appliedDiscount.conditions
                } : null,
                recommendedPackage: recommendedPackage ? {
                    name: recommendedPackage.packageName,
                    price: recommendedPackage.monthlyPrice,
                    inclusions: recommendedPackage.inclusions,
                    reelsCount: recommendedPackage.reelsCount,
                    postsCount: recommendedPackage.postsCount
                } : null
            }
        });
    } catch (error) {
        console.error('Error calculating estimate:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to calculate estimate' },
            { status: 500 }
        );
    }
}
