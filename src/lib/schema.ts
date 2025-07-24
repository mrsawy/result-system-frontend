import { object, string, InferType, mixed } from 'yup';

export const FolderSchema = object({
    name: string()
        .required('Folder name is required'),
    parentId: string()
        .optional()
});

export const FileSchema = object({
    file: mixed<FileList>()
        .test(
            "fileSize",
            "File is too large",
            (value) =>
                value && value[0]
                    ? value[0].size <= 1024 * 1024 * 16 // 16MB
                    : true
        )
        .test(
            "isValidType",
            "File must be an image (jpg/jpeg/png/webp) or a PDF",
            (value) => {
                if (!value || !value[0]) return true;

                const type = value[0].type;
                return [
                    "image/jpg",
                    "image/jpeg",
                    "image/png",
                    "image/webp",
                    "application/pdf"
                ].includes(type);
            }
        )
        .required("File is required"),
    parentId: string()
        .required("Parent ID is required")
});

export type FolderSchemaType = InferType<typeof FolderSchema>;
export type FileSchemaType = InferType<typeof FileSchema>;
