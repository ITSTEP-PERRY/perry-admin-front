import {type ComponentProps, type ReactNode, useState} from "react";
import {Divider, Flex, Modal} from "antd";
import {header2} from "../../theme/headerStyles.ts";
import {Header} from "antd/es/layout/layout";
import {confirmModalStyle, confirmModalStyles} from "./css/confirmModalStyles.ts";
import {Button} from "../Buttons/Button.tsx";

export interface DeleteModalProps extends ComponentProps<"div"> {
    onConfirm?: () => Promise<void>;
    onCancel?: () => void;
    body?: ReactNode;
    open?: boolean;
    loading?: boolean;
    type?: "danger" | "info" | "warning";
    title?: string;
    confirmText?: string;
}
export const ConfirmModal = ({...props}: DeleteModalProps) => {
    const [open, setOpen] = useState(props.open ?? false);
    return (
        <>
            <div {...props} style={{width: "100%",...props.style}} onClick={() => setOpen(!open)}>
                {props.children}
            </div>
        <Modal
            styles={confirmModalStyles}
            closeIcon={false}
            open={props.open ?? open}
            title={<Flex align={"center"} vertical>
                <Header style={header2}>{props.title ? props.title : "Are you sure?"}</Header>
                <Divider />
            </Flex>}
            footer={
                <Flex justify={"space-between"} gap={10}>
                    <Button type={
                        props.type === "danger" ?
                            "primary" : "secondary"
                    } style={confirmModalStyle.buttons} onClick={() => {
                        setOpen(false)
                        props.onCancel?.()
                    }}>Cancel</Button>

                    <Button loading={props.loading} type={
                        props.type === "danger" ?
                            "destructive" : "primary"
                    } style={confirmModalStyle.buttons} onClick={async () => {
                        await props.onConfirm?.()
                        setOpen(false)
                    }}>{props.confirmText ? props.confirmText : "Confirm"}</Button>
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