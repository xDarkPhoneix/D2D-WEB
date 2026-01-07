"use client"
import { useState } from "react";
import { Plus, MapPin, Users, Edit, XCircle } from "lucide-react";
import Card from "./components/Card";
import Badge from "./components/Badge";
import Button from "./components/Button";
import Modal from "./components/Modal";
import { mockJobs } from "./mockdata.js";

export default function Jobs() {
  const [jobs, setJobs] = useState(mockJobs);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    description: "",
    skills: "",
    experience: "",
  });

  const handleCreateJob = () => {
    const newJob = {
      id: String(jobs.length + 1),
      title: formData.title,
      department: formData.department,
      location: formData.location,
      status: "open",
      description: formData.description,
      skills: formData.skills.split(",").map((s) => s.trim()),
      experience: formData.experience,
      applicants: 0,
    };

    setJobs([...jobs, newJob]);
    setShowCreateModal(false);
    setFormData({
      title: "",
      department: "",
      location: "",
      description: "",
      skills: "",
      experience: "",
    });
  };

  const handleToggleStatus = (id) => {
    setJobs(
      jobs.map((j) =>
        j.id === id
          ? { ...j, status: j.status === "open" ? "closed" : "open" }
          : j
      )
    );
  };

  const handleEditJob = (job) => {
    setSelectedJob(job);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      description: job.description,
      skills: job.skills.join(", "),
      experience: job.experience,
    });
    setShowEditModal(true);
  };

  const handleUpdateJob = () => {
    if (!selectedJob) return;

    setJobs(
      jobs.map((j) =>
        j.id === selectedJob.id
          ? {
              ...j,
              title: formData.title,
              department: formData.department,
              location: formData.location,
              description: formData.description,
              skills: formData.skills.split(",").map((s) => s.trim()),
              experience: formData.experience,
            }
          : j
      )
    );

    setShowEditModal(false);
    setSelectedJob(null);
  };

  const JobForm = ({ onSubmit, submitLabel }) => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Job Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="e.g., Senior Creative Designer"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Department
          </label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) =>
              setFormData({ ...formData, department: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="e.g., Design"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="e.g., Mumbai, India"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description
        </label>
        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Job description..."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Skills Required (comma-separated)
        </label>
        <input
          type="text"
          value={formData.skills}
          onChange={(e) =>
            setFormData({ ...formData, skills: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="e.g., Adobe Creative Suite, Figma, Illustration"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Experience Level
        </label>
        <input
          type="text"
          value={formData.experience}
          onChange={(e) =>
            setFormData({ ...formData, experience: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="e.g., 3–5 years"
        />
      </div>

      <div className="pt-4">
        <Button onClick={onSubmit}>{submitLabel}</Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Job Openings
          </h1>
          <p className="text-gray-600">
            Manage job positions and openings
          </p>
        </div>

        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-5 h-5 mr-2 inline" />
          Create New Job
        </Button>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card key={job.id} hover className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {job.department}
                </p>
              </div>

              <Badge
                variant={job.status === "open" ? "success" : "default"}
              >
                {job.status}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                {job.applicants} applicants
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                  +{job.skills.length - 3}
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => handleEditJob(job)}
                variant="secondary"
                size="sm"
              >
                <Edit className="w-4 h-4 mr-1 inline" />
                Edit
              </Button>

              <Button
                onClick={() => handleToggleStatus(job.id)}
                variant={job.status === "open" ? "danger" : "success"}
                size="sm"
              >
                {job.status === "open" ? (
                  <>
                    <XCircle className="w-4 h-4 mr-1 inline" />
                    Close
                  </>
                ) : (
                  "Reopen"
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Modals */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Job Opening"
        size="lg"
      >
        <JobForm
          onSubmit={handleCreateJob}
          submitLabel="Create Job"
        />
      </Modal>

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Job Opening"
        size="lg"
      >
        <JobForm
          onSubmit={handleUpdateJob}
          submitLabel="Update Job"
        />
      </Modal>
    </div>
  );
}
