import {Button} from "../../Components/Buttons/Button.tsx";
import {PlusIcon} from "../../Components/Icon/PlusIcon.tsx";
import {useState} from "react";
import {Divider,Modal} from "antd";
import Title from "antd/es/typography/Title";
import {header2} from "../../theme/headerStyles.ts";
import { ccModalStyles, ccmStyle} from "./css/CreateCategoryModalStyles.ts";
import {useForm} from "antd/es/form/Form";
import {CreateOrUpdateCategoryForm} from "../../forms/Category/CreateOrUpdateCategoryForm.tsx";



export type CreateOrUpdateCategoryModalProps = {
    categoryId?: string;
}


export const CreateOrUpdateCategoryModal = ({categoryId}: CreateOrUpdateCategoryModalProps) => {
    const [open, setOpen] = useState(true);
    const [form] = useForm();

    return (
        <>
            <Button type={"text"} style={{padding: 0}} onClick={() => setOpen(!open)}>
                <PlusIcon size={24} />
            </Button>
            <Modal
                title={<>
                    <Title style={header2}>Create category</Title>
                    <Divider />
                </>}
                footer={
                    <>
                        <Button type={"secondary"} style={ccmStyle.footerCancelButtons} onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type={"primary"} style={ccmStyle.footerCreateButton}
                                onClick={() => {
                                    form.submit()
                                }}
                        >Create</Button>
                    </>
                }
                open={open}
                onCancel={() => setOpen(false)}
                closeIcon={null}
                styles={ccModalStyles}
                width={816}
                height={535}
            >
                    <CreateOrUpdateCategoryForm form={form} categoryId={categoryId} />
                </Modal>
        </>
    )
}