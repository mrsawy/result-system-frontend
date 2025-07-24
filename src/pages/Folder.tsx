import { AddChildFile } from '@/components/AddChildFile';
import { AddChildResultFolder } from '@/components/AddChildResultFolder';
import Icons from '@/components/ui/Icons';
import { Input } from '@/components/ui/input';
import { Backend_URL } from '@/lib/constants';
import { useAuthStore } from '@/lib/store/authStore';
import useGeneralStore from '@/lib/store/generalStore';
import { File } from '@/lib/types/file.interface';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useLoaderData, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";


const Folder: React.FC = () => {
    const folder = useLoaderData() as File;
    const { user } = useAuthStore()
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState<string>("")
    const [children, setChildren] = useState<File[] | undefined>(folder.children || []);
    const location = useLocation();

    const refreshPage = () => {
        navigate(location.pathname, { replace: true });
    };

    useEffect(() => {
        setChildren(folder.children?.filter((child: File) => child.name.includes(searchValue)) || []);
    }, [folder, searchValue])


    const handleClick = async ({ id, type }: { id: string, type: string }) => {
        try {
            if (type === "folder") return
            useGeneralStore.getState().setIsLoading(true);
            const response = await axios.get(`${Backend_URL}/api/file/${id}`)
            const path = response.data.path.match(/^(.*?\.(png|jpe?g|pdf))/i)[1];
            const backendPath = `${Backend_URL}/storage/uploads/${path}`
            window.open(backendPath, '_blank');
        } catch (error) {
            console.error("Error fetching file:", error);
            if (error instanceof AxiosError) {
                Swal.fire({
                    title: "خطأ!",
                    text: "حدث خطأ أثناء فتح الملف. " + (error?.response?.data?.message ?? error.message),
                    icon: "error"
                });
            } else {
                Swal.fire({
                    title: "خطأ!",
                    text: "حدث خطأ أثناء فتح الملف.",
                    icon: "error"
                });
            }
        } finally {
            useGeneralStore.getState().setIsLoading(false);
        }
    }





    const deleteHandler = async (id: string, type: string) => {

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
                const response = await axios.delete(`${Backend_URL}/api/${type}/${id}`);
                console.log({ response })
                if (response.status === 200) {
                    Swal.fire({
                        title: "تم المسح !",
                        text: "تم مسح  بنجاح",
                        icon: "success"
                    });
                    refreshPage();
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
            } finally {
                useGeneralStore.getState().setIsLoading(false);
            }
        }
    }


    return (
        <div className='container my-16 justify-center flex flex-col'>
            {user && <div className='w-full m-auto flex justify-center items-center gap-4 flex-wrap'>
                <AddChildResultFolder />
                <AddChildFile />
            </div>}

            <Input
                value={searchValue}
                onChange={(e) => { setSearchValue(e.target.value) }}
                className='my-5' placeholder='ابحث من هنا' />
            {children && children.length > 0 ? <>
                <div className='flex flex-col gap-3'>
                    {children.map((folder) => (
                        <div
                            className='flex justify-between gap-3 py-4 px-2 border rounded bg-neutral-300 dark:bg-neutral-800 text-center text-xl transition-all hover:opacity-80 '
                        >
                            <NavLink to={folder.type == "folder" ? `/results/${folder.id}` : `#`} className='flex gap-4 cursor-pointer truncate ' onClick={() => handleClick({ id: folder.id, type: folder.type })}>
                                {folder.type == "folder" && <Icons.folder />}
                                {folder.type == "file" && <Icons.file />}

                                <div className='hover:underline underline-offset-8 h-9'> {folder.name} </div>
                            </NavLink>

                            {user && <Icons.delete onClick={() => deleteHandler(folder.id, folder.type)} />}
                        </div>
                    ))}
                </div>
            </> : <div>
                <h1 >لم يتم العثور على أي ملفات</h1>
            </div>
            }
        </div >
    );
};

export default Folder;  