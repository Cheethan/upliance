
import  { useState } from "react";
import { Link } from "react-router-dom";
import { loadForms, saveForms, type FormSchema } from "../utils/localStorage";
import { Button } from "@mui/material";

export default function MyForms() {
  const [forms, setForms] = useState<FormSchema[]>(loadForms());

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      const updatedForms = forms.filter((form) => form.id !== id);
      saveForms(updatedForms); 
      setForms(updatedForms);
    }
  };

  if (forms.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500 mb-4">No forms saved yet.</p>
        <Link to="/create">
          <Button variant="contained" color="primary">
            Create Your First Form
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Forms</h1>
      <div className="space-y-4">
        {forms.map((form) => (
          <div
            key={form.id}
            className="border rounded p-4 flex items-center justify-between"
          >
            <div>
              <h2 className="font-semibold">{form.name}</h2>
              <p className="text-sm text-gray-500">
                Created at: {new Date(form.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Link to={`/preview/${form.id}`}>
                <Button variant="outlined">Preview</Button>
              </Link>
              <Link to={`/edit/${form.id}`}>
                <Button variant="contained" color="primary">
                  Edit
                </Button>
              </Link>
              <Link to={`/fill/${form.id}`}>
                <Button variant="outlined" color="success">Fill</Button>
              </Link>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(form.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
