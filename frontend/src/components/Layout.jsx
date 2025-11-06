import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function Layout({ cart, cartCount }) {
    return (
        <>
            <div className="layout-wrapper">
                <Navbar cartCount={cartCount} />
                <main className="flex-grow-1">
                    <Outlet context={{ cart }} />
                </main>
                <Footer />
            </div>
        </>
    );
}

export default Layout;
