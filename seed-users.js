const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

// Load environment variables manually
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            const value = valueParts.join('=').trim();
            process.env[key.trim()] = value;
        }
    });
}

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        process.exit(1);
    }
};

// User Schema (same as your model)
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, default: '' },
    name: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Dummy users data
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
        isVerified: true, // Admin is verified so they can access dashboard
    },
];

// Seed function
const seedUsers = async () => {
    try {
        await connectDB();

        console.log('🌱 Starting user seed...\n');

        // Clear existing test users (optional - comment out if you want to keep other users)
        const existingEmails = dummyUsers.map(u => u.email);
        await User.deleteMany({ email: { $in: existingEmails } });
        console.log('🗑️  Cleared existing test users\n');

        // Hash passwords and create users
        for (const userData of dummyUsers) {
            const hashedPassword = await bcrypt.hash(userData.password, 10);

            const user = await User.create({
                ...userData,
                password: hashedPassword,
            });

            console.log(`✅ Created ${user.role}: ${user.email}`);
            console.log(`   Password: ${userData.password}`);
            console.log(`   Verified: ${user.isVerified}\n`);
        }

        console.log('🎉 User seeding completed successfully!\n');
        console.log('📋 Login Credentials:');
        console.log('─────────────────────────────────');
        console.log('Regular User:');
        console.log('  Email: user@gmail.com');
        console.log('  Password: password\n');
        console.log('Admin User:');
        console.log('  Email: admin@gmail.com');
        console.log('  Password: password');
        console.log('─────────────────────────────────\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding users:', error);
        process.exit(1);
    }
};

// Run seed
seedUsers();
