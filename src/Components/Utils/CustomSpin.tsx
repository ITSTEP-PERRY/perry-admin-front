import {Flex, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import type {CSSProperties, ReactNode} from "react";
import Text from "antd/es/typography/Text";
import {text1} from "../../theme/textStyles.ts";
import {colors} from "../../theme/colors.ts";

export type CustomSpinProps = {
    text?: ReactNode,
    className?: string,
    style?: CSSProperties,
}

export const CustomSpin = ({text, style, className}: CustomSpinProps) => (
    <Flex className={className} style={{height:'100vh', ...style}} align={'center'} justify={"center"} vertical gap={20}>
        <Spin  indicator={<LoadingOutlined color={colors.secondary} style={{ fontSize: 72 }} spin />} />
        <Text style={text1}>{text}</Text>
    </Flex>
)