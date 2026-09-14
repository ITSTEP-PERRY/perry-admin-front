import {Col, Flex, Image, Row, Space, Table, type TableProps} from "antd";
import {productsPageStyles} from "./css/productPageStyles.ts";
import {useState} from "react";
import {SelectCategoryTree} from "../Components/Select/SelectCategoryTree.tsx";
import {BaseSearch} from "../Components/Search/BaseSearch.tsx";
import Text from "antd/es/typography/Text";
import {text1, text2} from "../theme/textStyles.ts";
import type {NestedStyles} from "../types/NestedStyles.ts";
import {useCategoriesQuery} from "../api/categoryApiSlice.ts";
import {useProductsQuery} from "../api/productApiSlice.ts";
import type {ProductType} from "../types/ProductType.ts";
import {useAntdTableRowSelect} from "../shared/Hooks/useAntdTableRowSelect.tsx";
import {StarFullIcon} from "../Components/Icon/StarFullIcon.tsx";
import {antdPageTableStyles} from "../theme/antdTableStyles.ts";
import type {FilterOptions} from "../types/FilterOptions.ts";
import {Button} from "../Components/Buttons/Button.tsx";
import {PlusIcon} from "../Components/Icon/PlusIcon.tsx";
import "./css/productPageStyles.css"
import {categoryPageDescriptionStyles, categoryPageEmptyDescriptionStyles} from "./css/categoryPageStyles.ts";
import {EditIcon} from "../Components/Icon/EditIcon.tsx";
import {colors} from "../theme/colors.ts";
import {ConfirmModal} from "../Components/Inputs/ConfirmModal.tsx";
import {TrashcanIcon} from "../Components/Icon/TrashcanIcon.tsx";
import Title from "antd/es/typography/Title";
import {header3} from "../theme/headerStyles.ts";
import {useNavigate} from "react-router";

const categoriesType = productsPageStyles.categories as NestedStyles


export const ProductPage = () => {
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        page: 1,
    });
    const [selectedProductId, setSelectedProductId] = useState<string>("");
    const {data: categories} = useCategoriesQuery()
    const {data: products} = useProductsQuery(filterOptions)
    const {setSelectedRowKeys, rowSelection} = useAntdTableRowSelect<ProductType>()
    const navigate = useNavigate()
    const navigateToCreateProduct = () => navigate(`/product?id=${selectedProductId}`)

    const columns:  TableProps<ProductType>["columns"] = [
        {
            title: "Product name",
            dataIndex: "name",
            key: "name",
            render: (_, record: ProductType) => (
                <Space>
                    <Image src={record.imageUrl} width={80} preview={false}/>
                    <Flex vertical justify="center">
                        <Text style={{...text1, textWrap: "nowrap"}}>{record.name}</Text>
                        <Text style={{...text1,textWrap: "nowrap"}}>{record.description.hideRest()}</Text>
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
            ),
            align: "end",
        },
        {
            title: "Price",
            dataIndex: "price",
            render: (_, record: ProductType) => (
                <Text style={text1}>$ {record.variants?.[0].price}</Text>
            ),
            align: "center"
        },
        {
            title: <Button type={"text"}
                           style={{padding: 0}}
                           onClick={navigateToCreateProduct}
            >
                <PlusIcon size={28}/>
            </Button>,
            align: "center",
            width: "10%",
        }
    ]


    return (
        <Row style={productsPageStyles.root} gutter={24} >
            <Col span={16}>
                <Flex gap={10} align={"center"}>
                    <Text style={{...text1, width: "fit-content", textWrap: "nowrap"}}>Category</Text>
                    <SelectCategoryTree categories={categories}
                                        style={categoriesType.input}
                                        styles={{popup: categoriesType.popup}}
                                        value={filterOptions.categoryId}
                                        onChange={(e: string) => setFilterOptions({...filterOptions, categoryId: e})}
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
                            defaultPageSize: 5,
                            showSizeChanger: true,
                            pageSizeOptions: [5, 20, 50, 100],
                            onShowSizeChange: (pageSize, ) => setFilterOptions({...filterOptions, pageSize}),
                            onChange: (n) => {
                                setSelectedRowKeys([])
                                setFilterOptions({...filterOptions, page: n})
                            }
                        }}

                        onRow={(record) => {
                            return {
                                onClick: (e) => {
                                    e.stopPropagation()
                                   setSelectedProductId(record.id)
                                },
                                style: {
                                    cursor: "pointer",
                                },
                            };
                        }}
                        rowClassName={(record) => record.id === selectedProductId ? "product-row-selected" : ""}
                    />
                    :
                    <Flex align={"center"} justify={"center"} style={{height: "80%"}}>
                        <Button type={"secondary"}
                                style={{height: "fit-content", padding: "27px 53px"}}
                                onClick={navigateToCreateProduct}
                        >
                            <Space vertical>
                                <PlusIcon color={colors.secondary} />
                                <Title style={header3}>Create product</Title>
                            </Space>
                        </Button>
                    </Flex>
                }
            </Col>
            <Col span={8} style={productsPageStyles.descriptionContainer}>
                {selectedProductId ?
                    <Flex justify={"space-between"} gap={12}>
                        <>{selectedProductId}</>
                        <Button type={"secondary"} style={categoryPageDescriptionStyles.button}>
                            <EditIcon size={28} color={colors.secondary}/>
                            <Text style={text2}>Edit</Text>
                        </Button>
                        <ConfirmModal type={"danger"} confirmText={"Delete"} body={
                            <Flex vertical align={"center"}>
                                <Text style={text1}>You can't recover categories, subcategories;</Text>
                                <Text style={text1}>products will be deactivated.</Text>
                            </Flex>
                        }
                        >
                            <Button type={"destructive"} style={categoryPageDescriptionStyles.button}>
                                <TrashcanIcon size={28} color={colors.destructive}/>
                                <Text style={text2}>Delete</Text>
                            </Button>
                        </ConfirmModal>
                </Flex>
                :
                    <Flex align={"center"} justify={"center"} style={{height: "100%"}}>
                        <Text style={categoryPageEmptyDescriptionStyles}>Select a category to see its information</Text>
                    </Flex>
                }
            </Col>
        </Row>
    )
}