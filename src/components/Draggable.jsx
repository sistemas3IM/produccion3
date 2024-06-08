import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

function Draggable(props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="bg-white shadow-md p-2.5 h-[100px] min-h-[100px] max-w-[320px] text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-blue-500 cursor-grab relative task"
        >
            <div className="overflow-hidden h-full flex flex-col justify-between">
                <h3 className="font-semibold text-blue-500 whitespace-pre-wrap overflow-hidden text-ellipsis pb-1">
                    {props.title}
                </h3>
                <p className="whitespace-pre-wrap overflow-y-auto text-ellipsis flex-grow">
                    {props.description}
                </p>
            </div>
        </div>
    );
}

export { Draggable };
