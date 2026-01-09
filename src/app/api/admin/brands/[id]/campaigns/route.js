import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Campaign from '@/app/models/Campaign.model';

// GET - Get all campaigns for a specific brand
export async function GET(request, { params }) {
    try {
        await connectDB();

        const { id } = params;

        const campaigns = await Campaign.find({ brandId: id })
            .populate('accountManager', 'email organizationName')
            .populate('assignedTeam', 'email organizationName')
            .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            count: campaigns.length,
            data: campaigns
        });
    } catch (error) {
        console.error('Error fetching brand campaigns:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch campaigns' },
            { status: 500 }
        );
    }
}
