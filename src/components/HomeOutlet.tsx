import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { ScrollToTop } from '@/components/ScrollToTop';
import { useAuthStore } from '@/lib/store/authStore';
import axios from 'axios';
import { useEffect } from 'react';
import { Outlet } from "react-router";
import { ToastContainer } from 'react-toastify';
import 'sweetalert2/src/sweetalert2.scss'
import Loader from './Loader';

function HomeOutlet() {

    const token = useAuthStore((state) => state.token)

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    }, [token])


    return (
        <>
            <Loader />
            <Navbar />
            <div className='flex-grow'>
                <Outlet />
            </div>

            <Footer />
            <ScrollToTop />
            <ToastContainer />
        </>
    );
}

export default HomeOutlet;