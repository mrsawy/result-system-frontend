import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button, buttonVariants } from "./ui/button";
import { Icon, Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { LogoIcon } from "./Icons";
import { NavLink, useNavigate } from "react-router";
import { LoginButton } from "./LoginButton";
import { useAuthStore } from "@/lib/store/authStore";
import Icons from "./ui/Icons";
import Swal from "sweetalert2";
import { AxiosError } from "axios";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#",
    label: "الأخبار التربوية",
  },
  {
    href: "/results",
    label: "النتائج الدراسية",
  },
  {
    href: "#",
    label: "الكتب المدرسية",
  },
  {
    href: "#",
    label: "الملازم المدرسية",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
      }
    }
  };


  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex flex-row-reverse justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <NavLink
              rel="noreferrer noopener"
              to="/"
              className="ml-2 font-bold text-xl flex gap-3"
            >
              النتائج الدراسية
              <LogoIcon />
            </NavLink>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex flex-row-reverse md:hidden">
            <ModeToggle />

            <Sheet
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    Shadcn/React
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <NavLink
                      rel="noreferrer noopener"
                      key={label}
                      to={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </NavLink>
                  ))}
                  {/* <a
                    rel="noreferrer noopener"
                    href="https://github.com/leoMirandaa/shadcn-landing-page.git"
                    target="_blank"
                    className={`w-[110px] border ${buttonVariants({
                      variant: "secondary",
                    })}`}
                  >
                    <GitHubLogoIcon className="mr-2 w-5 h-5" />
                    Github
                  </a> */}
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <NavLink
                rel="noreferrer noopener"
                to={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            {/* <a
              rel="noreferrer noopener"
              href="https://github.com/leoMirandaa/shadcn-landing-page.git"
              target="_blank"
              className={`border ${buttonVariants({ variant: "secondary" })}`}
            >
              <GitHubLogoIcon className="mr-2 w-5 h-5" />
              Github
            </a> */}

            <ModeToggle />
            {/* {!user ?
              <LoginButton /> : <Button onClick={logoutHandler} variant="outline"><Icons.logout /></Button>
            } */}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
