import {Button, Flex, Image} from "antd";
import {EyeOpenIcon} from "../Icon/EyeOpenIcon.tsx";
import {imageUploadStyles} from "../Inputs/css/imageUploadStyles.ts";
import {TrashcanIcon} from "../Icon/TrashcanIcon.tsx";
import {CloseIcon} from "../Icon/CloseIcon.tsx";
import {useState} from "react";

export type ImagePreviewProps = {
    handleRemoveImage?: () => void;
    previewImage?: string
}

export const ImagePreview = ({...props}: ImagePreviewProps) => {
    const [openPreview, setOpenPreview] = useState(false);
    return (
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
                                       onClick={() => props.handleRemoveImage?.()}
                               >
                                   <TrashcanIcon color={"white"} size={24} width={2} />
                               </Button>
                           </Flex>,
                       closeIcon: <CloseIcon />,
                       onOpenChange: openPreview ? setOpenPreview : undefined
                   }}
               src={props.previewImage}
        />
    )
}