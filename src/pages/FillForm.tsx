import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { loadForms } from "../utils/localStorage";
import { Button } from "@mui/material";

export default function FillForm() {
  const { id } = useParams<{ id: string }>();
  const forms = loadForms();
  const form = forms.find(f => f.id === id);

  const [formData, setFormData] = useState<Record<string, any>>({});

  if (!form) {
    return (
      <div className="p-6">
        <p className="text-red-500">Form not found.</p>
        <Link to="/myforms">
          <Button variant="outlined">Back to My Forms</Button>
        </Link>
      </div>
    );
  }

  const handleChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted! Check console for data.");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{form.name}</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {form.fields.map((field, index) => (
          <div key={field.id || index} className="space-y-1">
            <label className="block font-medium">{field.label}</label>

            {field.type === "text" && (
              <input
                type="text"
                className="border p-2 w-full rounded"
                onChange={(e) => handleChange(field.id, e.target.value)}
              />
            )}
            {field.type === "number" && (
              <input
                type="number"
                className="border p-2 w-full rounded"
                onChange={(e) => handleChange(field.id, e.target.value)}
              />
            )}
            {field.type === "textarea" && (
              <textarea
                className="border p-2 w-full rounded"
                onChange={(e) => handleChange(field.id, e.target.value)}
              />
            )}
            {field.type === "date" && (
              <input
                type="date"
                className="border p-2 w-full rounded"
                onChange={(e) => handleChange(field.id, e.target.value)}
              />
            )}
            {field.type === "select" && (
              <select
                className="border p-2 w-full rounded"
                onChange={(e) => handleChange(field.id, e.target.value)}
              >
                {field.options?.map((opt: string, i: number) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            )}
            {field.type === "radio" && (
              <div className="flex gap-4">
                {field.options?.map((opt: string, i: number) => (
                  <label key={i}>
                    <input
                      type="radio"
                      name={field.id}
                      value={opt}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            )}
            {field.type === "checkbox" && (
              <div className="flex gap-4">
                {field.options?.map((opt: string, i: number) => (
                  <label key={i}>
                    <input
                      type="checkbox"
                      value={opt}
                      onChange={(e) => {
                        const currentValues = formData[field.id] || [];
                        if (e.target.checked) {
                          handleChange(field.id, [...currentValues, opt]);
                        } else {
                          handleChange(
                            field.id,
                            currentValues.filter((v: string) => v !== opt)
                          );
                        }
                      }}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
