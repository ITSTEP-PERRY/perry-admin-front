import {useState} from "react";
import {Button} from "../Buttons/Button.tsx";
import {KebabMenuIcon} from "../Icon/KebabMenuIcon.tsx";
import {Flex} from "antd";
import {userOptionsStyles} from "./css/userOptionsStyles.ts";
import {useOutsideClick} from "../../shared/Hooks/useOutsideClick.ts";
import {DeleteModal} from "../Inputs/DeleteModal.tsx";
import Text from "antd/es/typography/Text";
import {text1} from "../../theme/textStyles.ts";

export const UsersOptions = ({users}:{users?: string[]}) => {
    const [open, setOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const ref = useOutsideClick(() => {
        setOpen(false);
    })
    console.log(users)
    return (
        <div ref={ref} style={userOptionsStyles.root}>
            <Button type={"text"} style={{padding: 0}} onClick={()=>setOpen(!open)}>
                <KebabMenuIcon size={24}/>
            </Button>

            {open &&
                <Flex vertical style={userOptionsStyles.popup}>
                    <Button style={{...userOptionsStyles.item, width: "240px"}}
                            type={"text"}>Restore</Button>
                    <Button style={{...userOptionsStyles.item, width: "240px"}}
                            type={"text"}
                            onClick={()=>setDeleteModal(true)}
                    >Delete</Button>
                </Flex>
            }
            <DeleteModal open={deleteModal} setOpen={(open) => setDeleteModal(open)}>
                <Text style={text1}>Your selected users will be deactivated</Text>
            </DeleteModal>
        </div>
    )
}