import { createBrowserRouter } from 'react-router-dom';
import Tablero from './pages/Tablero';
import DefaultLayout from './layout/DefaultLayout';
import NotFound from './pages/NotFound';
import Development from './pages/Development';

const router = createBrowserRouter([

    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/tablero",
                element: <Tablero />
            },
            {
                path: "/dev",
                element: <Development />
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
]);

export default router;