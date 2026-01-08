import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Campaign from '@/app/models/Campaign.model';

// GET - Get campaign details by ID
export async function GET(request, { params }) {
    try {
        await connectDB();

        const { id } = params;

        const campaign = await Campaign.findById(id)
            .populate('brandId', 'name category industry email primaryContact')
            .populate('accountManager', 'email organizationName')
            .populate('assignedTeam', 'email organizationName')
            .populate('deliverables.assignedTo', 'email organizationName');

        if (!campaign) {
            return NextResponse.json(
                { success: false, error: 'Campaign not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: campaign
        });
    } catch (error) {
        console.error('Error fetching campaign:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch campaign' },
            { status: 500 }
        );
    }
}

// PUT - Update campaign details
export async function PUT(request, { params }) {
    try {
        await connectDB();

        const { id } = params;
        const body = await request.json();

        // Remove fields that shouldn't be updated directly
        delete body._id;
        delete body.createdAt;
        delete body.updatedAt;

        const campaign = await Campaign.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        )
            .populate('brandId', 'name category industry')
            .populate('accountManager', 'email organizationName')
            .populate('assignedTeam', 'email organizationName');

        if (!campaign) {
            return NextResponse.json(
                { success: false, error: 'Campaign not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: campaign
        });
    } catch (error) {
        console.error('Error updating campaign:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update campaign' },
            { status: 500 }
        );
    }
}

// DELETE - Delete campaign
export async function DELETE(request, { params }) {
    try {
        await connectDB();

        const { id } = params;

        const campaign = await Campaign.findByIdAndUpdate(
            id,
            { status: 'Cancelled' },
            { new: true }
        );

        if (!campaign) {
            return NextResponse.json(
                { success: false, error: 'Campaign not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Campaign cancelled successfully',
            data: campaign
        });
    } catch (error) {
        console.error('Error deleting campaign:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete campaign' },
            { status: 500 }
        );
    }
}
