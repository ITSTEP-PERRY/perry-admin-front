import {Flex, Upload, type UploadFile, type UploadProps} from "antd";
import {Button} from "../Buttons/Button.tsx";
import {ccmStyle} from "../../widgets/Category/css/CreateCategoryModalStyles.ts";
import {PlusIcon} from "../Icon/PlusIcon.tsx";
import {type ComponentProps, useState} from "react";
import {ImagePreview} from "../Image/ImagePreview.tsx";
import {colors} from "../../theme/colors.ts";
import Text from "antd/es/typography/Text";
import {text1} from "../../theme/textStyles.ts";


export interface ImageUploadProps  extends ComponentProps<typeof Upload> {
    src?: string;
    srcArray?: string[];
    multiple?: boolean;
    max?: number;
    fileList?: UploadFile[];
    setFileList?: (fileList: UploadFile[]) => void;
    onClick?: (name: number) => void;
}

export const ImageUpload = ({...props} : ImageUploadProps) => {
    const [imagePreview, setImagePreview] = useState<string[]>(props.srcArray ? props.srcArray : props.src ? [props.src] : []);
    const [infileList, setInFileList] = useState<UploadFile[]>([])
    const [selected, setSelected] = useState<number>()
    const fileList = props.fileList ?? infileList
    const setFileList = props.setFileList ?? setInFileList
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
            if (src) setImagePreview([...imagePreview, src]);
            setFileList([...info.fileList]);
        }
        props.onChange?.(info);
    }

    const handleRemoveImage = (image: string) => {
        setFileList([...fileList.filter(f => f.preview !== image)])
        setImagePreview(imagePreview.filter(i => i !== image));
        console.log(fileList)
        // props.onChange({fileList})
    }
    const showUpload = props.multiple ? true : !(imagePreview.length > 0) ;

    return (
        <Flex gap={10} wrap align={"end"}>
            {imagePreview && imagePreview.map((item, i) => (
                <Flex key={i} style={{
                    border: selected === i ? `3px solid ${colors.primary}` : "none",
                    borderRadius: 4,
                    position: "relative"
                }}
                    onClick={() => {
                        setSelected(i)
                        props.onClick?.(i)
                    }}
                      vertical
                      align={"center"}
                >
                    {selected === i && <Text style={{position: "absolute", zIndex: 100, ...text1}}>Primary</Text>}
                    <ImagePreview
                        handleRemoveImage={() => handleRemoveImage(item)}
                        previewImage={item}
                    />
                </Flex>
                ))}

            {showUpload && (
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
        </Flex>
    )
}