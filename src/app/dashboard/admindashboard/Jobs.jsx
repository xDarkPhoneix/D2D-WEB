"use client";

import { useEffect, useState } from "react";
import { Plus, MapPin, Users, Edit, XCircle } from "lucide-react";
import Card from "./components/Card";
import Badge from "./components/Badge";
import Button from "./components/Button";
import Modal from "./components/Modal";
import adminservice from "@/app/adminapiservice/admin-service";
import JobForm from "./components/JobForm";
import { useSession } from "next-auth/react";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

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

  /* ---------------- FETCH JOBS ---------------- */

  useEffect(() => {

    console.log("se",session.user.id);
    

    const fetchJobs = async () => {
      try {
        const data = await adminservice.getAllJobs();
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  /* ---------------- CREATE JOB ---------------- */

  const handleCreateJob = async () => {
    try {
      const payload = {
        title: formData.title,
        department: formData.department,
        location: formData.location,
        description: formData.description,
        skills: formData.skills.split(",").map((s) => s.trim()),
        experience: formData.experience,
        createdBy: session.user.id   ///need to be dyanmic
      };

      const createdJob = await adminservice.createJob(payload);
      setJobs([createdJob, ...jobs]);

      setShowCreateModal(false);
      resetForm();
    } catch (error) {
      console.error("Create job failed", error);
    }
  };

  /* ---------------- EDIT JOB ---------------- */

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

  const handleUpdateJob = async () => {
    if (!selectedJob) return;

    try {
      const payload = {
        title: formData.title,
        department: formData.department,
        location: formData.location,
        description: formData.description,
        skills: formData.skills.split(",").map((s) => s.trim()),
        experience: formData.experience,
      };

      const updatedJob = await adminservice.updateJob(selectedJob._id, payload);

      setJobs(jobs.map((j) => (j._id === updatedJob._id ? updatedJob : j)));

      setShowEditModal(false);
      setSelectedJob(null);
      resetForm();
    } catch (error) {
      console.error("Update job failed", error);
    }
  };

  /* ---------------- TOGGLE STATUS ---------------- */

  const handleToggleStatus = async (job) => {
    try {
      const newStatus = job.status === "open" ? "closed" : "open";

      const updatedJob = await adminservice.toggleJobStatus(job._id, newStatus);

      setJobs(jobs.map((j) => (j._id === updatedJob._id ? updatedJob : j)));
    } catch (error) {
      console.error("Toggle status failed", error);
    }
  };

  /* ---------------- HELPERS ---------------- */

  const resetForm = () => {
    setFormData({
      title: "",
      department: "",
      location: "",
      description: "",
      skills: "",
      experience: "",
    });
  };

  /* ---------------- UI ---------------- */

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Job Openings</h1>
          <p className="text-gray-600">Manage job positions</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2 inline" /> Create Job
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card key={job._id} hover className="p-6">
            <div className="flex justify-between mb-4">
              <div>
                <h3 className="font-bold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.department}</p>
              </div>
              <Badge variant={job.status === "open" ? "success" : "default"}>
                {job.status}
              </Badge>
            </div>

            <div className="text-sm text-gray-600 space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {job.location}
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" /> {job.applicantsCount} applicants
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleEditJob(job)}
              >
                <Edit className="w-4 h-4 mr-1 inline" /> Edit
              </Button>

              <Button
                size="sm"
                variant={job.status === "open" ? "danger" : "success"}
                onClick={() => handleToggleStatus(job)}
              >
                <XCircle className="w-4 h-4 mr-1 inline" />
                {job.status === "open" ? "Close" : "Reopen"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Job"
      >
        <JobForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleCreateJob}
          submitLabel="Create Job"
        />
      </Modal>

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Job"
      >
        <JobForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleUpdateJob}
          submitLabel="Update Job"
        />
      </Modal>
    </div>
  );
}
