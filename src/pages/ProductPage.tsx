import {Col, Flex, Image, Row, Space, Table, type TableProps} from "antd";
import {productsPageStyles} from "./css/productPageStyles.ts";
import {useState} from "react";
import {SelectCategoryTree} from "../Components/Select/SelectCategoryTree.tsx";
import {BaseSearch} from "../Components/Search/BaseSearch.tsx";
import Text from "antd/es/typography/Text";
import {text1} from "../theme/textStyles.ts";
import type {NestedStyles} from "../types/NestedStyles.ts";
import {useCategoriesQuery} from "../api/categoryApiSlice.ts";
import {useProductsQuery} from "../api/productApiSlice.ts";
import {ItemNotFound} from "../widgets/ItemNotFound.tsx";
import type {ProductType} from "../types/ProductType.ts";
import {useAntdTableRowSelect} from "../shared/Hooks/useAntdTableRowSelect.tsx";
import {StarFullIcon} from "../Components/Icon/StarFullIcon.tsx";
import {antdPageTableStyles} from "../theme/antdTableStyles.ts";

const categoriesType = productsPageStyles.categories as NestedStyles

const columns:  TableProps<ProductType>["columns"] = [
    {
        title: "Product name",
        dataIndex: "name",
        key: "name",
        render: (_, record: ProductType) => (
            <Space>
                <Image src={record.imageUrl} width={80} preview={false}/>
                <Flex vertical justify="center">
                    <Text style={{...text1}}>{record.name}</Text>
                    <Text style={{...text1}}>{record.description.hideRest()}</Text>
                </Flex>
            </Space>
        ),
    },
    {
        title: "Rating",
        dataIndex: "averageRating",
        render: (_, record: ProductType) => (
            <Space align={"center"}>
                <StarFullIcon size={20}/>
                <Text style={{...text1}}>{record.averageRating}</Text>
            </Space>
        )
    },
    {
        title: "Price",
        dataIndex: "price",
        render: (_, record: ProductType) => (
            <Text style={text1}>$ {record.variants?.[0].price}</Text>
        )
    }
]

export const ProductPage = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const {data: categories} = useCategoriesQuery()
    const {data: products} = useProductsQuery()
    const {selectedRowKeys, setSelectedRowKeys, rowSelection} = useAntdTableRowSelect<ProductType>()
    return (
        <Row style={productsPageStyles.root} gutter={24} >
            <Col span={16}>
                <Flex gap={10} align={"center"}>
                    <Text style={{...text1, width: "fit-content", textWrap: "nowrap"}}>Category</Text>
                    <SelectCategoryTree categories={categories}
                                        style={categoriesType.input}
                                        styles={{popup: categoriesType.popup}}
                                        value={selectedCategoryId}
                                        onChange={(e: string) => setSelectedCategoryId(e)}
                    />
                    <BaseSearch style={productsPageStyles.search}/>
                </Flex>
                {products ?
                    <Table
                        styles={antdPageTableStyles<ProductType>()}
                        rowKey={"id"}
                        rowSelection={{type: "checkbox", ...rowSelection}}
                        dataSource={products}
                        columns={columns}
                        scroll={{y: "70vh"}}
                        pagination={{
                            placement: ["bottomCenter"],
                            defaultPageSize: 7,
                            pageSizeOptions: [7, 20, 50, 100],
                            onChange: () => {
                                setSelectedRowKeys([])
                            }
                        }}
                    />
                    :
                    <div style={{alignContent: "center", height: "80%"}}>
                        <ItemNotFound  text={"No products in the selected category"} />
                    </div>
                }
            </Col>
            <Col span={8} style={productsPageStyles.descriptionContainer}>
                {selectedCategoryId}
            </Col>
        </Row>
    )
}