import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Campaign from '@/app/models/Campaign.model';
import Brand from '@/app/models/Brand.model';

// GET - List all campaigns with filters
export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const brandId = searchParams.get('brandId');
        const accountManager = searchParams.get('accountManager');
        const type = searchParams.get('type');
        const search = searchParams.get('search');

        // Build query
        const query = {};

        if (status) query.status = status;
        if (brandId) query.brandId = brandId;
        if (accountManager) query.accountManager = accountManager;
        if (type) query.type = type;

        // Search by name
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const campaigns = await Campaign.find(query)
            .populate('brandId', 'name category industry')
            .populate('accountManager', 'email organizationName')
            .populate('assignedTeam', 'email organizationName')
            .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            count: campaigns.length,
            data: campaigns
        });
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch campaigns' },
            { status: 500 }
        );
    }
}

// POST - Create new campaign
export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();

        // Validate required fields
        if (!body.name || !body.brandId || !body.type || !body.startDate || !body.endDate || !body.accountManager) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Verify brand exists
        const brand = await Brand.findById(body.brandId);
        if (!brand) {
            return NextResponse.json(
                { success: false, error: 'Brand not found' },
                { status: 404 }
            );
        }

        // Create campaign
        const campaign = await Campaign.create(body);

        const populatedCampaign = await Campaign.findById(campaign._id)
            .populate('brandId', 'name category industry')
            .populate('accountManager', 'email organizationName')
            .populate('assignedTeam', 'email organizationName');

        return NextResponse.json({
            success: true,
            data: populatedCampaign
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating campaign:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create campaign' },
            { status: 500 }
        );
    }
}
