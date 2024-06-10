import React from 'react';
import KanbanBoard from '../components/KanbanBoard';
import { useLocation, Link } from 'react-router-dom';
import { Breadcrumb } from "flowbite-react";
const Tablero = () => {
    const { pathname } = useLocation();
    const [layout, page] = pathname.split('/').slice(1);

    return (
        <>
            <div className='h-auto'>
                <div className='h-full inline-flex flex-col'>
                    <div className='mt-5 px-3'>
                        <div className='capitalize'>
                            <Breadcrumb className='mb-10'>
                                <Breadcrumb.Item>
                                    <Link to={`/${layout}`}>{layout}</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    {page}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <KanbanBoard />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tablero