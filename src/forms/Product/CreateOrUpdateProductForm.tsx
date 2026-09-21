import {
    Divider,
    Flex,
    Form,
    type FormInstance,
    Input, message,
    Space,
    Tooltip,
    type UploadFile
} from "antd";
import Title from "antd/es/typography/Title";
import {header2} from "../../theme/headerStyles.ts";
import {TextInput} from "../../Components/Inputs/TextInput.tsx";
import {SelectCategoryTree} from "../../Components/Select/SelectCategoryTree.tsx";
import {useCategoriesQuery} from "../../api/slices/categoryApiSlice.ts";
import {
    createOrUpdateProductFormStyle,
    createOrUpdateProductFormStyles
} from "./css/CreateOrUpdateProductFormStyles.ts";
import {ImageUpload} from "../../Components/Inputs/ImageUpload.tsx";
import Text from "antd/es/typography/Text";
import {text1} from "../../theme/textStyles.ts";
import {useEffect, useState} from "react";
import {colors} from "../../theme/colors.ts";
import {InfoIcon} from "../../Components/Icon/InfoIcon.tsx";
import type {ProductImageType, ProductType} from "../../types/ProductType.ts";
import {ccmStyle} from "../../widgets/Category/css/CreateCategoryModalStyles.ts";
import {Button} from "../../Components/Buttons/Button.tsx";
import {TrashcanIcon} from "../../Components/Icon/TrashcanIcon.tsx";
import {PlusIcon} from "../../Components/Icon/PlusIcon.tsx";
import {Checkbox} from "../../Components/Inputs/Checkbox.tsx";
import {
    useCreateProductMutation,
    useUpdateProductMutation
} from "../../api/slices/productApiSlice.ts";

export type CreateOrUpdateProductFormProps = {
    form: FormInstance,
    productId?: string,
    product: ProductType,
}

const MAX_PRODUCTS_IMG = 10;

