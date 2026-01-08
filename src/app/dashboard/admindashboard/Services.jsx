"use client";

import React, { Component } from "react";
import { Check, X } from "lucide-react";
import Card from "./components/Card";
import Table, { TableRow, TableCell } from "./components/Table";
import Badge from "./components/Badge";
import adminservice from "@/app/adminapiservice/admin-service";

class Services extends Component {
  state = {
    services: [],
    loading: true,
    error: "",
  };

  componentDidMount() {
    this.fetchServices();
  }

  /* =========================
     FETCH SERVICES
  ========================= */
  fetchServices = async () => {
    try {
      const services = await adminservice.getAllServices();
      console.log("Services from API:", services);

      this.setState({
        services,
        loading: false,
      });
    } catch (error) {
      this.setState({
        error: "Failed to load services",
        loading: false,
      });
    }
  };

  /* =========================
     ACCEPT SERVICE
  ========================= */
  handleAccept = async (_id) => {
    const prevServices = [...this.state.services];

    // Optimistic update
    this.setState({
      services: prevServices.map((s) =>
        s._id === _id ? { ...s, status: "accepted" } : s
      ),
    });

    try {
      await adminservice.acceptService(_id);
    } catch (error) {
      this.setState({ services: prevServices });
      alert("Failed to accept service");
    }
  };

  /* =========================
     REJECT SERVICE
  ========================= */
  handleReject = async (_id) => {
    const prevServices = [...this.state.services];

    this.setState({
      services: prevServices.map((s) =>
        s._id === _id ? { ...s, status: "rejected" } : s
      ),
    });

    try {
      await adminservice.rejectService(_id);
    } catch (error) {
      this.setState({ services: prevServices });
      alert("Failed to reject service");
    }
  };

  /* =========================
     STATUS BADGE
  ========================= */
  getStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return <Badge variant="success">Accepted</Badge>;
      case "rejected":
        return <Badge variant="danger">Rejected</Badge>;
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  /* =========================
     RENDER
  ========================= */
  render() {
    const { services, loading, error } = this.state;

    if (loading) return <p className="text-gray-500">Loading services...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
      <Card className="p-6">
        <Table
          headers={[
            "Service Name",
            "Category",
            "Status",
            "Requested By",
            "Actions",
          ]}
        >
          {services?.map((service) => (
            <TableRow key={service._id}>
              <TableCell className="font-semibold">
                {service.serviceName}
              </TableCell>

              <TableCell>{service.category}</TableCell>

              <TableCell>
                {this.getStatusBadge(service.status)}
              </TableCell>

              <TableCell>{service.requestedBy}</TableCell>

              <TableCell>
                {service.status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        this.handleAccept(service._id)
                      }
                      className="p-1.5 hover:bg-green-100 rounded"
                      title="Accept"
                    >
                      <Check className="w-4 h-4 text-green-600" />
                    </button>

                    <button
                      onClick={() =>
                        this.handleReject(service._id)
                      }
                      className="p-1.5 hover:bg-red-100 rounded"
                      title="Reject"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </Table>

        {services.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No services found
          </p>
        )}
      </Card>
    );
  }
}

export default Services;
