import type {ComponentProps} from "react";
import {Flex, Spin} from "antd";
import { LoadingOutlined } from '@ant-design/icons';

export interface LoadingDivProps extends ComponentProps<"div"> {
    isLoading: boolean
}

export const LoadingDiv = (props: LoadingDivProps) => {
    return (
        <div {...props}>
            {props.isLoading ?
                <Flex justify="center"  align={"center"} style={{height: "80vh"}} gap="medium">
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                </Flex>
                :
                <>
                    {props.children}
                </>
            }
        </div>
    )
}