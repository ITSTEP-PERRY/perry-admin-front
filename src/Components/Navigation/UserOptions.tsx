import {Button} from "../Buttons/Button.tsx";
import {MeatballsMenu} from "../Icon/MeatballsMenu.tsx";
import {Divider, Flex} from "antd";
import {useState} from "react";
import Text from "antd/es/typography/Text";
import {type UserData, UserRole} from "../../types/UserData.ts";
import {userOptionsStyles} from "./css/userOptionsStyles.ts";
import {useOutsideClick} from "../../shared/Hooks/useOutsideClick.ts";
import {DeleteModal} from "../Inputs/DeleteModal.tsx";
import {text1} from "../../theme/textStyles.ts";

export const UserOptions = ({record}: { record: UserData }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const ref = useOutsideClick(() => {
        setOpen(false);
    })

    return (
        <div ref={ref} style={userOptionsStyles.root}>
            <Button  type={"text"} style={{padding: 0}} onClick={() => setOpen(!open)}>
                <MeatballsMenu size={24} />
            </Button>
            {open &&
                <Flex style={userOptionsStyles.popup} vertical align={"start"}>
                    <Button type={"text"} style={userOptionsStyles.item}>
                        <Text>Make {record.role == UserRole.Admin ? UserRole.Customer : UserRole.Admin}</Text>
                    </Button>
                    <Button type={"text"} style={userOptionsStyles.item} onClick={() => setDeleteModal(true)}>
                        <Text>Delete</Text>
                    </Button>
                    <Divider />
                    <Button type={"text"} style={userOptionsStyles.item}>
                        <Text>View orders</Text>
                    </Button>
                    <Button type={"text"} style={userOptionsStyles.item}>
                        <Text>View reviews</Text>
                    </Button>
                </Flex>
            }
            <DeleteModal open={deleteModal} setOpen={(open) => setDeleteModal(open)}>
                <Text style={text1}>This user will be deactivated</Text>
            </DeleteModal>
        </div>
    )
}