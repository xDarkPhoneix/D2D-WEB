import axios from "axios";

class AdminService {
  API_END_POINT = "/api";

  /* ---------------- USERS ---------------- */

  async getTotalUsers() {
    const response = await axios.get(
      `${this.API_END_POINT}/users/count`
    );
    return response.data.totalUsers;
  }

  /* ---------------- JOBS ---------------- */

  async getAllJobs() {
    const response = await axios.get(
      `${this.API_END_POINT}/jobs`
    );
    return response.data;
  }

  async createJob(jobData) {
    const response = await axios.post(
      `${this.API_END_POINT}/jobs`,
      jobData
    );
    return response.data;
  }

  async updateJob(jobId, jobData) {
    const response = await axios.patch(
      `${this.API_END_POINT}/jobs/${jobId}`,
      jobData
    );
    return response.data;
  }

  async toggleJobStatus(jobId, status) {
    const response = await axios.patch(
      `${this.API_END_POINT}/jobs/${jobId}/status`,
      { status }
    );
    return response.data;
  }

  async deleteJob(jobId) {
    const response = await axios.delete(
      `${this.API_END_POINT}/jobs/${jobId}`
    );
    return response.data;
  }

  /* ---------------- Services Like Web design Etc ---------------- */
    async getAllServices() {
    const response = await axios.get(
      `${this.API_END_POINT}/services`
    );
    
    return response.data;
  }

  async acceptService(serviceId) {
    const response = await axios.patch(
      `${this.API_END_POINT}/services/${serviceId}/accepted`
    );
    return response.data;
  }

  async rejectService(serviceId) {
    const response = await axios.patch(
      `${this.API_END_POINT}/services/${serviceId}/rejected`
    );
    return response.data;
  }

  async getServiceById(serviceId) {
    const response = await axios.get(
      `${this.API_END_POINT}/services/${serviceId}`
    );
    return response.data;
  }
}

const adminservice = new AdminService();
export default adminservice;
