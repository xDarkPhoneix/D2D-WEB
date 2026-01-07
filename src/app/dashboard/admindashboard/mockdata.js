export const mockServices = [
  {
    id: "1",
    serviceName: "Social Media Campaign",
    category: "Social Media Marketing",
    status: "pending",
    requestedBy: "Nike Inc.",
    date: "2024-01-07",
  },
  {
    id: "2",
    serviceName: "Brand Identity Design",
    category: "Branding",
    status: "accepted",
    requestedBy: "Startup XYZ",
    date: "2024-01-06",
  },
  {
    id: "3",
    serviceName: "SEO Optimization",
    category: "Digital Marketing",
    status: "accepted",
    requestedBy: "TechCorp",
    date: "2024-01-05",
  },
  {
    id: "4",
    serviceName: "Content Strategy",
    category: "Content Marketing",
    status: "pending",
    requestedBy: "Fashion Brand Co.",
    date: "2024-01-05",
  },
  {
    id: "5",
    serviceName: "Video Production",
    category: "Video Marketing",
    status: "rejected",
    requestedBy: "Local Business",
    date: "2024-01-04",
  },
];

export const mockUsers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    role: "Client",
    status: "active",
    joinedDate: "2023-12-15",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.c@example.com",
    role: "Client",
    status: "active",
    joinedDate: "2023-12-20",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    role: "Partner",
    status: "active",
    joinedDate: "2024-01-02",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.k@example.com",
    role: "Client",
    status: "blocked",
    joinedDate: "2023-11-10",
  },
  {
    id: "5",
    name: "Lisa Thompson",
    email: "lisa.t@example.com",
    role: "Client",
    status: "active",
    joinedDate: "2024-01-05",
  },
];

export const mockJobs = [
  {
    id: "1",
    title: "Senior Creative Designer",
    department: "Design",
    location: "Mumbai, India",
    status: "open",
    description:
      "We are looking for a talented Senior Creative Designer to join our team...",
    skills: [
      "Adobe Creative Suite",
      "Figma",
      "Illustration",
      "Brand Design",
    ],
    experience: "5+ years",
    applicants: 24,
  },
  {
    id: "2",
    title: "Social Media Manager",
    department: "Marketing",
    location: "Remote",
    status: "open",
    description:
      "Seeking an experienced Social Media Manager to lead our social strategy...",
    skills: [
      "Social Media Strategy",
      "Content Creation",
      "Analytics",
      "Community Management",
    ],
    experience: "3-5 years",
    applicants: 18,
  },
  {
    id: "3",
    title: "Content Writer",
    department: "Content",
    location: "Bangalore, India",
    status: "open",
    description:
      "Join our content team to create compelling stories for top brands...",
    skills: ["Creative Writing", "SEO", "Research", "Storytelling"],
    experience: "2-4 years",
    applicants: 32,
  },
  {
    id: "4",
    title: "Video Editor",
    department: "Production",
    location: "Delhi, India",
    status: "closed",
    description:
      "We need a skilled video editor for our growing production team...",
    skills: [
      "Premiere Pro",
      "After Effects",
      "Color Grading",
      "Motion Graphics",
    ],
    experience: "3+ years",
    applicants: 15,
  },
];

export const mockApplications = [
  {
    id: "1",
    applicantName: "Priya Sharma",
    email: "priya.s@email.com",
    jobTitle: "Senior Creative Designer",
    experience: "6 years",
    resume: "priya-sharma-resume.pdf",
    status: "pending",
    appliedDate: "2024-01-07",
  },
  {
    id: "2",
    applicantName: "Rahul Verma",
    email: "rahul.v@email.com",
    jobTitle: "Social Media Manager",
    experience: "4 years",
    resume: "rahul-verma-resume.pdf",
    status: "shortlisted",
    appliedDate: "2024-01-06",
  },
  {
    id: "3",
    applicantName: "Ananya Desai",
    email: "ananya.d@email.com",
    jobTitle: "Content Writer",
    experience: "3 years",
    resume: "ananya-desai-resume.pdf",
    status: "shortlisted",
    appliedDate: "2024-01-06",
  },
  {
    id: "4",
    applicantName: "Vikram Patel",
    email: "vikram.p@email.com",
    jobTitle: "Senior Creative Designer",
    experience: "5 years",
    resume: "vikram-patel-resume.pdf",
    status: "pending",
    appliedDate: "2024-01-05",
  },
  {
    id: "5",
    applicantName: "Neha Kapoor",
    email: "neha.k@email.com",
    jobTitle: "Social Media Manager",
    experience: "3 years",
    resume: "neha-kapoor-resume.pdf",
    status: "rejected",
    appliedDate: "2024-01-04",
  },
];

export const mockActivities = [
  {
    id: "1",
    type: "service",
    message: "New service request from Nike Inc.",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "user",
    message: "Lisa Thompson joined as a new client",
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    type: "job",
    message: "Priya Sharma applied for Senior Creative Designer",
    timestamp: "8 hours ago",
  },
  {
    id: "4",
    type: "service",
    message: "Service accepted for TechCorp",
    timestamp: "1 day ago",
  },
  {
    id: "5",
    type: "user",
    message: "Emily Rodriguez upgraded to Partner",
    timestamp: "2 days ago",
  },
];

export const monthlyUserGrowth = [
  { month: "Jul", users: 45 },
  { month: "Aug", users: 62 },
  { month: "Sep", users: 78 },
  { month: "Oct", users: 95 },
  { month: "Nov", users: 118 },
  { month: "Dec", users: 142 },
  { month: "Jan", users: 168 },
];

export const serviceRequests = [
  { month: "Jul", requests: 12 },
  { month: "Aug", requests: 18 },
  { month: "Sep", requests: 24 },
  { month: "Oct", requests: 30 },
  { month: "Nov", requests: 35 },
  { month: "Dec", requests: 42 },
  { month: "Jan", requests: 48 },
];
