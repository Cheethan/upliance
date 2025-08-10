import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { type FormSchema, updateForm } from "../utils/localStorage";
import { Button, TextField } from "@mui/material";

export default function EditForm() {
  const form = useLoaderData() as FormSchema;
  const [name, setName] = useState(form.name);
  const [fields, setFields] = useState([...form.fields]);
  const navigate = useNavigate();

  const handleFieldChange = (index: number, key: string, value: any) => {
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], [key]: value };
    setFields(updatedFields);
  };

  const handleOptionChange = (
    fieldIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options[optionIndex] = value;
    setFields(updatedFields);
  };

  const addOption = (fieldIndex: number) => {
    const updatedFields = [...fields];
    if (!updatedFields[fieldIndex].options) {
      updatedFields[fieldIndex].options = [];
    }
    updatedFields[fieldIndex].options.push("");
    setFields(updatedFields);
  };

  const removeOption = (fieldIndex: number, optionIndex: number) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options.splice(optionIndex, 1);
    setFields(updatedFields);
  };

  const handleSave = () => {
    updateForm({
      ...form,
      name,
      fields,
    });
    navigate("/myforms");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Form</h1>

      {/* Edit form name */}
      <TextField
        fullWidth
        label="Form Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4"
      />

      {/* Edit fields */}
      {fields.map((field, index) => (
        <div key={index} className="mb-4 border p-3 rounded">
          <TextField
            label="Label"
            value={field.label || ""}
            onChange={(e) => handleFieldChange(index, "label", e.target.value)}
            fullWidth
            className="mb-2"
          />

          {field.type !== "radio" && field.type !== "select" && (
            <TextField
              label="Placeholder"
              value={field.placeholder || ""}
              onChange={(e) =>
                handleFieldChange(index, "placeholder", e.target.value)
              }
              fullWidth
            />
          )}

          {/* Options for radio/select */}
          {(field.type === "radio" || field.type === "select") && (
            <div>
              <p className="font-semibold mt-3">Options:</p>
              {field.options?.map((opt: string, optIndex: number) => (
                <div key={optIndex} className="flex gap-2 mb-2">
                  <TextField
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(index, optIndex, e.target.value)
                    }
                    placeholder={`Option ${optIndex + 1}`}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeOption(index, optIndex)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outlined"
                onClick={() => addOption(index)}
              >
                Add Option
              </Button>
            </div>
          )}
        </div>
      ))}

      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Changes
      </Button>
    </div>
  );
}
