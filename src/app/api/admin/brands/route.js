import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Brand from '@/app/models/Brand.model';
import { User } from '@/app/models/user.model';

// GET - List all brands with filters
export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const category = searchParams.get('category');
        const industry = searchParams.get('industry');
        const ownerId = searchParams.get('ownerId');
        const accountManager = searchParams.get('accountManager');
        const search = searchParams.get('search');

        // Build query
        const query = {};

        if (status) query.status = status;
        if (category) query.category = category;
        if (industry) query.industry = industry;
        if (ownerId) query.ownerId = ownerId;
        if (accountManager) query.accountManager = accountManager;

        // Search by name or email
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { primaryContact: { $regex: search, $options: 'i' } }
            ];
        }

        const brands = await Brand.find(query)
            .populate('ownerId', 'email organizationName')
            .populate('accountManager', 'email organizationName')
            .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            count: brands.length,
            data: brands
        });
    } catch (error) {
        console.error('Error fetching brands:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch brands' },
            { status: 500 }
        );
    }
}

// POST - Create new brand
export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();

        // Validate required fields
        if (!body.name || !body.email || !body.ownerId || !body.category || !body.industry) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields: name, email, ownerId, category, industry' },
                { status: 400 }
            );
        }

        // Verify owner exists
        const owner = await User.findById(body.ownerId);
        if (!owner) {
            return NextResponse.json(
                { success: false, error: 'Owner not found' },
                { status: 404 }
            );
        }

        // Create brand
        const brand = await Brand.create(body);

        // Update user's brands array
        await User.findByIdAndUpdate(
            body.ownerId,
            {
                $push: { brands: brand._id },
                ownsBrand: true
            }
        );

        const populatedBrand = await Brand.findById(brand._id)
            .populate('ownerId', 'email organizationName')
            .populate('accountManager', 'email organizationName');

        return NextResponse.json({
            success: true,
            data: populatedBrand
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating brand:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create brand' },
            { status: 500 }
        );
    }
}
