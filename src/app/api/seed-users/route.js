import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/db';
import { User } from '@/app/models/user.model.js';
import bcrypt from 'bcrypt';

export async function POST(req) {
    try {
        await connectDB();

        const dummyUsers = [
            {
                email: 'user@gmail.com',
                password: 'password',
                name: 'Test User',
                role: 'user',
                isVerified: true,
            },
            {
                email: 'admin@gmail.com',
                password: 'password',
                name: 'Test Admin',
                role: 'admin',
                isVerified: true,
            },
        ];

        const results = [];

        for (const userData of dummyUsers) {
            // Check if user already exists
            const existingUser = await User.findOne({ email: userData.email });

            if (existingUser) {
                results.push({
                    email: userData.email,
                    status: 'already exists',
                    role: existingUser.role
                });
                continue;
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(userData.password, 10);

            // Create user
            const user = await User.create({
                ...userData,
                password: hashedPassword,
            });

            results.push({
                email: user.email,
                role: user.role,
                status: 'created successfully',
                isVerified: user.isVerified
            });
        }

        return NextResponse.json({
            success: true,
            message: 'Dummy users processed',
            results,
            loginCredentials: {
                user: { email: 'user@gmail.com', password: 'password' },
                admin: { email: 'admin@gmail.com', password: 'password' }
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Error creating dummy users:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
