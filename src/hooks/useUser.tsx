import { Backend_URL } from "@/lib/constants";
import { File } from "@/lib/types/file.interface";
import { useQuery } from "@tanstack/react-query"
// import { QueryFunctionContext } from "@tanstack/react-query";

export const fetchFolder = async ({ id }: { id: string }) => {
    const response = await fetch(`${Backend_URL}/api/folder/${id}`);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result;
};

export const useFolder = ({ id }: { id: string }) => {

    return useQuery<File[]>({
        queryKey: ["folder", id],
        queryFn: ({ queryKey }) => fetchFolder({ id: queryKey[1] as string })
    });
};

