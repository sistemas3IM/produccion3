import React, { useEffect, useState } from 'react';
import { Modal, Badge } from 'flowbite-react';
import { SiTask } from "react-icons/si";
import { IoMdDocument } from "react-icons/io";
import { FaCalendar } from "react-icons/fa";
import { format } from 'date-fns';

const defaultData = [
    {
        idTarjetaOf: 1,
        of: 'OF6456',
        ofName: 'OF6456-OV3670-UNICEF-Bolsa ecologica con impresión-CANT_OT-400',
        ofProd: 'Bolsa ecologica con impresión',
        ofDesc: 'Bolsa de material liviano y biodegradable, color solido por definir. INICIATIVA DE ACCIÓN HUMANITARIA PARA NIÑEZ EN MOVILIDAD más un cintillo de losgos a una tinta color BLANCO en una posición, para empaque de kit.',
        ofMaquina: 'Maquina 1',
        idPostura: 1,
    },
];

const defaultLabel = [
    {
        name: 'PLANCHAS LISTAS',
        color: 'info', 
    },
    {
        name: 'PAPEL LISTO',
        color: 'dark', 
    },
    {
        name: 'TINTAS LISTAS',
        color: 'failure',
    },
    {
        name: 'XL 105 ',
        color: 'warning',
    },
];

const ModalEditCard = ({ data, isOpen, onClose }) => {

    const [label, setLabel] = useState(defaultLabel);
    const [editData, setEditData] = useState(defaultData);

    const setData = () => {
        setEditData(data);
    }

    useEffect(() => {
        setData();
    }, [data]);

    const date = new Date(Date.now());
    const formattedDate = format(date, "MMM dd, yyyy 'at' hh:mm a");


    return (
        <Modal show={isOpen} size='lg' onClose={onClose} popup>
            <Modal.Header className='p-5'>
                <div className='flex flex-1'>
                    <div className='mr-3'>
                        <SiTask />
                    </div>
                    <div >
                        <h1 >
                            {editData[0]?.ofName}
                        </h1>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body className='p-5'>
                <div className='mb-2'>
                    <p className='text-xs mb-1'>Etiquetas</p>
                    <div className="flex flex-wrap gap-2">
                        {label.map((item, index) => (
                            <Badge size={'sm'} color={item.color} key={index}>{item.name}</Badge>
                        ))}
                    </div>
                </div>
                <div className='mb-2 flex flex-1 gap-3'>
                    <div>
                        <p className='text-xs mb-1'># OF</p>
                        <div className='flex flex-1'>
                            <div className='bg-slate-200 font-bold p-1 flex flex-1 items-center gap-1 rounded'>
                                <div className=''>
                                    <IoMdDocument />
                                </div>
                                <div>
                                    {editData[0]?.of}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className='text-xs mb-1'>Fecha de entrega</p>
                        <div className='flex flex-1'>
                            <div className='bg-slate-200 font-bold p-1 flex flex-1 items-center gap-1 rounded'>
                                <div className=''>
                                    <FaCalendar />
                                </div>
                                <div>
                                    {formattedDate}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className='text-xs mb-1'># Tarjeta</p>
                        <div className='flex flex-1'>
                            <div className='bg-slate-200 font-bold p-1 flex flex-1 items-center gap-1 rounded'>
                                <div className=''>
                                    ID
                                </div>
                                <div>
                                    {editData[0]?.idTarjetaOf}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='my-3'>
                    <div>
                        <p className='text-xs mb-1'>Producto</p>
                    </div>
                    <h3 className='font-semibold'>
                        {editData[0]?.ofProd}
                    </h3>
                </div>
                <div className='my-2'>
                    <div>
                        <p className='text-xs mb-1'>Descripción</p>
                    </div>
                    <div className=''>
                        <textarea 
                            name="ofDesc" 
                            id="ofDesc" 
                            value={editData[0]?.ofDesc} 
                            className='min-h-[150px] h-auto w-full resize-none border-none rounded bg-transparent focus:outline-none'
                            onChange={(e) => setEditData([{...editData[0], ofDesc: e.target.value}])}
                        ></textarea>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModalEditCard;
