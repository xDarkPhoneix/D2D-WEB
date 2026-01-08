// Simple script to create dummy services for testing
// Run with: node create-dummy-services.js

import { connectDB } from "./src/app/lib/db.js";
import { Service } from "./src/app/models/Service.model.js";

const dummyServices = [
    {
        title: "Logo Design Package",
        description:
            "Professional logo design with 3 concepts, unlimited revisions, and brand guidelines. Get a memorable logo that represents your brand identity perfectly.",
        category: "Branding & Design",
        image: "/services0.jpeg",
        price: "₹15,000 - ₹25,000",
        isActive: true,
    },
    {
        title: "Social Media Management",
        description:
            "Monthly social media management including content creation, posting schedule, engagement, and analytics reporting for Instagram, Facebook, and LinkedIn.",
        category: "Social Media",
        image: "/services1.jpeg",
        price: "₹20,000/month",
        isActive: true,
    },
    {
        title: "Email Marketing Campaign",
        description:
            "Design and execute targeted email marketing campaigns with professional templates, automation setup, and performance tracking to boost conversions.",
        category: "Digital Marketing",
        image: "/services3.jpeg",
        price: "₹12,000 - ₹30,000",
        isActive: true,
    },
    {
        title: "Mobile App Development",
        description:
            "Custom mobile app development for iOS and Android. Modern UI/UX design, cloud integration, and post-launch support included.",
        category: "App Development",
        image: "/services6.jpeg",
        price: "₹2,50,000+",
        isActive: true,
    },
    {
        title: "Content Writing Services",
        description:
            "Professional content writing for blogs, websites, and social media. SEO-optimized, engaging content that drives traffic and conversions.",
        category: "Content Creation",
        image: "/services5.jpeg",
        price: "₹2,500 - ₹5,000 per article",
        isActive: true,
    },
];

async function createDummyServices() {
    try {
        await connectDB();

        console.log("🎯 Creating dummy services for testing...");

        // Insert dummy services
        const insertedServices = await Service.insertMany(dummyServices);

        console.log(`✅ Successfully created ${insertedServices.length} dummy services!`);
        console.log("\nServices created:");
        insertedServices.forEach((service, index) => {
            console.log(`${index + 1}. ${service.title} - ${service.price}`);
        });

        console.log("\n🚀 You can now test the service application flow!");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error creating dummy services:", error);
        process.exit(1);
    }
}

createDummyServices();
