import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Campaign from '@/app/models/Campaign.model';
import { User } from '@/app/models/user.model';

// PUT - Update team assignments
export async function PUT(request, { params }) {
    try {
        await connectDB();

        const { id } = params;
        const { assignedTeam, accountManager } = await request.json();

        const updates = {};

        // Verify team members exist if provided
        if (assignedTeam && Array.isArray(assignedTeam)) {
            const teamMembers = await User.find({ _id: { $in: assignedTeam } });
            if (teamMembers.length !== assignedTeam.length) {
                return NextResponse.json(
                    { success: false, error: 'Some team members not found' },
                    { status: 404 }
                );
            }
            updates.assignedTeam = assignedTeam;
        }

        // Verify account manager exists if provided
        if (accountManager) {
            const manager = await User.findById(accountManager);
            if (!manager) {
                return NextResponse.json(
                    { success: false, error: 'Account manager not found' },
                    { status: 404 }
                );
            }
            updates.accountManager = accountManager;
        }

        const campaign = await Campaign.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        )
            .populate('assignedTeam', 'email organizationName')
            .populate('accountManager', 'email organizationName');

        if (!campaign) {
            return NextResponse.json(
                { success: false, error: 'Campaign not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Team assignments updated successfully',
            data: campaign
        });
    } catch (error) {
        console.error('Error updating team:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update team assignments' },
            { status: 500 }
        );
    }
}
