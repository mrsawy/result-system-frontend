import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"
import Icons from "./ui/Icons"
import { FileSchema } from "@/lib/schema"
import { toast } from "react-toastify"
import { useLocation, useNavigate, useParams } from "react-router"
import { useState } from "react"
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { Backend_URL } from "@/lib/constants"
import axios from "axios"
import useGeneralStore from "@/lib/store/generalStore"



registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


export function AddChildFile() {
    const [open, setOpen] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [mainImage, setMainImage] = useState<any[]>([]);

    const refreshPage = () => {
        navigate(location.pathname, { replace: true });
    };

    const handleUpdateMainImage = (fileItems: any) => {
        setMainImage(fileItems.map((fileItem: any) => fileItem.file));
    }

    const handleUploadFile = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            useGeneralStore.getState().setIsLoading(true);

            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            mainImage.forEach((image) => {
                formData.append(`file`, image);
            });
            formData.append(`parent_id`, id as string);

            const { file } = Object.fromEntries(formData.entries())
            FileSchema.validateSync({ file, parentId: id })
            console.log({ name })


            const response = await axios.post(`${Backend_URL}/api/file`, formData)
            console.log(response.data)

            // await addNewFolder({ name: name as string, parentId: id });
            // queryClient.invalidateQueries({ queryKey: ['parentsFolders'] });
            toast.success("تم إضافة الملف بنجاح");
            setOpen(false);

            refreshPage()
        } catch (error) {
            toast.error("حدث خطأ أثناء إضافة الملف");
            console.error("Login failed:", error);
        } finally {
            useGeneralStore.getState().setIsLoading(false);
        }


    };
    //



    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <Button ><Icons.add /> اضافة ملف جديد</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" dir="rtl" >
                <FilePond
                    files={mainImage}
                    onupdatefiles={handleUpdateMainImage}
                    allowMultiple={false}
                    maxFiles={1}
                    acceptedFileTypes={["image/png"]}
                    labelIdle='Drag & Drop Your Image or <span class="filepond--label-action">Browse</span>'
                />
                <form onSubmit={handleUploadFile}>
                    <DialogFooter className="flex gap-5 mt-4">
                        <DialogClose asChild>
                            <Button variant="outline" type="button">الغاء</Button>
                        </DialogClose>
                        <Button type="submit">إضافة</Button>
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog >
    )
}
