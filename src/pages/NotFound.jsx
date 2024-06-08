import React from 'react';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-blue-950">404</h1>
                <p className="text-2xl text-gray-600">Página no encontrada</p>
                <p className="text-gray-500">¡Oops! La página que estás buscando no existe.</p>
            </div>
        </div>
    );
};

export default NotFound;