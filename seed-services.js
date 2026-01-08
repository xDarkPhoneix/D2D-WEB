// Database seeding script to populate services from the services page
// Run this once to seed the database with initial services

import { connectDB } from "./src/app/lib/db.js";
import { Service } from "./src/app/models/Service.model.js";

const services = [
    {
        title: "Narrative Architecture",
        description:
            "We don't just build brands; we craft Narrative Architectures that give your company a soul and a story. We transform you from a generic business into an industry leader.",
        category: "Branding",
        image: "/services0.jpeg",
        price: "Contact for pricing",
    },
    {
        title: "Video Production",
        description:
            "High-fidelity, cinematic video production crafted to position you as a top-tier industry expert. We create visually stunning, story-driven videos that capture attention, build credibility, and communicate your brand's value with clarity and impact.",
        category: "Content Creation",
        image: "/services1.jpeg",
        price: "Contact for pricing",
    },
    {
        title: "Creative Strategy",
        description:
            "The master plan that ensures every post, video, and design serves a clear business goal. We develop a strategic creative roadmap that aligns your brand's messaging, visuals, and content with measurable outcomes.",
        category: "Strategy",
        image: "/services2.jpeg",
        price: "Contact for pricing",
    },
    {
        title: "Paid Ad Campaigns",
        description:
            "ROI-focused advertising on Meta, Google, and LinkedIn—designed to deliver real impact. We plan, launch, and optimize high-performance ad campaigns that reach the right audience at the right time.",
        category: "Digital Marketing",
        image: "/services3.jpeg",
        price: "Starting from ₹50,000",
    },
    {
        title: "SEO Mastery",
        description:
            "Technical and content-driven optimization designed to help you own the first page of Google. We implement a comprehensive SEO approach that combines strong technical foundations with high-quality, search-optimized content.",
        category: "SEO",
        image: "/services4.jpeg",
        price: "Starting from ₹30,000/month",
    },
    {
        title: "Content Production",
        description:
            "A high-volume content engine designed to keep your brand relevant and top-of-mind every single day. We produce consistent, high-quality content across formats and platforms to ensure your brand stays visible, engaging, and memorable.",
        category: "Content Creation",
        image: "/services5.jpeg",
        price: "Contact for pricing",
    },
    {
        title: "AI Creative Studio",
        description:
            "Leveraging AI to produce hyper-personalized ads and visuals—faster and smarter than traditional agencies. We combine advanced AI tools with human creativity to design high-impact visuals and ad creatives at scale.",
        category: "AI & Technology",
        image: "/services9.jpg",
        price: "Contact for pricing",
    },
    {
        title: "Bespoke Web Development",
        description:
            "High-speed, conversion-optimized websites designed to turn visitors into paying customers. We build custom websites tailored to your business goals—focused on performance, usability, and conversion.",
        category: "Web Development",
        image: "/services6.jpeg",
        price: "Starting from ₹1,00,000",
    },
    {
        title: "Business Automation",
        description:
            "Backend systems that automate your leads, follow-ups, and sales processes. We design and implement smart automation workflows that reduce manual effort and improve efficiency across your business.",
        category: "Automation",
        image: "/services7.jpeg",
        price: "Contact for pricing",
    },
    {
        title: "Strategic Consulting",
        description:
            "C-suite level guidance to help you scale your digital presence as your company grows. We work closely with leadership teams to provide high-level strategic insight, clear roadmaps, and informed decision-making.",
        category: "Consulting",
        image: "/services8.jpeg",
        price: "Contact for pricing",
    },
];

async function seedServices() {
    try {
        await connectDB();

        console.log("🌱 Seeding services...");

        // Clear existing services (optional)
        // await Service.deleteMany({});
        // console.log("Cleared existing services");

        // Insert services
        const insertedServices = await Service.insertMany(services);

        console.log(`✅ Successfully seeded ${insertedServices.length} services`);
        console.log("Services:", insertedServices.map(s => s.title));

        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding services:", error);
        process.exit(1);
    }
}

seedServices();
