import {type ComponentProps, type ReactNode, useState} from "react";
import {Divider, Flex, Modal} from "antd";
import {header2} from "../../theme/headerStyles.ts";
import {Header} from "antd/es/layout/layout";
import {confirmModalStyle, confirmModalStyles} from "./css/confirmModalStyles.ts";
import {Button} from "../Buttons/Button.tsx";

export interface ConfirmModalProps extends ComponentProps<"div"> {
    onConfirm?: () => void;
    body?: ReactNode;
}
export const DeleteModal = ({...props}: ConfirmModalProps) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div {...props} style={{width: "100%",...props.style}} onClick={() => setOpen(!open)}>
                {props.children}
            </div>
        <Modal
            styles={confirmModalStyles}
            closeIcon={false}
            open={open}
            title={<Flex align={"center"} vertical>
                <Header style={header2}>Are you sure?</Header>
                <Divider />
            </Flex>}
            footer={
                <Flex justify={"space-between"} gap={10}>
                    <Button type={"primary"} style={confirmModalStyle.buttons} onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type={"destructive"} style={confirmModalStyle.buttons} onClick={() => {
                        props.onConfirm?.()
                        setOpen(false)
                    }}>Delete</Button>
                </Flex>
            }
            centered
        >
            <Flex justify={"center"}>
                {props.body}
            </Flex>
        </Modal>
        </>
    )
}