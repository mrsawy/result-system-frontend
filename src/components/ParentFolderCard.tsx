import React from 'react';
import { Navigate, NavLink } from 'react-router';
import Icons from './ui/Icons';
import { useAuthStore } from '@/lib/store/authStore';
import Swal from "sweetalert2";
import axios, { AxiosError } from 'axios';
import { Backend_URL } from '@/lib/constants';
import { useQueryClient } from '@tanstack/react-query';
import useGeneralStore from '@/lib/store/generalStore';

interface Props {
    title: string
    id: string
}

const ParentFolderCard: React.FC<Props> = ({ title, id }) => {

    const { user } = useAuthStore();
    const queryClient = useQueryClient()



    const deleteHandler = async (id: string) => {

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

                const response = await axios.delete(`${Backend_URL}/api/folder/${id}`);
                console.log({ response })
                if (response.status === 200) {
                    queryClient.invalidateQueries({ queryKey: ['parentsFolders'] });
                    Swal.fire({
                        title: "تم المسح !",
                        text: "تم مسح الجائزة بنجاح",
                        icon: "success"
                    });
                }
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
            }finally{
                useGeneralStore.getState().setIsLoading(false);
            }
        }
    }


    return (
        <div className=''>
            <div className="flex justify-between max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-zinc-800 dark:border-gray-700 w-80">
                <div>

                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"><Icons.folder />{title}</h5>
                    <NavLink to={`/results/${id}`} className="inline-flex font-medium items-center text-blue-600 hover:underline">
                        إستكشاف
                        <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
                        </svg>
                    </NavLink>
                </div>
                {user && <Icons.delete onClick={() => deleteHandler(id)} />}
            </div>
        </div>
    );
};

export default ParentFolderCard;