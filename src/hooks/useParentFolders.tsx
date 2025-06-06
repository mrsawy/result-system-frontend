import { Backend_URL } from "@/lib/constants";
import { File } from "@/lib/types/file.interface";
import { useQuery } from "@tanstack/react-query"

const fetchParentFolders = async () => {
    const response = await fetch(`${Backend_URL}/api/folder`);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const result = await response.json();
    const data = result.data || [];
    return data;
}

export const useParentsFolders = () => {
    return useQuery<File[]>({ queryKey: ["parentsFolders"], queryFn: fetchParentFolders });
}