import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Brand from '@/app/models/Brand.model';
import { User } from '@/app/models/user.model';

// PUT - Assign account manager to brand
export async function PUT(request, { params }) {
    try {
        await connectDB();

        const { id } = params;
        const { managerId } = await request.json();

        if (!managerId) {
            return NextResponse.json(
                { success: false, error: 'Manager ID is required' },
                { status: 400 }
            );
        }

        // Verify manager exists and is admin/projectmanager
        const manager = await User.findById(managerId);
        if (!manager) {
            return NextResponse.json(
                { success: false, error: 'Manager not found' },
                { status: 404 }
            );
        }

        if (!['admin', 'projectmanager', 'superadmin'].includes(manager.role)) {
            return NextResponse.json(
                { success: false, error: 'User cannot be assigned as account manager' },
                { status: 400 }
            );
        }

        // Update brand
        const brand = await Brand.findByIdAndUpdate(
            id,
            { accountManager: managerId },
            { new: true }
        )
            .populate('ownerId', 'email organizationName')
            .populate('accountManager', 'email organizationName');

        if (!brand) {
            return NextResponse.json(
                { success: false, error: 'Brand not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Account manager assigned successfully',
            data: brand
        });
    } catch (error) {
        console.error('Error assigning manager:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to assign account manager' },
            { status: 500 }
        );
    }
}
