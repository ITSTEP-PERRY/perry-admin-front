import {useState} from "react";
import {Button} from "../Buttons/Button.tsx";
import {KebabMenuIcon} from "../Icon/KebabMenuIcon.tsx";
import {Flex} from "antd";
import {userOptionsStyles} from "./css/userOptionsStyles.ts";
import {ConfirmModal} from "../Inputs/ConfirmModal.tsx";
import Text from "antd/es/typography/Text";
import {text1} from "../../theme/textStyles.ts";
import {useSetUsersStatusMutation} from "../../api/slices/userApiSlice.ts";

export type UsersOptionsProps = {
    users: string[],
    setUsers: (v: string[]) => void,
}

export const UsersOptions = ({users, setUsers}:UsersOptionsProps) => {
    const [open, setOpen] = useState(false);
    const [openStatus, setOpenStatus] = useState({
        status: false,
        open: false
    });
    const [setUsersStatus, {isLoading}] = useSetUsersStatusMutation()
    const isRestoring  = openStatus.status
    return (
        <>
            <div style={userOptionsStyles.root}>
                <Button type={"text"} style={{padding: 0}} onClick={()=>setOpen(!open)}>
                    <KebabMenuIcon size={24}/>
                </Button>

                {open &&
                        <Flex vertical style={userOptionsStyles.popup}>
                            <Button style={{...userOptionsStyles.item, width: "240px"}}
                                    onClick={() => setOpenStatus({open: true, status: true})}
                                    type={"text"}>
                                Restore
                            </Button>

                                <Button style={{...userOptionsStyles.item, width: "240px"}}
                                        type={"text"}
                                        onClick={() => setOpenStatus({open: true, status: false})}
                                >
                                    Delete
                                </Button>
                        </Flex>
                }

            </div>
                <ConfirmModal type={isRestoring ? "info" : "danger"}
                              open={openStatus.open}
                              loading={isLoading}
                              onCancel={() => {
                                  console.log("calse")
                                  setOpenStatus({...openStatus, open: false})
                              }}
                              confirmText={isRestoring ? "Confirm" : "Delete"}
                              body={<Text style={text1}>Your selected users will be {isRestoring ? "Restored" : "Deactivated"}</Text>}
                              onConfirm={async () => {
                                  if (users) await setUsersStatus({ids: users, status: openStatus.status})
                                  setOpenStatus({...openStatus, open: false})
                                  setUsers([])
                              }}

                />
            </>
    )
}