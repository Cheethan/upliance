
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type FieldConfig } from "../types/form";
import { IconButton, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

interface Props {
    id: string;
    field: FieldConfig;
    onDelete: (id: string) => void;
}

export default function SortableItem({ id, field, onDelete }: Props) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Paper
            ref={setNodeRef}
            style={style}
            className="flex items-center justify-between p-3 my-2 cursor-pointer"
        >
            <div className="flex items-center gap-3">
                <span {...attributes} {...listeners} className="cursor-grab text-gray-500">
                    <DragIndicatorIcon />
                </span>
                <span>{field.label} ({field.type})</span>
            </div>
            <IconButton onClick={() => onDelete(id)}>
                <DeleteIcon />
            </IconButton>
        </Paper>
    );
}
