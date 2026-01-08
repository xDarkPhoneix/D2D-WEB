import React from "react";
import Button from "./Button";


const JobForm = React.memo(function JobForm({
  formData,
  setFormData,
  onSubmit,
  submitLabel,
}) {
  return (
    <div className="space-y-4">
      {[
        ["Job Title", "title", "Senior Creative Designer"],
        ["Department", "department", "Design"],
        ["Location", "location", "Mumbai, India"],
      ].map(([label, key, placeholder]) => (
        <div key={key}>
          <label className="block text-sm font-semibold mb-2">
            {label}
          </label>
          <input
            value={formData[key]}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [key]: e.target.value,
              }))
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
            placeholder={placeholder}
          />
        </div>
      ))}

      <div>
        <label className="block text-sm font-semibold mb-2">
          Description
        </label>
        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Skills (comma-separated)
        </label>
        <input
          value={formData.skills}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              skills: e.target.value,
            }))
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Experience
        </label>
        <input
          value={formData.experience}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              experience: e.target.value,
            }))
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <Button onClick={onSubmit}>{submitLabel}</Button>
    </div>
  );
});

export default JobForm;
