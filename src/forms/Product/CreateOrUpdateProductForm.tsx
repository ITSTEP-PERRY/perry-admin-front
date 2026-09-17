import {Divider, Flex, Form, type FormInstance, Space, type UploadFile} from "antd";
import Title from "antd/es/typography/Title";
import {header2} from "../../theme/headerStyles.ts";
import {TextInput} from "../../Components/Inputs/TextInput.tsx";
import {SelectCategoryTree} from "../../Components/Select/SelectCategoryTree.tsx";
import {useCategoriesQuery} from "../../api/slices/categoryApiSlice.ts";
import {createOrUpdateProductFormStyles} from "./css/CreateOrUpdateProductFormStyles.ts";
import {ImageUpload} from "../../Components/Inputs/ImageUpload.tsx";
import Text from "antd/es/typography/Text";
import {text1} from "../../theme/textStyles.ts";
import {useState} from "react";
import {colors} from "../../theme/colors.ts";
import {InfoIcon} from "../../Components/Icon/InfoIcon.tsx";

export type CreateOrUpdateProductFormProps = {
    form: FormInstance
}

const MAX_PRODUCTS_IMG = 10;

export const CreateOrUpdateProductForm = ({form}: CreateOrUpdateProductFormProps) => {
    const {data: categories} = useCategoriesQuery()
    const [fileList, setFileList] = useState<UploadFile[]>()
    const imageCount = fileList?.length ?? 0
    return(
        <Form form={form} styles={createOrUpdateProductFormStyles}>
            <Flex id={"general-info"} vertical>
                <Title style={header2}>General information</Title>
                <Divider />
                <Form.Item name={"name"} rules={[{required:true}]}>
                    <TextInput prefix={"Name"} placeholder={"Enter product name..."} />
                </Form.Item>
                <Form.Item name={"code"} rules={[{required:true}]}>
                    <TextInput prefix={"Code"} placeholder={"Enter product code..."} />
                </Form.Item>

                <Form.Item name={"parentCategoryId"}  rules={[
                    {
                        required: true,
                        message: "Please select a category",
                    },
                ]} validateTrigger={"onSubmit"}>
                    <SelectCategoryTree
                        label={"Category"}
                        categories={categories}
                    />
                </Form.Item>

                <Flex justify={"space-between"} style={{padding: "10px 0"}}>
                    <Space align={"center"}>
                        <Text style={text1}>Product display </Text>
                        <InfoIcon size={24}/>
                    </Space>
                    <Text style={{...text1, color: imageCount > MAX_PRODUCTS_IMG ? colors.destructive: ""}}>{imageCount}/{MAX_PRODUCTS_IMG}</Text>
                </Flex>
                <Form.Item name="fileList" rules={[{
                    validator: (_, value: UploadFile[],) => {
                        if (value.length > 10) return Promise.reject("Maximum amount of files exceeded");
                        return Promise.resolve();
                    }
                }]} getValueFromEvent={(e) => {
                    if (Array.isArray(e)) return e;
                    return e?.fileList;
                }}>
                    <ImageUpload src={""} multiple fileList={fileList} setFileList={setFileList} />
                </Form.Item>

                <Form.Item name={"price"} rules={[{required:true}]}>
                    <TextInput prefix={"Price, $"} placeholder={"Enter product price..."} />
                </Form.Item>
                <Form.Item name={"discount"} rules={[{required:true}]}>
                    <TextInput prefix={"Discount, %"} placeholder={"Enter product discount..."} />
                </Form.Item>
                <Form.Item name={"quantity"} rules={[{required:true}]}>
                    <TextInput prefix={"Quantity"} placeholder={"Enter product quantity..."} />
                </Form.Item>
            </Flex>
            <Flex id={"product-details"}>

            </Flex>
        </Form>
    )
}