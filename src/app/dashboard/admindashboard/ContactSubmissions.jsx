"use client";
import React, { useEffect, useState } from "react";

const ContactSubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            const response = await fetch("/api/admin/contact");
            if (response.ok) {
                const data = await response.json();
                setSubmissions(data.data);
            } else {
                console.error("Failed to fetch submissions");
            }
        } catch (error) {
            console.error("Error fetching submissions:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Loading submissions...</div>;
    }

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Contact Submissions</h2>
                <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                    {submissions.length} Total
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold">
                            <th className="p-4">Date</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Contact Info</th>
                            <th className="p-4">Location</th>
                            <th className="p-4">Message</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {submissions.length > 0 ? (
                            submissions.map((submission) => (
                                <tr key={submission._id} className="hover:bg-gray-50 transition-colors text-sm text-gray-700">
                                    <td className="p-4 whitespace-nowrap text-gray-500">
                                        {new Date(submission.createdAt).toLocaleDateString()}
                                        <div className="text-xs">{new Date(submission.createdAt).toLocaleTimeString()}</div>
                                    </td>
                                    <td className="p-4 font-medium text-gray-900">{submission.name}</td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="flex items-center gap-1.5">
                                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                                {submission.email}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-gray-500">
                                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                                {submission.phone}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                                            {submission.location}
                                        </span>
                                    </td>
                                    <td className="p-4 max-w-xs truncate" title={submission.message}>
                                        {submission.message}
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${submission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                submission.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-green-100 text-green-800'
                                            }`}>
                                            {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="p-8 text-center text-gray-500">
                                    No submissions found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContactSubmissions;
