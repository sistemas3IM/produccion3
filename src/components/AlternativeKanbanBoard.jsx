import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';
import { createPortal } from 'react-dom';

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
        title: "Terminado",
    },
];

const defaultTasks = [
    {
        id: "1",
        columnId: "todo",
        title: "Admin API",
        content: "List admin APIs for dashboard",
    }
];


const KanbanBoard = () => {

    const [columns, setColumns] = useState(defaultCols);
    const [activeTask, setActiveTask] = useState(null);
    const [apiData, setApiData] = useState([]);
    const [tasks, setTasks] = useState(defaultTasks);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.2.62:665/api/Tarjeta_OF/?apiKey=7P7r71jzP8D54RFclyH8hfg');
                setApiData(response.data);
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


    const setData = (data) => {
        const tasks = data.map((item) => ({
            id: item.idTarjetaOf,
            columnId: item.ofLista, // Ajusta esta propiedad según corresponda
            title: item.of,
            content: item.ofName,
        }));
        setTasks(tasks);
    };


    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
    const taskId = useMemo(() => tasks.map((task) => task.id), [tasks]);

    function handleDragStart(event) {
        const { active } = event;
        setActiveTask(tasks.find(task => task.id === active.id) || null);
    }

    function handleDragOver(event) {

    }



    function handleDragEnd(event) {
        const { active, over } = event;

        if (active && over) {
            const oldColumnId = tasks.find(task => task.id === active.id).columnId;
            const newColumnId = over.id;

            if (oldColumnId !== newColumnId) {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === active.id
                            ? { ...task, columnId: newColumnId }
                            : task
                    )
                );
            }
        }
        setActiveTask(null);
    }

    return (
        <div className='m-auto flex min-h-screen w-full items-center align-top overflow-x-auto overflow-y-hidden px-[40px]'>
            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className='m-auto align-top flex gap-4'>
                    <SortableContext items={columnsId}>
                        {columns.map((col) => (
                            <Droppable key={col.id} id={col.id} style={{ flex: 1 }} title={col.title}>
                                    {tasks.filter(task => task.columnId === col.id).map((task) => (
                                        <Draggable key={task.id} id={task.id} title={task.title} description={task.content} />
                                    ))}
                            </Droppable>
                        ))}
                    </SortableContext>
                </div>
                {createPortal(
                    <DragOverlay>
                        {activeTask ? (
                            <Draggable
                                id={activeTask.id}
                                title={activeTask.title}
                                description={activeTask.content}
                            />
                        ) : null}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </div>
    );
}

export default KanbanBoard