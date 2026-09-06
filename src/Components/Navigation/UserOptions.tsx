import {Button} from "../Buttons/Button.tsx";
import {MeatballsMenu} from "../Icon/MeatballsMenu.tsx";
import {Divider, Flex} from "antd";
import {useState} from "react";
import Text from "antd/es/typography/Text";
import {type UserData, UserRole} from "../../types/UserData.ts";
import {userOptionsStyles} from "./css/userOptionsStyles.ts";
import {ConfirmModal} from "../Inputs/ConfirmModal.tsx";
import {text1} from "../../theme/textStyles.ts";
import {useChangeUserRoleMutation, useSetUserStatusByIdMutation, useUsersQuery} from "../../api/userApiSlice.ts";
import {ClosableDiv} from "../General/ClosableDiv.tsx";

export const UserOptions = ({record}: { record: UserData }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalRoleOpen, setModalRoleOpen] = useState<boolean>(false);
    const [setUserStatus, {isLoading}] = useSetUserStatusByIdMutation()
    const [changeUserRole, {isLoading: settingRole}] = useChangeUserRoleMutation()
    const {refetch, } = useUsersQuery()

    const newRole = record.role == UserRole.Admin ? UserRole.Customer : UserRole.Admin

    return (
        <div  style={userOptionsStyles.root}>
            <Button  type={"text"} style={{padding: 0}} onClick={() => setOpen(!open)}>
                <MeatballsMenu size={24} />
            </Button>
            {open &&
                <ClosableDiv onClose={setOpen}>
                <Flex style={userOptionsStyles.popup} vertical align={"start"}>
                    <Button type={"text"} style={userOptionsStyles.item} onClick={() => setModalRoleOpen(true)}>
                        <Text>Make {newRole}</Text>
                    </Button>
                        <Button onClick={() => setModalOpen(!modalOpen)} type={"text"} style={userOptionsStyles.item}>
                            <Text>{record.status ? "Delete" : "Restore"}</Text>
                        </Button>
                    <Divider />
                    <Button type={"text"} style={userOptionsStyles.item}>
                        <Text>View orders</Text>
                    </Button>
                    <Button type={"text"} style={userOptionsStyles.item}>
                        <Text>View reviews</Text>
                    </Button>
                </Flex>
                </ClosableDiv>
            }
            <ConfirmModal
                open={modalRoleOpen}
                onCancel={() => setModalRoleOpen(false)}
                loading={settingRole}
                body={<Text style={text1}>This user will change role to {newRole}</Text>}
                onConfirm={async () => {
                    await changeUserRole({id: record.userId, role: newRole})
                    await refetch()
                    setModalRoleOpen(false)
                }}
            />
            <ConfirmModal
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                loading={isLoading}
                body={<Text style={text1}>This user will be deactivated</Text>}
                onConfirm={async () => {
                    await setUserStatus(record.userId)
                    await refetch()
                    setModalOpen(false)
                }}
                type={record.status ? "danger" : "info"}
                confirmText={record.status ? "Delete" : "Restore"}
            />
        </div>
    )
}