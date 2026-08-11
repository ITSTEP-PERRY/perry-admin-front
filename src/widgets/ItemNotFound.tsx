import ItemNotFoundImage from "../assets/images/ItemNotFound.png"
import Text from "antd/es/typography/Text";
import {text1} from "../theme/textStyles.ts";
import {Flex} from "antd";
import type {CSSProperties} from "react";

export type ItemNotFoundProps = {
    text: string;
    style?: CSSProperties;
}

export const ItemNotFound = ({text, style}: ItemNotFoundProps) => {
    return (
        <Flex vertical align={"center"} style={style} gap={16}>
            <img src={ItemNotFoundImage} alt={text} width="320px"/>
            <Text style={text1}>{text}</Text>
        </Flex>
    )
}