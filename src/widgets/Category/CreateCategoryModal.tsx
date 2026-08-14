import {Button} from "../../Components/Buttons/Button.tsx";
import {PlusIcon} from "../../Components/Icon/PlusIcon.tsx";
import {useState} from "react";
import {Divider, Modal} from "antd";
import Title from "antd/es/typography/Title";
import {header2} from "../../theme/headerStyles.ts";

export const CreateCategoryModal = () => {
    const [open, setOpen] = useState(true);
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
                open={open}
                onCancel={() => setOpen(false)}
                closeIcon={null}
                centered
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    )
}