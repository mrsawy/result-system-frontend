import { LoginButton } from '@/components/LoginButton';
import { useAuthStore } from '@/lib/store/authStore';
import React from 'react';
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router";
import { AxiosError } from "axios";
import { Button } from '@/components/ui/button';
import Icons from '@/components/ui/Icons';
import useGeneralStore from '@/lib/store/generalStore';

const Auth: React.FC = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        const result = await Swal.fire({
            title: " هل أنت متأكد ?",
            text: "لا يمكن العودة !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "إلغاء",
            confirmButtonText: " نعم متأكد !"
        })

        if (result.isConfirmed) {
            try {
                useGeneralStore.getState().setIsLoading(true);
                logout();
                navigate("/")

            }
            catch (error: unknown) {
                console.error("Error deleting word:", error);
                if (error instanceof AxiosError) {
                    Swal.fire({
                        title: "خطأ!",
                        text: "حدث خطأ أثناء الحذف. " + (error?.response?.data?.message ?? error.message),
                        icon: "error"
                    });
                } else {
                    Swal.fire({
                        title: "خطأ!",
                        text: "حدث خطأ أثناء الحذف. ",
                        icon: "error"
                    });
                }
            } finally {
                useGeneralStore.getState().setIsLoading(false);
            }
        }
    };
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            {!user ?
                <div className='flex gap-4 items-center'> Login  <LoginButton /> </div> : <div className='flex gap-4 items-center'>Logout <Button onClick={logoutHandler} variant="outline"><Icons.logout /></Button></div>
            }
        </div>
    );
};

export default Auth;