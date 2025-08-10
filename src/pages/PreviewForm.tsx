
import { useParams, Link } from "react-router-dom";
import { loadForms } from "../utils/localStorage";
import { Button } from "@mui/material";

export default function PreviewForm() {
  const { id } = useParams<{ id: string }>();
  const forms = loadForms();
  const form = forms.find(f => f.id === id);

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

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{form.name}</h1>
      <p className="text-sm text-gray-500 mb-6">
        Created at: {new Date(form.createdAt).toLocaleString()}
      </p>

      <form className="space-y-4">
        {form.fields.map((field, index) => (
          <div key={field.id || index} className="space-y-1">
            <label className="block font-medium">{field.label}</label>

            {field.type === "text" && (
              <input type="text" className="border p-2 w-full rounded" disabled />
            )}
            {field.type === "number" && (
              <input type="number" className="border p-2 w-full rounded" disabled />
            )}
            {field.type === "textarea" && (
              <textarea className="border p-2 w-full rounded" disabled />
            )}
            {field.type === "date" && (
              <input type="date" className="border p-2 w-full rounded" disabled />
            )}
            {field.type === "select" && (
              <select className="border p-2 w-full rounded" disabled>
                {field.options?.map((opt: string, i: number) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}
            {field.type === "radio" && (
              <div className="flex gap-4">
                {field.options?.map((opt: string, i: number) => (
                  <label key={i}>
                    <input type="radio" name={`radio-${index}`} disabled /> {opt}
                  </label>
                ))}
              </div>
            )}
            {field.type === "checkbox" && (
              <div className="flex gap-4">
                {field.options?.map((opt: string, i: number) => (
                  <label key={i}>
                    <input type="checkbox" disabled /> {opt}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </form>

      <div className="mt-6">
        <Link to="/myforms">
          <Button variant="contained" color="primary">Back to My Forms</Button>
        </Link>
      </div>
    </div>
  );
}
