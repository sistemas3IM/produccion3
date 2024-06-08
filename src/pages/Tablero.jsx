import React from 'react';
import KanbanBoard from '../components/KanbanBoard';

const Tablero = () => {
    return (
        <>
            <div className='h-auto'>
                <div className='h-full inline-flex flex-col'>
                    <div className='mt-5 px-3'>
                        <h3 className='text-sm cursor-pointer mb-10'>Tableros &gt; <b>General</b> </h3>
                        <KanbanBoard />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tablero