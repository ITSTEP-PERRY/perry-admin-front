import {Anchor, type AnchorProps, Col, Flex, Row} from "antd";
import {
    createOrUpdateProductPageAnchorStyle,
    createOrUpdateProductPageAnchorStyles
} from "./css/CreateOrUpdateProductPageStyles.ts";
import {CreateOrUpdateProductForm} from "../forms/Product/CreateOrUpdateProductForm.tsx";
import {useForm} from "antd/es/form/Form";
import {Button} from "../Components/Buttons/Button.tsx";
import type {AnchorContainer} from "antd/es/anchor/Anchor";
import {useNavigate, useParams} from "react-router";
import {useCreateProductMutation, useProductByIdQuery} from "../api/slices/productApiSlice.ts";
import {CustomSpin} from "../Components/Utils/CustomSpin.tsx";

const anchorItems : AnchorProps["items"] = [
    {
        key: "general-info",
        href: "#general-info",
        title: "General Information"
    },{
        key: "product-details",
        href: "#product-details",
        title: "Product Details"
    },{
        key: "about-product",
        href: "#about-product",
        title: "About Product"
    },
]


export const CreateOrUpdateProductPage = () => {
    const {productId} = useParams();
    const {data: product, isFetching} = useProductByIdQuery(productId ?? "", {
        skip: !productId,
    });
    const [,{isLoading: createLoading}] = useCreateProductMutation({
        fixedCacheKey: "createProduct-form"
    })
    const [,{isLoading: updateLoading}] = useCreateProductMutation({
        fixedCacheKey: "updateProduct-form"
    })
    const navigate = useNavigate();
    const [form] = useForm()
    return (
        <Row>
            <Col span={6}>
                <Anchor
                    offsetTop={50}
                    styles={createOrUpdateProductPageAnchorStyles}
                    items={anchorItems}
                    getContainer={() => {
                        return  document.getElementById("create-product-container-form") as AnchorContainer
                    }}

                />
            </Col>
            <Col span={18}>
                {isFetching ?
                    <CustomSpin style={createOrUpdateProductPageAnchorStyle.spin} text={"Loading..."}/>
                    :
                    <>
                        <Flex vertical style={{width: "80%", height: "80vh"}}>
                                <CreateOrUpdateProductForm product={product ?? {}} form={form}/>
                        </Flex>
                        <Flex style={{marginTop: 50, width: "80%"}} justify={"end"} gap={20}>
                            <Button type={"secondary"}
                            style={createOrUpdateProductPageAnchorStyle.buttons}
                                    onClick={() => navigate("/products")}
                            >Cancel</Button>
                            <Button type={"primary"}
                                    loading={createLoading || updateLoading}
                                    style={createOrUpdateProductPageAnchorStyle.buttons}
                                    onClick={() => form.submit()}
                            >
                                {productId ? "Update" : "Create"}
                            </Button>
                        </Flex>
                    </>
                }
            </Col>
        </Row>
    )
}