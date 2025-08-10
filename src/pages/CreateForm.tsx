import { useState } from "react";
import { type FieldConfig, type FieldType } from "../types/form";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "../components/SortableItems";
import { v4 as uuidv4 } from "uuid";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from "@mui/material";
import { saveForm } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";

const fieldOptions: { label: string; value: FieldType }[] = [
  { label: "Text", value: "text" },
  { label: "Number", value: "number" },
  { label: "Textarea", value: "textarea" },
  { label: "Select", value: "select" },
  { label: "Radio", value: "radio" },
  { label: "Checkbox", value: "checkbox" },
  { label: "Date", value: "date" },
];

export default function CreateForm() {
  const [fields, setFields] = useState<FieldConfig[]>([]);
  const [open, setOpen] = useState(false);
  const [newFieldType, setNewFieldType] = useState<FieldType>("text");
  const navigate = useNavigate();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddField = () => {
    setFields((prev) => [
      ...prev,
      {
        id: uuidv4(),
        type: newFieldType,
        label: "New Field",
        required: false,
      },
    ]);
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

const handleSaveForm = () => {
  const name = prompt("Enter form name:");
  if (!name) return;

  saveForm({
    id: uuidv4(),
    name,
    createdAt: new Date().toISOString(),
    fields,
  });

  alert("Form saved!");
  navigate("/myforms");
};

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Form</h1>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={(event) => {
          const { active, over } = event;
          if (over && active.id !== over.id) {
            setFields((prev) => {
              const oldIndex = prev.findIndex((f) => f.id === active.id);
              const newIndex = prev.findIndex((f) => f.id === over.id);
              return arrayMove(prev, oldIndex, newIndex);
            });
          }
        }}
      >
        <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
          {fields.map((field) => (
            <SortableItem key={field.id} id={field.id} field={field} onDelete={handleDelete} />
          ))}
        </SortableContext>
      </DndContext>

      <div className="flex gap-3 mt-4">
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Add Field
        </Button>
        <Button variant="outlined" color="success" onClick={handleSaveForm}>
          Save Form
        </Button>
      </div>


      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Field Type"
            value={newFieldType}
            onChange={(e) => setNewFieldType(e.target.value as FieldType)}
          >
            {fieldOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddField} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
