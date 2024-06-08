import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TrashIcon from "../icons/TrashIcon";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState, useEffect } from "react";
import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";

function ColumnContainer({
    column,
    deleteColumn,
    updateColumn,
    createTask,
    tasks,
    deleteTask,
    updateTask,
    onOpenModal
}) {
    const [editMode, setEditMode] = useState(false);
    const [taskCount, setTaskCount] = useState(tasks.length);

    useEffect(() => {
        setTaskCount(tasks.length);
    }, [tasks]);

    const tasksIds = useMemo(() => {
        return tasks.map((task) => task.id);
    }, [tasks]);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
        disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="bg-columnBackgroundColor opacity-40 border-2 border-blue-500 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
            ></div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
        >
            {/* Column title */}
            <div
                {...attributes}
                {...listeners}
                onClick={() => {
                    setEditMode(true);
                }}
                className=" bg-mainBackgroundColor text-md text-white h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-between"
            >
                <div className="flex gap-2">
                    <div
                        className="flex justify-center items-center bg-white text-black px-2 py-1 text-sm rounded-full"
                    >
                        {taskCount}
                    </div>
                    {!editMode && column.title}
                    {editMode && (
                        <input
                            className="bg-black text-white focus:border-blue-500 border rounded outline-none px-2"
                            value={column.title}
                            onChange={(e) => updateColumn(column.id, e.target.value)}
                            autoFocus
                            onBlur={() => {
                                setEditMode(false);
                            }}
                            onKeyDown={(e) => {
                                if (e.key !== "Enter") return;
                                setEditMode(false);
                            }}
                        />
                    )}
                </div>
                <button
                    onClick={() => {
                        deleteColumn(column.id);
                    }}
                    className="stroke-gray-500 hover:stroke-red-500 hover:bg-columnBackgroundColor rounded px-1 py-2 "
                >
                    <TrashIcon />
                </button>
            </div>

            {/* Column task container */}
            <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
                <SortableContext items={tasksIds}>
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            deleteTask={deleteTask}
                            updateTask={updateTask}
                            onOpenModal={onOpenModal}   
                        />
                    ))}
                </SortableContext>
            </div>
            {/* Column footer */}
            <button
                className="flex gap-2 text-white items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-green-500 active:bg-black"
                onClick={() => {
                    createTask(column.id);
                }}
            >
                <PlusIcon />
                Add task
            </button>
        </div>
    );
}

export default ColumnContainer;
