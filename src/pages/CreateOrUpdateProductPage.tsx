import {Anchor, type AnchorProps, Col, Flex, Row} from "antd";
import {createOrUpdateProductPageAnchorStyles} from "./css/CreateOrUpdateProductPageStyles.ts";
import {CreateOrUpdateProductForm} from "../forms/Product/CreateOrUpdateProductForm.tsx";
import {useForm} from "antd/es/form/Form";
import {Button} from "../Components/Buttons/Button.tsx";

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
    const [form] = useForm()
    return (
        <Row>
            <Col span={6}>
                <Anchor
                    offsetTop={100}
                    styles={createOrUpdateProductPageAnchorStyles}
                    items={anchorItems}/>
            </Col>
            <Col id={"general-info"} span={18}>
                <Flex id={"general-info"} vertical style={{width: "80%"}}>
                    <CreateOrUpdateProductForm form={form} />
                    <Button type={"primary"} onClick={() => form.submit()}>Submit test</Button>
                </Flex>
            </Col>
        </Row>
    )
}