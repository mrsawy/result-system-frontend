import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Icons from "./ui/Icons"
import { addNewFolder } from "@/lib/utils"
import { FolderSchema } from "@/lib/schema"
import { toast } from "react-toastify"
import { useQueryClient } from '@tanstack/react-query';
import useGeneralStore from "@/lib/store/generalStore"

export function AddParentResultFolder() {
    const queryClient = useQueryClient()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            useGeneralStore.getState().setIsLoading(true);

            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const { name } = Object.fromEntries(formData.entries())
            FolderSchema.validateSync({ name })
            console.log({ name })
            await addNewFolder({ name: name as string });
            queryClient.invalidateQueries({ queryKey: ['parentsFolders'] });
            toast.success("تم إضافة الفولدر بنجاح");

        } catch (error) {
            toast.error("حدث خطأ أثناء إضافة الفولدر");
            console.error("Login failed:", error);
        } finally {
            useGeneralStore.getState().setIsLoading(false);
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button ><Icons.add /> اضافة فولدر جديد</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" dir="rtl" >
                <form className="w-full" onSubmit={handleSubmit} >
                    <DialogHeader dir="rtl" className="flex-col ">
                        <DialogTitle className="text-center">إضافة فولدر جديد </DialogTitle>
                        <DialogDescription>
                            إضافة فولدر جديد هنا                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name"> عنوان </Label>
                            <Input id="name" name="name" placeholder="اضف العنوان هنا .." />
                        </div>
                    </div>
                    <DialogFooter className="flex gap-5 mt-4">
                        <DialogClose asChild>
                            <Button variant="outline">الغاء</Button>
                        </DialogClose>
                        <Button type="submit">إضافة</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}
