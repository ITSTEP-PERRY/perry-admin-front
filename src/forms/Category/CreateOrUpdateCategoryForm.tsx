import {Divider, Flex, Form, type FormInstance, Radio, Space} from "antd";
import {ccmFormStyles, ccmStyle} from "../../widgets/Category/css/CreateCategoryModalStyles.ts";
import {TextInput} from "../../Components/Inputs/TextInput.tsx";
import {text1, text1Bold, text2} from "../../theme/textStyles.ts";
import {SelectCategoryTree} from "../../Components/Select/SelectCategoryTree.tsx";
import {Button} from "../../Components/Buttons/Button.tsx";
import {PlusIcon} from "../../Components/Icon/PlusIcon.tsx";
import Title from "antd/es/typography/Title";
import type {SelectOptions} from "../../types/SelectOptions.ts";
import {Icon} from "../../Components/Icon/Icon.tsx";
import Hanger from "../../assets/icons/Hanger.svg";
import Text from "antd/es/typography/Text";
import {SelectIcon} from "../../Components/Select/SelectIcon.tsx";
import {InfoIcon} from "../../Components/Icon/InfoIcon.tsx";
import {iconButtonStyles} from "../../theme/commonStyles.ts";
import {colors} from "../../theme/colors.ts";
import {header3} from "../../theme/headerStyles.ts";
import {TrashcanIcon} from "../../Components/Icon/TrashcanIcon.tsx";
import {TextArea} from "../../Components/Inputs/TextArea.tsx";
import {useCategoriesQuery} from "../../api/categoryApiSlice.ts";
import {useAppSelector} from "../../app/hooks.ts";
import {getCurrentCategory} from "../../app/slices/categorySlice.ts";


const options: SelectOptions[] = [
    { value: "Hello" , label: <img src={Hanger} sizes={"24px"}/>, tooltip: "hanger" },
    { value: "Electronics", label: <img src={Hanger} sizes={"24px"}/>, tooltip: "hanger" },
    { value: "Household", label: <img src={Hanger} sizes={"24px"}/>, tooltip: "hanger" },
    { value: "WorkTools", label: <img src={Hanger} sizes={"24px"}/>, tooltip: "hanger" },

]

type CreateOrUpdateCategoryFormProps = {
    categoryId?: string,
    parentId?: string | null,
    form: FormInstance
}



export const CreateOrUpdateCategoryForm = ({categoryId,parentId, form}:CreateOrUpdateCategoryFormProps) => {

    const exist = !!categoryId;
    const {data: categories} = useCategoriesQuery()
    const category = useAppSelector(getCurrentCategory)

    const currentIcon: SelectOptions = category?.iconUrl ? {
        label: <Icon icon={category.iconUrl} />,
        value: ""
    } : options[0]

    const onFinishFailed = () => {

    }

    return (
        <Form form={form}
              initialValues={exist ? category : {}}
              styles={ccmFormStyles}
              onFinishFailed={onFinishFailed}
        >
            <Form.Item name={"id"} hidden>
                <input value={category?.id} />
            </Form.Item>
            <Flex vertical style={{marginBottom: 80}} justify="start">
                <Flex justify="space-between" gap={24} style={ccmStyle.flexContainer}>
                    {category?.imageUrl == "none" ?
                        <Form.Item label="Upload" valuePropName="fileList" >

                        </Form.Item>
                        :
                        <Button type={"text"} style={ccmStyle.addImgButton}>
                            <PlusIcon size={64}/>
                        </Button>

                    }
                    <Flex vertical style={{width:'100%'}} justify="space-between">
                        <Flex  gap={10}>
                            <Form.Item name={"categoryIcon"} style={{alignSelf:"center"}}>
                                <SelectIcon options={options}
                                            currentValue={currentIcon} onSelect={n => {
                                            form.setFieldValue("icon", n)
                                }} />
                            </Form.Item>
                            <Form.Item name={"name"} style={{width:'100%'}} rules={[
                                {required: true, message: "This field cannot be empty."},
                            ]} validateTrigger={"onSubmit"}
                            >
                                <TextInput
                                    status={"error"}
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
                <Form.Item name={"description"} rules={[{max: 300}]}>
                    <TextArea rows={3} count={{max: 300, show: true}} label={"Description"} placeholder={"Describe your category "}/>
                </Form.Item>

                {parentId &&
                    <Form.Item name={"parentCategoryId"}  rules={[
                        {
                            required: true,
                            message: "Subcategory cannot be created without the main category.",
                        },
                    ]} validateTrigger={"onSubmit"}>
                        <SelectCategoryTree placeholder={categoryId} categories={categories} value={categoryId}/>
                    </Form.Item>
                }

                {category?.id && !parentId &&
                    <Flex justify="space-between" align={"center"}>
                        <Text style={text1Bold}>Role</Text>
                        <Space align={"center"}>
                            <Text style={text2}>Parent category</Text>
                            <Button type={"text"} style={iconButtonStyles}>
                                <InfoIcon color={colors.inputBorder} size={24}/>
                            </Button>
                        </Space>
                    </Flex>}

                {parentId &&
                    <>
                        <Title style={header3}>Property keys</Title>
                        <Divider />
                        <Form.List name={"properties"}>
                            {(fields, {add, remove}) => (
                                <>
                                    {fields.map((field) => (
                                        <Form.Item
                                            key={field.key}
                                            noStyle

                                        >
                                                <Form.Item
                                                    {...field}
                                                    style={ccmStyle.propsItem}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            whitespace: true,
                                                            message: "Please input property key or delete this field.",
                                                        },
                                                    ]}
                                                >
                                                    <Flex align={"center"} gap={10}>

                                                    <TextInput prefix="Property key" style={{padding: 10, margin: 0}}/>
                                                        <Button type={"destructive"} onClick={() => remove(field.name)} style={{padding: 10, height: "100%"}}>
                                                            <TrashcanIcon size={24} color={colors.destructive}/>
                                                        </Button>
                                                    </Flex>

                                                </Form.Item>

                                        </Form.Item>


                                    ))}

                                    <Button type={"secondary"}
                                            onClick={() => add("",0)}
                                            style={ccmStyle.addProps}
                                    >
                                        <PlusIcon size={28} color={colors.secondary}/>
                                        <Text style={text1}>Add property key</Text>
                                    </Button>
                                </>
                            )}
                        </Form.List>
                    </>
                }
            </Flex>
        </Form>

    )
}
