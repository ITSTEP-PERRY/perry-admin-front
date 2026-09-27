import {Col, Divider, Flex, Image, message, Row, Skeleton, Space, Table, type TableProps} from "antd";
import {productsPageStyles} from "./css/productPageStyles.ts";
import {useState} from "react";
import {SelectCategoryTree} from "../Components/Select/SelectCategoryTree.tsx";
import {BaseSearch} from "../Components/Search/BaseSearch.tsx";
import Text from "antd/es/typography/Text";
import {text1, text2} from "../theme/textStyles.ts";
import type {NestedStyles} from "../types/NestedStyles.ts";
import {useCategoriesQuery} from "../api/slices/categoryApiSlice.ts";
import {useDeleteProductMutation, useProductForUpdateByIdQuery, useProductsQuery} from "../api/slices/productApiSlice.ts";
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
import {CustomSpin} from "../Components/Utils/CustomSpin.tsx";
import {ProductImageCollage} from "../widgets/Product/ProductImageCollage.tsx";
import Fallback from "../assets/images/SiginSignup.png"



const categoriesType = productsPageStyles.categories as NestedStyles


export const ProductPage = () => {
    const [filterOptions, setFilterOptions] = useState<FilterOptions<ProductType>>({
        page: 1,
        pageSize: 5,
        descendingOrder: true
    });
    const [selectedProductId, setSelectedProductId] = useState<string>("");
    const {data: categories, isFetching: categoriesFetching} = useCategoriesQuery()
    const {data: productsDto, isFetching} = useProductsQuery(filterOptions)
    const {data: product, isFetching: productFetching} = useProductForUpdateByIdQuery(selectedProductId, {
        skip: !selectedProductId
    })
    const [deleteProduct, {isLoading: deleteLoading}] = useDeleteProductMutation()
    const {setSelectedRowKeys, rowSelection} = useAntdTableRowSelect<ProductType>()
    const navigate = useNavigate()
    const navigateToCreateProduct = () => navigate(`/product/${selectedProductId}`)


    const columns:  TableProps<ProductType>["columns"] = [
        {
            title: "Product name",
            dataIndex: "name",
            key: "name",
            render: (_, record: ProductType) => (
                <Space>
                    <Image src={record.imageUrl} fallback={Fallback} style={productsPageStyles.imagePreview} width={80} preview={false}/>
                    <Flex vertical justify="center">
                        <Text style={{...text1, textWrap: "nowrap"}}>{record.name?.hideRest()}</Text>
                        <Text style={{...text1,textWrap: "nowrap"}}>{record.description?.hideRest()}</Text>
                    </Flex>
                </Space>
            ),
            width: "50%"
        },
        {
            title: "Rating",
            dataIndex: "averageRating",
            render: (_, record: ProductType) => (
                <Space align={"center"} >
                    <StarFullIcon size={20}/>
                    <Text style={{...text1}}>{record.averageRating}</Text>
                </Space>
            ),

        },
        {
            title: "Price",
            dataIndex: "price",
            render: (_, record: ProductType) => (
                <Flex gap={10} style={{textWrap: "nowrap"}} align={"baseline"}>
                        <Text style={text1}>$ {record.price} </Text>
                    {record.oldPrice && <Text style={{
                        ...text2,
                        color: colors.inputBorder,
                        textDecoration: "line-through"
                    }}>${record.oldPrice}</Text>}
                </Flex>

            ),
        },
        {
            title: <Button type={"text"}
                           style={{padding: 0}}
                           onClick={() => navigate("/product/")}
            >
                <PlusIcon size={28}/>
            </Button>,
            align: "center",
            width: "10%",
        }
    ]

    const products = productsDto?.items

    return (
        <Row style={productsPageStyles.root} gutter={24} >
            <Col span={16}>
                <Flex gap={10} align={"center"}>
                    <Text style={{...text1, width: "fit-content", textWrap: "nowrap"}}>Category</Text>
                    <SelectCategoryTree categories={categories}
                                        loading={categoriesFetching}
                                        style={categoriesType.input}
                                        styles={{popup: categoriesType.popup}}
                                        value={filterOptions.categoryId}
                                        onChange={(e: string) => setFilterOptions({...filterOptions, categoryId: e})}
                    />
                    <BaseSearch style={productsPageStyles.search} onChange={(e) =>
                        setFilterOptions({...filterOptions, search: e.target.value})} />
                    <Button type={"secondary"} onClick={() => setFilterOptions({descendingOrder: true})}>Reset</Button>
                </Flex>
                {isFetching && !products ?
                    <CustomSpin style={{height: "90%"}} text={"Searching products"}/>
                    :
                    products ?
                    <Table
                        loading={isFetching}
                        styles={antdPageTableStyles<ProductType>()}
                        rowKey={"id"}
                        rowSelection={{type: "checkbox", ...rowSelection}}
                        dataSource={products}
                        columns={columns}
                        scroll={{y: "68vh"}}
                        pagination={{
                            placement: ["bottomCenter"],
                            defaultPageSize: filterOptions.pageSize,
                            showSizeChanger: true,
                            pageSizeOptions: [5, 20, 50, 100],
                            onChange: (page, pageSize) => {
                                setSelectedRowKeys([])
                                setFilterOptions({...filterOptions, page, pageSize})
                            },
                            total: productsDto.total,
                            showTotal: (n) => <Text style={text2}>Total: {n}</Text>
                        }}

                        onRow={(record) => {
                            return {
                                onClick: (e) => {
                                    e.stopPropagation()
                                    setSelectedProductId(record.id as string)
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
                    productFetching ?
                        <Skeleton active/>
                        :
                        product &&
                    <Flex justify={"space-between"} gap={12} vertical style={{height: "100%"}}>
                        <Flex vertical gap={5}>
                            <ProductImageCollage images={product?.images ?? []} />
                            <Text style={header3}>{product?.name}</Text>
                            <Divider />
                            <Text style={text1}>See all customer reviews</Text>
                        </Flex>
                        <Flex gap={20}>
                            <Button type={"secondary"}
                                    style={categoryPageDescriptionStyles.button}
                                    onClick={() => navigateToCreateProduct()}
                            >
                                <EditIcon size={28} color={colors.secondary}/>
                                <Text style={text2}>Edit</Text>
                            </Button>
                            <ConfirmModal type={"danger"} confirmText={"Delete"} body={
                                <Flex vertical align={"center"}>
                                    <Text style={text1}>You can't recover product</Text>
                                </Flex>
                            }
                              onConfirm={async () => {
                                  await deleteProduct(product?.id ?? "")
                                  setSelectedProductId("")
                                  await message.success("Product deleted")
                              }}
                              loading={deleteLoading}

                            >
                                <Button type={"destructive"}
                                        style={categoryPageDescriptionStyles.button}
                                >
                                    <TrashcanIcon size={28} color={colors.destructive}/>
                                    <Text style={text2}>Delete</Text>
                                </Button>
                            </ConfirmModal>
                        </Flex>
                </Flex>
                :
                    <Flex align={"center"} justify={"center"} style={{height: "100%"}}>
                        <Text style={categoryPageEmptyDescriptionStyles}>Select a product to see its information</Text>
                    </Flex>
                }
            </Col>
        </Row>
    )
}