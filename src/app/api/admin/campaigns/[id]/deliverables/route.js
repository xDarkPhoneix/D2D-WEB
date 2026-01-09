import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Campaign from '@/app/models/Campaign.model';

// GET - Get campaign deliverables
export async function GET(request, { params }) {
    try {
        await connectDB();

        const { id } = params;

        const campaign = await Campaign.findById(id)
            .select('deliverables')
            .populate('deliverables.assignedTo', 'email organizationName');

        if (!campaign) {
            return NextResponse.json(
                { success: false, error: 'Campaign not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: campaign.deliverables
        });
    } catch (error) {
        console.error('Error fetching deliverables:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch deliverables' },
            { status: 500 }
        );
    }
}

// POST - Add new deliverable
export async function POST(request, { params }) {
    try {
        await connectDB();

        const { id } = params;
        const deliverable = await request.json();

        if (!deliverable.type || !deliverable.description || !deliverable.dueDate) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields: type, description, dueDate' },
                { status: 400 }
            );
        }

        const campaign = await Campaign.findByIdAndUpdate(
            id,
            { $push: { deliverables: deliverable } },
            { new: true }
        ).populate('deliverables.assignedTo', 'email organizationName');

        if (!campaign) {
            return NextResponse.json(
                { success: false, error: 'Campaign not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Deliverable added successfully',
            data: campaign.deliverables
        });
    } catch (error) {
        console.error('Error adding deliverable:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to add deliverable' },
            { status: 500 }
        );
    }
}

// PUT - Update deliverable status or details
export async function PUT(request, { params }) {
    try {
        await connectDB();

        const { id } = params;
        const { deliverableId, updates } = await request.json();

        if (!deliverableId) {
            return NextResponse.json(
                { success: false, error: 'Deliverable ID is required' },
                { status: 400 }
            );
        }

        // Build update query for specific deliverable
        const updateFields = {};
        Object.keys(updates).forEach(key => {
            updateFields[`deliverables.$.${key}`] = updates[key];
        });

        // If status is being set to 'Live', update completedAt
        if (updates.status === 'Live') {
            updateFields['deliverables.$.completedAt'] = new Date();
        }

        const campaign = await Campaign.findOneAndUpdate(
            { _id: id, 'deliverables._id': deliverableId },
            { $set: updateFields },
            { new: true }
        ).populate('deliverables.assignedTo', 'email organizationName');

        if (!campaign) {
            return NextResponse.json(
                { success: false, error: 'Campaign or deliverable not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Deliverable updated successfully',
            data: campaign.deliverables
        });
    } catch (error) {
        console.error('Error updating deliverable:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update deliverable' },
            { status: 500 }
        );
    }
}
