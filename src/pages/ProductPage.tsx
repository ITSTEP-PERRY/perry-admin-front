import {Col, Flex, Row} from "antd";
import {productsPageStyles} from "./css/productPageStyles.ts";
import {useState} from "react";
import type {CategoryType} from "../types/CategoryType.ts";
import {SelectCategoryTree} from "../Components/Select/SelectCategoryTree.tsx";
import {BaseSearch} from "../Components/Search/BaseSearch.tsx";
import Text from "antd/es/typography/Text";
import {text1} from "../theme/textStyles.ts";
import type {NestedStyles} from "../types/NestedStyles.ts";

const categoriesType = productsPageStyles.categories as NestedStyles

export const ProductPage = () => {
    const [selectedProduct, setSelectedProduct] = useState<CategoryType>();
    // const categories = mainCategoryData.subCategories;
    return (
        <Row style={productsPageStyles.root} >
            <Col span={16}>
                <Flex gap={10} align={"center"}>
                    <Text style={{...text1, width: "fit-content", textWrap: "nowrap"}}>Category</Text>
                    {/*<SelectCategoryTree categories={categories}*/}
                    {/*                    style={categoriesType.input}*/}
                    {/*                    styles={{popup: categoriesType.popup}}/>*/}
                    <BaseSearch style={productsPageStyles.search}/>
                </Flex>
            </Col>
            <Col span={8} style={productsPageStyles.descriptionContainer}>

            </Col>
        </Row>
    )
}