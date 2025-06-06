import { object, string, InferType, mixed } from 'yup';

export const FolderSchema = object({
    name: string()
        .required('Folder name is required'),
    parentId: string()
        .optional()

});
export const FileSchema = object({
    file: mixed()
        .test(
            "fileSize",
            "file is too large",
            (value: any) => (value && value[0] ? value[0].size <= 1024 * 1024 * 16 : true) // 16MB limit
        )
        .test("isImage", "File must be valid", function (value: any) {
            if (value == "undefined" || value)
                return (
                    value &&
                    (value.type === "image/jpg" ||
                        value.type === "image/jpeg" ||
                        value.type === "image/png" ||
                        value.type === "image/webp") ||
                    value.type === "application/pdf"

                );
            else {
                return true;
            }
        }),
    parentId: string()
        .required()

});


export type FolderSchemaType = InferType<typeof FolderSchema>;