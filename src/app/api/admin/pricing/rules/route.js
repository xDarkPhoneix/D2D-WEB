import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import PricingRule from '@/app/models/PricingRule.model';

// GET - Get active pricing rule or all rules
export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const active = searchParams.get('active');

        let rules;
        if (active === 'true') {
            rules = await PricingRule.findOne({ isActive: true });
        } else {
            rules = await PricingRule.find().sort({ createdAt: -1 });
        }

        return NextResponse.json({
            success: true,
            data: rules
        });
    } catch (error) {
        console.error('Error fetching pricing rules:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch pricing rules' },
            { status: 500 }
        );
    }
}

// POST - Create new pricing rule
export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();

        if (!body.ruleName) {
            return NextResponse.json(
                { success: false, error: 'Rule name is required' },
                { status: 400 }
            );
        }

        // If this is to be active, deactivate all others
        if (body.isActive) {
            await PricingRule.updateMany({}, { isActive: false });
        }

        const rule = await PricingRule.create(body);

        return NextResponse.json({
            success: true,
            data: rule
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating pricing rule:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create pricing rule' },
            { status: 500 }
        );
    }
}

// PUT - Update pricing rule
export async function PUT(request) {
    try {
        await connectDB();

        const { id, updates } = await request.json();

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'Rule ID is required' },
                { status: 400 }
            );
        }

        // If activating this rule, deactivate all others
        if (updates.isActive) {
            await PricingRule.updateMany({ _id: { $ne: id } }, { isActive: false });
        }

        const rule = await PricingRule.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        );

        if (!rule) {
            return NextResponse.json(
                { success: false, error: 'Pricing rule not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: rule
        });
    } catch (error) {
        console.error('Error updating pricing rule:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update pricing rule' },
            { status: 500 }
        );
    }
}

// DELETE - Delete pricing rule
export async function DELETE(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'Rule ID is required' },
                { status: 400 }
            );
        }

        const rule = await PricingRule.findByIdAndDelete(id);

        if (!rule) {
            return NextResponse.json(
                { success: false, error: 'Pricing rule not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Pricing rule deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting pricing rule:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete pricing rule' },
            { status: 500 }
        );
    }
}
