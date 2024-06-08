import React, { useState, useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';

export function Droppable(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });

    // Estado para contar la cantidad de hijos (elementos) dentro del droppable
    const [itemCount, setItemCount] = useState(React.Children.count(props.children));

    // useEffect para actualizar el conteo de hijos cuando los props.children cambian
    useEffect(() => {
        setItemCount(React.Children.count(props.children));
    }, [props.children]);

    return (
        <div
            ref={setNodeRef}
            className='bg-blue-900 w-[350px] h-[450px] max-h-[500px] rounded-2xl flex flex-col'>
                {/* TITULO ENCABEZADO LISTA */}
                <div
                className='bg-blue-950 text-md h-[60px] font-bold rounded-2xl rounded-b-none p-3 border-4 border-blue-900 flex items-center justify-between'>
                    <div className='flex gap-2 text-white'>
                        <div className='flex justify-center items-center text-black bg-white px-2 py-1 text-sm rounded-full'>
                            {itemCount}
                        </div>
                        {props.title}
                    </div>
                </div>
                {/* CONTENIDO LISTA */}
                <div className='flex flex-grow flex-col gap-4 items-center p-2 overflow-x-hidden overflow-y-auto'>
                    
                    {props.children}
                </div>
        </div>
    );
}
