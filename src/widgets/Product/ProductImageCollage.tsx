import {Flex, Image, type ImageProps} from "antd";
import type {ProductImageType} from "../../types/ProductType.ts";
import type {CSSProperties} from "react";
import Text from "antd/es/typography/Text";
import {header1} from "../../theme/headerStyles.ts";
import {colors} from "../../theme/colors.ts";

export interface ProductImageCollageProps {
    images: ProductImageType[]
}
export interface ImageCollageItemProps extends ImageProps {
    src?: string
    alt?: string
    style?: CSSProperties
}
export const ImageCollageItem = ({src, alt, style, ...props}:ImageCollageItemProps) => (
    <Image {...props}  src={src} alt={alt} style={{borderRadius: 4, objectFit: "cover", ...style}}/>
)
export const ProductImageCollage = ({images}: ProductImageCollageProps) => {
    const primary = images.find(i => i.isPrimary)
    const notPrimaryImages = images.filter(i => !i.isPrimary)
    const countOfHiddenImages = images.length - 4
    return (
            <Image.PreviewGroup>
                <Flex vertical gap={10}>
                    <ImageCollageItem src={primary?.url} style={{maxHeight: "25vh"}}/>
                    <Flex  justify="space-between">
                        {notPrimaryImages?.filter(i => !i.isPrimary).map((i, index) => (
                            <div key={index}
                                 style={{display: index > 2 ? "none" : "block"}}

                            >
                            <ImageCollageItem src={i.url}
                                              width={140}
                                              height={"100px"}
                                                     preview={{
                                                        mask: index === 2 && countOfHiddenImages &&
                                                                           <Text style={{...header1,
                                                                               color: colors.objects}}>
                                                                               +{countOfHiddenImages}</Text>
                                                    }}
                            />
                            </div>
                        ))}
                    </Flex>
                </Flex>
            </Image.PreviewGroup>
    )
}