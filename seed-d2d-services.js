const mongoose = require('mongoose');
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

// Service Schema (same as your model)
const serviceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            trim: true,
        },
        image: {
            type: String,
            trim: true,
        },
        price: {
            type: String,
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

// D2D Social Studio Services - All services from uploaded images
const d2dServices = [
    // TECH & WEB SERVICES
    {
        title: "Bespoke Web Development",
        description: "High-speed, conversion-optimized websites that turn visitors into paying customers.",
        category: "Tech & Web",
        image: "/services6.jpeg",
        price: "Starting from ₹1,00,000",
        isActive: true,
    },
    {
        title: "Business Automation",
        description: "Backend systems that automate your leads, follow-ups, and sales processes.",
        category: "Tech & Web",
        image: "/services7.jpeg",
        price: "Contact for pricing",
        isActive: true,
    },
    {
        title: "Strategic Consulting",
        description: "C-suite level advice on how to scale your digital presence as your company grows.",
        category: "Tech & Web",
        image: "/services8.jpeg",
        price: "Contact for pricing",
        isActive: true,
    },

    // MEDIA & CREATIVE SERVICES
    {
        title: "Narrative Architecture",
        description: "We build your brand's \"Soul\" and \"Story\" so you aren't just another company, but a leader.",
        category: "Media & Creative",
        image: "/services0.jpeg",
        price: "Contact for pricing",
        isActive: true,
    },
    {
        title: "Video Production",
        description: "High-fidelity, cinematic production that makes you look like a top-tier industry expert.",
        category: "Media & Creative",
        image: "/services1.jpeg",
        price: "Contact for pricing",
        isActive: true,
    },
    {
        title: "Creative Strategy",
        description: "The \"Master Plan\" that ensures every post, video, and design serves a business goal.",
        category: "Media & Creative",
        image: "/services2.jpeg",
        price: "Contact for pricing",
        isActive: true,
    },
    {
        title: "Premium Branding",
        description: "Visual identities that resonate with high-ticket audiences.",
        category: "Media & Creative",
        image: "/services9.jpg",
        price: "Contact for pricing",
        isActive: true,
    },

    // GROWTH MARKETING SERVICES
    {
        title: "Paid Ad Campaigns",
        description: "ROI-focused advertising on Meta, Google, and LinkedIn designed to make impact.",
        category: "Growth Marketing",
        image: "/services3.jpeg",
        price: "Starting from ₹50,000",
        isActive: true,
    },
    {
        title: "SEO Mastery",
        description: "Technical and content-based optimization to ensure you own the first page of Google.",
        category: "Growth Marketing",
        image: "/services4.jpeg",
        price: "Starting from ₹30,000/month",
        isActive: true,
    },
    {
        title: "Content Production",
        description: "A high-volume \"Content Engine\" that keeps your brand relevant and top-of-mind daily.",
        category: "Growth Marketing",
        image: "/services5.jpeg",
        price: "Contact for pricing",
        isActive: true,
    },
    {
        title: "AI Creative Studio",
        description: "Leveraging AI to produce hyper-personalized ads and visuals faster and smarter than any traditional agency.",
        category: "Growth Marketing",
        image: "/services9.jpg",
        price: "Contact for pricing",
        isActive: true,
    },
];

// Seed function
const seedServices = async () => {
    try {
        await connectDB();

        console.log('🌱 Starting D2D Social Studio services seed...\n');

        // Clear existing services
        const deleteResult = await Service.deleteMany({});
        console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing services\n`);

        // Insert all services
        const insertedServices = await Service.insertMany(d2dServices);

        console.log(`✅ Successfully seeded ${insertedServices.length} services\n`);

        // Group by category for display
        const categories = ['Tech & Web', 'Media & Creative', 'Growth Marketing'];
        categories.forEach(category => {
            const categoryServices = insertedServices.filter(s => s.category === category);
            console.log(`📁 ${category} (${categoryServices.length} services):`);
            categoryServices.forEach(service => {
                console.log(`   • ${service.title} - ${service.price}`);
            });
            console.log('');
        });

        console.log('🎉 Service seeding completed successfully!\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding services:', error);
        process.exit(1);
    }
};

// Run seed
seedServices();
