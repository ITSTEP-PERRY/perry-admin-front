import {Button} from "../../Components/Buttons/Button.tsx";
import {PlusIcon} from "../../Components/Icon/PlusIcon.tsx";
import {useState} from "react";
import {Divider, Flex, Form, Input, Modal, Radio, Space} from "antd";
import Title from "antd/es/typography/Title";
import {header2} from "../../theme/headerStyles.ts";
import {TextInput} from "../../Components/Inputs/TextInput.tsx";
import Text from "antd/es/typography/Text";
import {text1Bold, text2} from "../../theme/textStyles.ts";
import {ccModalStyles, ccmStyle} from "./css/CreateCategoryModalStyles.ts";
import {TextArea} from "../../Components/Inputs/TextArea.tsx";
import {SelectIcon, type SelectOptions} from "../../Components/Select/SelectIcon.tsx";
import Hanger from "../../assets/icons/Hanger.svg"
import {useForm} from "antd/es/form/Form";
import {subcategoryDummyData} from "../../data/dummy/categoryDummyData.ts";
import {Icon} from "../../Components/Icon/Icon.tsx";
import {InfoIcon} from "../../Components/Icon/InfoIcon.tsx";
import {colors} from "../../theme/colors.ts";
import {iconButtonStyles} from "../../theme/commonStyles.ts";
import {SelectCategoryTree} from "../../Components/Select/SelectCategoryTree.tsx";
import {mainCategoryData} from "./CategoryTree.tsx";

const options: SelectOptions[] = [
    { value: "Hello" , label: <img src={Hanger} sizes={"24px"}/>, tooltip: "hanger" },
    { value: "Electronics", label: <img src={Hanger} sizes={"24px"}/>, tooltip: "hanger" },
    { value: "Household", label: <img src={Hanger} sizes={"24px"}/>, tooltip: "hanger" },
    { value: "WorkTools", label: <img src={Hanger} sizes={"24px"}/>, tooltip: "hanger" },

]



export type CreateOrUpdateCategoryModalProps = {
    categoryId?: string;
}


export const CreateOrUpdateCategoryModal = ({categoryId}: CreateOrUpdateCategoryModalProps) => {
    const [open, setOpen] = useState(true);
    const [form] = useForm();
    const categories = mainCategoryData
    const category = !categoryId ? subcategoryDummyData : null;
    const isSubcategory = !!categoryId;

    const initialValues = {
        id: categoryId ?? null,
        categoryIcon: category?.iconUrl,
        categoryName: category?.name,
        isActive: category?.isActive,
        description: category?.description,
        categoryImage: category?.imageUrl,
    }

    const currentIcon: SelectOptions = category?.iconUrl ? {
        label: <Icon icon={category.iconUrl} />,
        value: ""
    } : options[0]

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
                        <Button type={"primary"} style={ccmStyle.footerCreateButton} onClick={() => console.log(form.getFieldsValue())}>Create</Button>
                    </>
                }
                open={open}
                onCancel={() => setOpen(false)}
                closeIcon={null}
                // centered

                styles={ccModalStyles}
                width={816}
                height={535}
            >
                <Form form={form} initialValues={initialValues}>
                    <Form.Item name={"id"} hidden>
                        <input value={category?.id} />
                    </Form.Item>
                    <Flex vertical style={{marginBottom: 80}} justify="start">
                        <Flex justify="space-between" gap={24} style={ccmStyle.flexContainer}>
                                {category?.imageUrl == "none" ?
                                    <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>

                                    </Form.Item>
                                    :
                                    <Button type={"text"} style={ccmStyle.addImgButton}>
                                        <PlusIcon size={64}/>
                                    </Button>

                                }
                            <Flex vertical style={{width:'100%'}} justify="space-between">
                                <Flex align={"center"} gap={10}>
                                    <Form.Item name={"categoryIcon"}>
                                        <SelectIcon options={options} currentValue={currentIcon} onSelect={n => {
                                            form.setFieldValue("icon", n)
                                        }} />
                                    </Form.Item>
                                    <Form.Item name={"categoryName"} style={{width:'100%'}} >
                                        <TextInput
                                            prefix={"Category name"}
                                            placeholder={"Enter category name"}
                                            style={ccmStyle.nameInput}
                                        />
                                    </Form.Item>
                                </Flex>
                                <Flex justify="space-between"  align={"baseline"}>
                                        <Text style={text1Bold}>Status</Text>
                                    <Form.Item name={"isActive"}>
                                        <Radio.Group buttonStyle={"solid"}  defaultValue={true}>
                                            <Flex gap={10}>
                                                <Radio.Button value={true} style={ccmStyle.radioButtons}>Active</Radio.Button>
                                                <Radio.Button value={false} style={ccmStyle.radioButtons}>Not Active</Radio.Button>
                                            </Flex>
                                        </Radio.Group>
                                    </Form.Item>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Form.Item name={"description"}>
                            <TextArea rows={3} count={{max: 300, show: true}} label={"Description"} placeholder={"Describe your category "}/>
                        </Form.Item>

                        {isSubcategory &&
                            <Form.Item name={"parentCategory"}>
                                <SelectCategoryTree categories={categories.subCategories} onSelect={(categoryId) => {
                                    form.setFieldValue("parentCategory", categoryId)
                                }} />
                            </Form.Item>
                        }

                        {category?.id &&
                            <Flex justify="space-between" align={"center"}>
                            <Text style={text1Bold}>Role</Text>
                            <Space align={"center"}>
                                <Text style={text2}>Parent category</Text>
                                <Button type={"text"} style={iconButtonStyles}>
                                    <InfoIcon color={colors.inputBorder} size={24}/>
                                </Button>
                            </Space>
                        </Flex>}
                    </Flex>
                </Form>
            </Modal>
        </>
    )
}