import {type ReactNode} from "react";
import {Divider, Flex, Modal} from "antd";
import {header2} from "../../theme/headerStyles.ts";
import {Header} from "antd/es/layout/layout";
import {confirmModalStyle, confirmModalStyles} from "./css/confirmModalStyles.ts";
import {Button} from "../Buttons/Button.tsx";

export type ConfirmModalProps = {
    onConfirm?: () => void;
    setOpen?: (open: boolean) => void;
    children?: ReactNode;
    open: boolean;
}
export const DeleteModal = (props: ConfirmModalProps) => {
    return (
        <Modal
            styles={confirmModalStyles}
            closeIcon={false}
            open={props.open}
            title={<Flex align={"center"} vertical>
                <Header style={header2}>Are you sure?</Header>
                <Divider />
            </Flex>}
            footer={
                <Flex justify={"space-between"} gap={10}>
                    <Button type={"primary"} style={confirmModalStyle.buttons} onClick={() => props.setOpen?.(false)}>Cancel</Button>
                    <Button type={"destructive"} style={confirmModalStyle.buttons} onClick={props.onConfirm}>Delete</Button>
                </Flex>
            }
            centered
        >
            <Flex justify={"center"}>
                {props.children}
            </Flex>
        </Modal>
    )
}