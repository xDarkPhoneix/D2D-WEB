import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Brand from '@/app/models/Brand.model';
import { User } from '@/app/models/user.model';

// GET - Get brand details by ID
export async function GET(request, { params }) {
    try {
        await connectDB();

        const { id } = params;

        const brand = await Brand.findById(id)
            .populate('ownerId', 'email organizationName userRole city')
            .populate('accountManager', 'email organizationName');

        if (!brand) {
            return NextResponse.json(
                { success: false, error: 'Brand not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: brand
        });
    } catch (error) {
        console.error('Error fetching brand:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch brand' },
            { status: 500 }
        );
    }
}

// PUT - Update brand details
export async function PUT(request, { params }) {
    try {
        await connectDB();

        const { id } = params;
        const body = await request.json();

        // Remove fields that shouldn't be updated directly
        delete body._id;
        delete body.createdAt;
        delete body.updatedAt;

        const brand = await Brand.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
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
            data: brand
        });
    } catch (error) {
        console.error('Error updating brand:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update brand' },
            { status: 500 }
        );
    }
}

// DELETE - Delete brand (soft delete)
export async function DELETE(request, { params }) {
    try {
        await connectDB();

        const { id } = params;

        // Soft delete by setting status to 'deleted'
        const brand = await Brand.findByIdAndUpdate(
            id,
            { status: 'deleted' },
            { new: true }
        );

        if (!brand) {
            return NextResponse.json(
                { success: false, error: 'Brand not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Brand deleted successfully',
            data: brand
        });
    } catch (error) {
        console.error('Error deleting brand:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete brand' },
            { status: 500 }
        );
    }
}
