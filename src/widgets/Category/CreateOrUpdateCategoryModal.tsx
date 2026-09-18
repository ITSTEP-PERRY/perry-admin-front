import {Button} from "../../Components/Buttons/Button.tsx";
import {PlusIcon} from "../../Components/Icon/PlusIcon.tsx";
import {type ComponentProps, useState} from "react";
import {Divider,Modal} from "antd";
import Title from "antd/es/typography/Title";
import {header2} from "../../theme/headerStyles.ts";
import { ccModalStyles, ccmStyle} from "./css/CreateCategoryModalStyles.ts";
import {useForm} from "antd/es/form/Form";
import {CreateOrUpdateCategoryForm} from "../../forms/Category/CreateOrUpdateCategoryForm.tsx";
import {useCreateCategoryMutation, useUpdateCategoryMutation} from "../../api/slices/categoryApiSlice.ts";



export interface CreateOrUpdateCategoryModalProps extends ComponentProps<"div">{
    isSubcategory?: boolean;
    edit?: boolean;
}


export const CreateOrUpdateCategoryModal = ({...props}: CreateOrUpdateCategoryModalProps) => {
    const [open, setOpen] = useState(false);
    const [form] = useForm();
    const [,{isLoading: createLoading}] = useCreateCategoryMutation()
    const [,{isLoading: updateLoading}] = useUpdateCategoryMutation()

    return (
        <div {...props}>
            <span  onClick={(e) => {
                e.stopPropagation();
                form.resetFields();
                setOpen(!open)
            }}>
                {props.children ? props.children :
                    <Button type={"text"} style={{padding: 0}}>
                    <PlusIcon size={24}/>
                </Button>}
            </span>
            <Modal
                title={<>
                    <Title style={header2}>Create category</Title>
                    <Divider />
                </>}
                footer={
                    <>
                        <Button type={"secondary"} style={ccmStyle.footerCancelButtons} onClick={() => {
                            setOpen(false)
                        }}>Cancel</Button>
                        <Button type={"primary"}
                                loading={createLoading || updateLoading}
                                style={ccmStyle.footerCreateButton}
                                onClick={async () => {
                                    form.submit()
                                    setOpen(false)
                                }}
                        >{props.edit ? "Update" : "Create"}</Button>
                    </>
                }
                open={open && !createLoading && !updateLoading}
                onCancel={() => setOpen(false)}
                closeIcon={null}
                styles={ccModalStyles}
                width={816}
                height={535}
            >
                    <CreateOrUpdateCategoryForm
                        form={form}
                        isSubcategory={!!props.isSubcategory}
                        edit={props.edit}
                    />
                </Modal>
        </div>
    )
}