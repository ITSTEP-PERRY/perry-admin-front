import {Flex, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import type {ReactNode} from "react";
import Text from "antd/es/typography/Text";
import {text1} from "../../theme/textStyles.ts";
import {colors} from "../../theme/colors.ts";

export const CustomSpin = ({text}: {text?: ReactNode}) => (
    <Flex style={{height:'100vh'}} align={'center'} justify={"center"} vertical gap={20}>
        <Spin  indicator={<LoadingOutlined color={colors.secondary} style={{ fontSize: 72 }} spin />} />
        <Text style={text1}>{text}</Text>
    </Flex>
)