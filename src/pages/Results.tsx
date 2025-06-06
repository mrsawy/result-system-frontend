import { AddParentResultFolder } from "@/components/AddParentResultFolder";
import { Cta } from "@/components/Cta";
import ParentFolderCard from "@/components/ParentFolderCard";
import { useParentsFolders } from "@/hooks/useParentFolders";
import { useAuthStore } from "@/lib/store/authStore";

function Results() {

    const { data, isLoading } = useParentsFolders();

    console.log("Results data:", data);
    console.log("Results isLoading:", isLoading);

    const { user } = useAuthStore()
    return (
        <div>
            <Cta />
            {user && <div className="container mx-auto px-4 py-8 flex justify-center ">

                <AddParentResultFolder />
            </div>}

            <div className="container mx-auto px-4 py-8 flex flex-wrap gap-8 justify-center items-center">
                {data?.map((folder) => (
                    <ParentFolderCard title={folder.name} id={folder.id} />
                ))}

            </div>
        </div>
    );
}

export default Results;