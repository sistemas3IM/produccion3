import { Outlet } from 'react-router-dom';
import { SideBar, SideBarItem } from '../components/SideBar';
import { MdDashboard } from 'react-icons/md';
import { TbReportSearch } from 'react-icons/tb';

const DefaultLayout = () => {

    return (
        <main className='flex overflow-x-hidden'>
            <SideBar>
                <SideBarItem icon={<MdDashboard size={20} />} text={'Tableros'} active linkTo={"/tablero"} />
                <SideBarItem icon={<TbReportSearch size={20} />} text={'Reportes'} />
            </SideBar>
            <div className='flex-1 bg-neutral-300 overflow-auto'>
                    <Outlet />
            </div>
        </main>
    )
}

export default DefaultLayout