export const CreateOrUpdateProductForm = ({form, product}: CreateOrUpdateProductFormProps) => {
    const {data: categories, isFetching: categoriesFetching} = useCategoriesQuery()
    const [fileList, setFileList] = useState<UploadFile[]>(product?.images?.map((img): UploadFile => ({
        uid: img.id as string,
        name: img.altText as string,
        preview: img.url
    })) ?? [])
    const imageCount = fileList?.length ?? 0
    const [createProduct] = useCreateProductMutation({
        fixedCacheKey: "createProduct-form"
    })
    const [updateProduct] = useUpdateProductMutation({
        fixedCacheKey: "updateProduct-form"
    })

    const setImages = () => form.setFieldValue("images", fileList.map((file): ProductImageType => ({
        isPrimary: false,
        url: file.preview
    })))
    const initialVal: ProductType = {
        ...product,
        discountPercent: 0
    }

    const onFinish = async (data: ProductType) => {
        data.images = fileList.map((file, i): ProductImageType => ({
            isPrimary: data.images?.[i].isPrimary,
            url: file.preview
        }))
        try{
            if (product?.id) {
                await updateProduct(data).unwrap()
            } else {
                await createProduct(data).unwrap()
            }
            await message.success({
                content: "Successfully uploaded!",
                type: "success"
            })
        }catch {
            await message.success({
                content: "Upload failed!",
                type: "error"
            })
        }
    }

    useEffect(() => {
        form.setFieldValue("images", fileList.map((file): ProductImageType => ({
            isPrimary: false,
            url: file.preview
        })))
    }, [form, fileList]);

    return(
        <Form id={"create-product-container-form"} initialValues={initialVal} form={form} onFinish={onFinish}
              style={{overflowY: "auto", position: "relative"}}
              styles={createOrUpdateProductFormStyles}>
            <Flex id={"general-info"} vertical>
                <Title style={header2}>General information</Title>
                <Divider />
                <Form.Item name={"name"} rules={[{required:true}]}>
                    <TextInput prefix={"Name"} placeholder={"Enter product name..."} />
                </Form.Item>
                <Form.Item name={"description"} rules={[{required:true}]}>
                    <TextInput prefix={"Description"} placeholder={"Enter description..."} />
                </Form.Item>
                <Form.Item name={"sku"} rules={[{required:true}]}>
                    <TextInput prefix={"SKU"} placeholder={"Enter sku..."} />
                </Form.Item>

                <Form.Item name={"categoryId"}  rules={[
                    {
                        required: true,
                        message: "Please select a category",
                    },
                ]} validateTrigger={"onSubmit"}>
                    <SelectCategoryTree
                        loading={categoriesFetching}
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
                <Form.Item name="images"
                           getValueFromEvent={() => setImages() }
                           rules={[{
                    validator: (_, value: UploadFile[],) => {
                        if (value?.length > 10) return Promise.reject("Maximum amount of files exceeded");
                        return Promise.resolve();
                    }
                }]}>
                    <ImageUpload srcArray={product?.images?.map(i => i.url as string) ?? []}  onClick={(n) => {
                        form.setFieldValue("images", fileList.map((img, i)=> ({
                            ...img,
                            isPrimary: n === i,
                        })))
                    }} multiple fileList={fileList} setFileList={setFileList} />
                </Form.Item>

                <Form.Item name={"price"} rules={[{required:true}]}>
                    <TextInput type={"number"} prefix={"Price, $"} placeholder={"Enter product price..."} />
                </Form.Item>
                <Form.Item name={"discountPercent"} rules={[{required:true}]}>
                    <TextInput type={"number"} prefix={"Discount, %"} placeholder={"Enter product discount..."} />
                </Form.Item>
                <Form.Item name={"stockQuantity"} rules={[{required:true}]}>
                    <TextInput type={"number"} prefix={"Quantity"} placeholder={"Enter product quantity..."} />
                </Form.Item>
            </Flex>
            <Flex id={"product-details"} vertical style={createOrUpdateProductFormStyle.block}>
                <Title style={header2}>Product Details</Title>
                <Divider />
                <Form.Item name={"id"}>
                    <Input type={"hidden"}/>
                </Form.Item>
                <Form.List name={"attributes"}>
                    {(fields, {add, remove}) => (
                        <>
                            <Flex vertical>
                            {fields.map(({key, name,...restField}) => (
                                <Flex  gap={20} key={key} align={"center"}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, "name"]}
                                        style={ccmStyle.propsItem}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Please input attribute key or delete this field.",
                                            },
                                        ]}
                                    >
                                            <TextInput prefix="Name" style={{padding: 10, margin: 0}}/>

                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, "value"]}
                                        style={ccmStyle.propsItem}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Please input attribute key or delete this field.",
                                            },
                                        ]}
                                    >
                                            <TextInput prefix="Value" style={{padding: 10, margin: 0}}/>

                                    </Form.Item>
                                    <Tooltip title={"Is Filterable?"} color={colors.primary} placement={"top"}>
                                    <Form.Item name={[name, "isFilterable"]} valuePropName={"checked"}>
                                        <Checkbox />
                                    </Form.Item>
                                    </Tooltip>
                                    <Button type={"destructive"} onClick={() => remove(name)} style={{padding: 10, height: "100%"}}>
                                        <TrashcanIcon size={24} color={colors.destructive}/>
                                    </Button>
                                </Flex>
                            ))}
                            </Flex>
                            <Button type={"secondary"}
                                    onClick={() => add()}
                                    style={ccmStyle.addProps}
                            >
                                <PlusIcon size={28} color={colors.secondary}/>
                                <Text style={text1}>Add property key</Text>
                            </Button>
                        </>
                    )}
                </Form.List>
            </Flex>
            <Flex id={"about-product"} style={createOrUpdateProductFormStyle.block} vertical>
                <Title style={header2}>About Product</Title>
                <Divider />
                <Form.List name={"aboutItems"}>
                    {(fields, {add, remove}) => (
                        <>
                            <Flex vertical>
                                {fields.map(({key, name, ...field}) => (
                                    <Flex  gap={20} key={key} align={"center"}>
                                        <Form.Item
                                            {...field}
                                            noStyle
                                        >
                                            <Form.Item
                                                {...field}
                                                name={[name, "title"]}
                                                style={ccmStyle.propsItem}
                                                rules={[
                                                    {
                                                        required: true,
                                                        whitespace: true,
                                                        message: "Please input attribute key or delete this field.",
                                                    },
                                                ]}
                                            >
                                                    <TextInput prefix="Title" style={{padding: 10, margin: 0}}/>
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                name={[name, "description"]}
                                                style={ccmStyle.propsItem}
                                                rules={[
                                                    {
                                                        required: true,
                                                        whitespace: true,
                                                        message: "Please input attribute key or delete this field.",
                                                    },
                                                ]}
                                            >

                                                    <TextInput prefix="Description" style={{padding: 10, margin: 0}}/>


                                            </Form.Item>

                                        </Form.Item>
                                        <Button type={"destructive"} onClick={() => remove(name)} style={{padding: 10, height: "100%"}}>
                                            <TrashcanIcon size={24} color={colors.destructive}/>
                                        </Button>
                                    </Flex>
                                ))}
                            </Flex>
                            <Button type={"secondary"}
                                    onClick={() => add()}
                                    style={ccmStyle.addProps}
                            >
                                <PlusIcon size={28} color={colors.secondary}/>
                                <Text style={text1}>Add property key</Text>
                            </Button>
                        </>
                    )}
                </Form.List>
            </Flex>

        </Form>
    )
}