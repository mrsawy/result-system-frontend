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
import { useAuthStore } from "@/lib/store/authStore"
import { toast } from "react-toastify"
import useGeneralStore from "@/lib/store/generalStore"
import { NavLink, useNavigate } from "react-router";

export function LoginButton() {
    const navigate = useNavigate();
    const { login } = useAuthStore()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {

            useGeneralStore.getState().setIsLoading(true);
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const { email, password } = Object.fromEntries(formData.entries())
            await login(email as string, password as string);
            toast.success("تم تسجيل الدخول بنجاح");
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
            toast.error("فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك.");
        } finally {
            useGeneralStore.getState().setIsLoading(false);
        }
    }
    return (
        <Dialog defaultOpen={true} >
            <DialogTrigger asChild>
                <Button variant="outline"><Icons.login /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" dir="rtl" >
                <form className="w-full" onSubmit={handleSubmit} >
                    <DialogHeader dir="rtl" className="flex-col ">
                        <DialogTitle className="text-center">تسجيل الدخول</DialogTitle>
                        <DialogDescription>
                            سجل الدخول لتتمكن من حفظ نتائجك الدراسية
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="email">البريد الإلكتروني </Label>
                            <Input id="email" name="email" placeholder="@admin" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="password">كلمة السر</Label>
                            <Input id="password" name="password" placeholder="********" />
                        </div>
                    </div>
                    <DialogFooter className="flex gap-5 mt-4">
                        <DialogClose asChild>
                            <Button variant="outline">الغاء</Button>
                        </DialogClose>
                        <Button type="submit">تسجيل</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}
