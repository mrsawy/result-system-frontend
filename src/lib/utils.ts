import axios from "axios"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Backend_URL } from "./constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function addNewFolder({ name, parentId }: { name: string, parentId?: string }) {
  const response = await axios.post(`${Backend_URL}/api/folder`, {
    name,
    parent_id: parentId,
  })
  console.log(response.data)
  return response.data
}