import {Flex, Image, Upload, type UploadFile, type UploadProps} from "antd";
import {Button} from "../Buttons/Button.tsx";
import {ccmStyle} from "../../widgets/Category/css/CreateCategoryModalStyles.ts";
import {PlusIcon} from "../Icon/PlusIcon.tsx";
import {type ComponentProps, useState} from "react";
import {TrashcanIcon} from "../Icon/TrashcanIcon.tsx";
import {EyeOpenIcon} from "../Icon/EyeOpenIcon.tsx";
import {imageUploadStyles} from "./css/imageUploadStyles.ts";
import {CloseIcon} from "../Icon/CloseIcon.tsx";


export interface ImageUploadProps  extends ComponentProps<typeof Upload> {
    src?: string;
}

export const ImageUpload = ({...props} : ImageUploadProps) => {
    const [imagePreview, setImagePreview] = useState<string>(props.src ?? "");
    const [openPreview, setOpenPreview] = useState<boolean>(false);
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const getFileSrc = async (file: UploadFile) => {
        if (file.url) {
            return file.url;
        }

        if (!file.preview && file.originFileObj) {
            file.preview = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as Blob);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = (error) => reject(error);
            });
        }

        return file.preview;
    };

    const handleChange: UploadProps["onChange"] = async (info) => {
        const latestFile = info.fileList[info.fileList.length - 1];
        if (latestFile) {
            const src = await getFileSrc(latestFile);
            setImagePreview(src ?? "");
            setFileList([...info.fileList]);
        }
        props.onChange?.(info);
    }

    const handleRemoveImage = () => {
        setFileList([])
        setImagePreview("");
    }

    return (
        <>
            {!imagePreview && (
                <Upload {...props}
                        showUploadList={false}
                        beforeUpload={() => false}
                        onChange={handleChange}
                        fileList={fileList}
                >
                    <Button type={"text"} style={ccmStyle.addImgButton}>
                        <PlusIcon size={64}/>
                    </Button>
                </Upload>
            )}

            {imagePreview && (
                    <Image style={{position: "relative"}}
                        styles={{ image: { width: 128, height: 128, borderRadius: 4 } }}
                        preview={
                        {open:  openPreview,
                            mask:
                                <Flex style={imageUploadStyles.image} gap={10}>
                                    <Button type={"text"}
                                            style={imageUploadStyles.button}
                                            onClick={() => setOpenPreview(true)}
                                    >
                                        <EyeOpenIcon color={"white"} size={24} width={2} />
                                    </Button>
                                    <Button type={"text"}
                                            style={imageUploadStyles.button}
                                            onClick={() => handleRemoveImage()}
                                    >
                                        <TrashcanIcon color={"white"} size={24} width={2} />
                                    </Button>
                                </Flex>,
                            closeIcon: <CloseIcon />,
                            onOpenChange: setOpenPreview
                        }}
                        src={imagePreview}
                    />
            )}
        </>
    )
}