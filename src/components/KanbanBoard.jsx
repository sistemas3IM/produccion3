import PlusIcon from "../icons/PlusIcon";
import { useMemo, useState, useEffect } from "react";
import axios from "axios";
import ColumnContainer from "./ColumnContainer";
import {
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import ModalEditCard from "./ModalEditCard";
import { endpoint, CREDENTIALS } from "../config";

const defaultCols = [
    {
        id: "todo",
        title: "Pendiente",
    },
    {
        id: "doing",
        title: "En Proceso",
    },
    {
        id: "done",
        title: "Finalizado",
    },
];

const defaultTasks = [
    {
        id: "1",
        columnId: "todo",
        title: "Task 1",
        content: "List admin APIs for dashboard",
    }
];

function KanbanBoard() {
    const [columns, setColumns] = useState(defaultCols);
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

    const [tasks, setTasks] = useState(defaultTasks);

    const [activeColumn, setActiveColumn] = useState(null);

    const [activeTask, setActiveTask] = useState(null);

    const [data, setPostura] = useState([]);

    const [apiData, setApiData] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    const [filterTask, setFilterTask] = useState(defaultTasks)

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${endpoint.tajetas_of}${CREDENTIALS}`);
                setApiData(response.data);
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchPostura = async () => {
            try {
                const response = await axios.get(`${endpoint.posturas_of}${CREDENTIALS}`);
                setPostura(response.data);
                setCols(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
        fetchPostura();
    }, []);


    const setData = (data) => {
        const tasks = data.map((item) => ({
            id: item.idTarjetaOf,
            columnId: item.idPostura, // Ajusta esta propiedad según corresponda
            title: item.of,
            content: item.ofName,
        }));
        setTasks(tasks);
    };

    const setCols = (data) => {
        const columns = data.map((item) => ({
            id: item.idPostura,
            title: item.posturaName,
        }));
        setColumns(columns);
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

        
    const onOpenModal = (id) => {


        console.log(id);

        const task = apiData.find((task) => task.idTarjetaOf === id);

        setFilterTask(task ? [task] : []); 

        handleOpenModal();
    }


    return (
        <div
            className="m-auto flex w-full h-full items-center overflow-x-auto overflow-y-hidden px-[40px]"
        >
            <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
            >
                <div className="m-auto flex gap-4">
                    <div className="flex gap-4">
                        <SortableContext items={columnsId}>
                            {columns.map((col) => (
                                <ColumnContainer
                                    key={col.id}
                                    column={col}
                                    deleteColumn={deleteColumn}
                                    updateColumn={updateColumn}
                                    createTask={createTask}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                    onOpenModal={onOpenModal}
                                    tasks={tasks.filter((task) => task.columnId === col.id)}
                                />
                            ))}
                        </SortableContext>
                    </div>
                    <button
                        onClick={() => {
                            createNewColumn();
                        }}
                        className="h-[60px] w-[350px] min-w-[350px] cursor-pointer text-white rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-blue-500 hover:ring-2 flex gap-2 "
                    >
                        <PlusIcon />
                        Add Column
                    </button>
                </div>

                {createPortal(
                    <DragOverlay>
                        {activeColumn && (
                            <ColumnContainer
                                column={activeColumn}
                                deleteColumn={deleteColumn}
                                updateColumn={updateColumn}
                                createTask={createTask}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                                tasks={tasks.filter(
                                    (task) => task.columnId === activeColumn.id
                                )}
                            />
                        )}
                        {activeTask && (
                            <TaskCard
                                task={activeTask}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                            />
                        )}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>

            <ModalEditCard
                data={filterTask}
                isOpen={isOpen}
                onClose={handleCloseModal}
            />
        </div>
    );

    function createTask(columnId) {
        const newTask = {
            id: generateId(),
            columnId,
            content: `Task ${tasks.length + 1}`,
        };

        setTasks([...tasks, newTask]);
    }

    function deleteTask(id) {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    }

    function updateTask(id, content) {
        const newTasks = tasks.map((task) => {
            if (task.id !== id) return task;
            return { ...task, content };
        });

        setTasks(newTasks);
    }

    function createNewColumn() {
        const columnToAdd = {
            id: generateId(),
            title: `Column ${columns.length + 1}`,
        };

        setColumns([...columns, columnToAdd]);
    }

    function deleteColumn(id) {
        const filteredColumns = columns.filter((col) => col.id !== id);
        setColumns(filteredColumns);

        const newTasks = tasks.filter((t) => t.columnId !== id);
        setTasks(newTasks);
    }

    function updateColumn(id, title) {
        const newColumns = columns.map((col) => {
            if (col.id !== id) return col;
            return { ...col, title };
        });

        setColumns(newColumns);
    }

    function onDragStart(event) {
        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column);
            return;
        }

        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    function onDragEnd(event) {
        setActiveColumn(null);
        setActiveTask(null);

        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveAColumn = active.data.current?.type === "Column";
        if (!isActiveAColumn) return;

        console.log("DRAG END");

        setColumns((columns) => {
            const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

            const overColumnIndex = columns.findIndex((col) => col.id === overId);

            return arrayMove(columns, activeColumnIndex, overColumnIndex);
        });
    }

    function onDragOver(event) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveATask = active.data.current?.type === "Task";
        const isOverATask = over.data.current?.type === "Task";

        if (!isActiveATask) return;

        // Im dropping a Task over another Task
        if (isActiveATask && isOverATask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const overIndex = tasks.findIndex((t) => t.id === overId);

                if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
                    // Fix introduced after video recording
                    tasks[activeIndex].columnId = tasks[overIndex].columnId;
                    return arrayMove(tasks, activeIndex, overIndex - 1);
                }

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        const isOverAColumn = over.data.current?.type === "Column";


        // Im dropping a Task over a column
        if (isActiveATask && isOverAColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);

                tasks[activeIndex].columnId = overId;
                console.log("DROPPING TASK OVER COLUMN", { activeIndex });
                return arrayMove(tasks, activeIndex, activeIndex);
            });
        }
    }
    
}

function generateId() {
    /* Generate a random number between 0 and 10000 */
    return Math.floor(Math.random() * 10001);
}

export default KanbanBoard;
