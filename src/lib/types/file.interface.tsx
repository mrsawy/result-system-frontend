export interface File {
    id: string
    name: string
    type: "file" | "folder"
    createdAt: string
    updatedAt: string
    parentId?: string
    children?: File[]
    path?: string
}