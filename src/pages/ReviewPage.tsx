import {type ComponentProps, useState} from "react";
import type {FilterOptions} from "../types/FilterOptions.ts";
import {useAntdTableRowSelect} from "../shared/Hooks/useAntdTableRowSelect.tsx";
import type {ProductReview} from "../types/ProductReview.ts";
import {
    useAllReviewsQuery,
    useSetApprovalManyReviewsMutation,
    useSetApprovalReviewMutation
} from "../api/slices/reviewApiSlice.ts";
import {ordersRangePickerStyles} from "./css/ordersPageStyles.ts";
import {
    Col,
    DatePicker,
    Divider,
    Flex,
    Image, message,
    Modal,
    Pagination, Row,
    Space, Switch,
    Table,
    type TableProps, Tag,
    Tooltip,
} from "antd";
import {antdPageTableStyles} from "../theme/antdTableStyles.ts";
import Text from "antd/es/typography/Text";
import {useProductByIdQuery, useProductPartialByIdQuery} from "../api/slices/productApiSlice.ts";
import {ReviewPageStyles} from "./css/reviewPageStyles.ts";
import {text1, text1Bold, text3, text3Bold} from "../theme/textStyles.ts";
import {colors} from "../theme/colors.ts";
import {Button} from "../Components/Buttons/Button.tsx";
import {VscMute, VscUnmute} from "react-icons/vsc";
import {ArrowsUpDownIcon} from "../Components/Icon/ArrowsUpDownIcon.tsx";
import type {SorterResult} from "antd/es/table/interface";
import {dateFormatter} from "../shared/formatter.ts";
import {GrPowerReset} from "react-icons/gr";
import {RateStat} from "../widgets/Reviews/RateStat.tsx";
import { TbMessageReport } from "react-icons/tb";
import {LiaHandsHelpingSolid} from "react-icons/lia";
import {ConfirmModal} from "../Components/Inputs/ConfirmModal.tsx";
import {StarFullIcon} from "../Components/Icon/StarFullIcon.tsx";
import {header2} from "../theme/headerStyles.ts";
import {XOR} from "../utils/helpers/logicalHelpers.ts";
import {useParams} from "react-router";
import {ReviewListItem} from "../widgets/Reviews/ReviewListItem.tsx";
const {RangePicker} = DatePicker


// const UserCell = ({record}: {record: ProductReview}) => {
//     const {data: user} = useGetUserByIdQuery(record.userId)
//     return (
//     <Flex vertical gap={10}>
//         <Space>
//             <Avatar src={user?.avatar} size={"large"} />
//             <Space vertical>
//                 <Text style={ReviewPageStyles.avatarText}>{user ? user?.firstName : record.authorName }</Text>
//                 <Text style={ReviewPageStyles.avatarText}>{user?.role ?? "Guest"}</Text>
//             </Space>
//         </Space>
//     </Flex>
//     )
// }


const ProductCell = ({record}: {record: ProductReview}) => {
    const {data: product} = useProductPartialByIdQuery(record.productId);
    const image = product?.images?.find(i => i.isPrimary)?.url ?? product?.images?.[0]?.url
    return (
        <Space>
            <Image style={ReviewPageStyles.productImage} src={image} />
            <Text style={ReviewPageStyles.productImage}>{product?.name?.hideRest()}</Text>
        </Space>
    )
}

const initialFilterState = {
    pageSize: 10,
    descendingOrder: true,

}

export const ReviewPage = () => {
    const [showReview, setShowReview] = useState(false);

    const [filterOptions, setFilterOptions] = useState<FilterOptions<ProductReview>>(initialFilterState);
    const [muteFilters, setMuteFilters] = useState({
        mute: true,
        approve: true,
        helpful: false,
        reported: false
    });

    const [interval, setInterval] = useState<ComponentProps<typeof RangePicker>["value"]>();
    const [selectedRecord, setSelectedRecord] = useState<ProductReview>();
    const {setSelectedRowKeys, rowSelection, selectedRowKeys} = useAntdTableRowSelect<ProductReview>()


    const {id, type} = useParams()

    const {data, isFetching: dataFetching} = useAllReviewsQuery({
        options: filterOptions,
        id
    });

    const {data: product} = useProductByIdQuery(id as string, {
        skip: type !== "product"
    });


    const [muteReview, {isLoading: muteFetching}] = useSetApprovalReviewMutation()
    const [muteMany, {isLoading: muteManyFetching}] = useSetApprovalManyReviewsMutation()
    const reviews =  data?.pagedList.items;
    const isFetching = dataFetching

    const columns: TableProps<ProductReview>["columns"] = [
        // {
        //     title: "User",
        //     dataIndex: "userId",
        //     render: (_,record) => <UserCell record={record} />
        // },
        {
            title: "Product",
            dataIndex: "productId",
            render: (_, record) => <ProductCell record={record}  />
        },
        // {
        //     title: "Review",
        //     dataIndex: "title",
        //     render: (_, record) => (
        //         <Space vertical>
        //             <Text style={text2Bold}>{record.title}</Text>
        //             <Text style={ReviewPageStyles.reviewText}>{record.body}</Text>
        //         </Space>
        //     ),
        //     width: "25%",
        // },
        {
            title: "Rating",
            dataIndex: "rating",
            render: (_, record) =>
                <Space>
                    <StarFullIcon size={24}/>
                    <Text style={text1}>{record.rating}</Text>
                </Space>,
            sortIcon: ({sortOrder}) =>
                <>
                    <ArrowsUpDownIcon
                        size={32} width={2.5}
                        upColor={sortOrder === "ascend" ? colors.secondary : colors.darkText}
                        downColor={sortOrder === "descend" ? colors.secondary : colors.darkText}
                    />
                </>,
            sorter: {
                compare: (a,b) => a.rating - b.rating,
                multiple: 4
            },
            showSorterTooltip: false,
            align: "center"

        },
        {
            title: "Tags",
            dataIndex: "tags",
            render: (_, record) => (
                <Flex gap={5} wrap={"wrap"}>
                    {record.tags.map((tag, index) => (
                        index >= 3 ?
                            <Tag>...</Tag>
                            :
                            <Tag key={index} color={colors.secondary}>{tag.name}</Tag>

                    ))}
                </Flex>
            ),
            width: "15%"
        },
        {
            title: "Created At",
            dataIndex: "createdAtUtc",
            render: (_, record) => {
                const date = dateFormatter.format(new Date(record.createdAtUtc + "Z"))
                return (
                    <Space vertical>
                        <Text style={text3}>{date}</Text>
                        <Text style={text3}>{new Date(record.createdAtUtc + "Z").toLocaleTimeString()}</Text>
                    </Space>
                )
            },
            sortIcon: ({sortOrder}) =>
                <>
                    <ArrowsUpDownIcon
                        size={32} width={2.5}
                        upColor={sortOrder === "ascend" ? colors.secondary : colors.darkText}
                        downColor={sortOrder === "descend" ? colors.secondary : colors.darkText}
                    />
                </>,
            sorter: {
                compare: (a,b) =>
                    new Date(a.createdAtUtc).valueOf() - new Date(b.createdAtUtc).valueOf(),
                multiple: 2
            }

        },
        {
          title: "Grades",
          dataIndex: "totalReported",
          render: (_, record) => (
              <Tooltip title={`Helpful: ${record.totalHelpful}\nReported: ${record.totalReported}`} color={colors.objects}>
                <Space>
                    <Space>
                        <Text style={{...text3Bold, color: colors.secondary}}>{record.totalHelpful}</Text>
                        <LiaHandsHelpingSolid size={24} color={colors.secondary}/>
                    </Space>
                    <Space>
                        <Text style={{...text3Bold, color: colors.destructive}}>{record.totalReported}</Text>
                        <TbMessageReport size={24} color={colors.destructive}/>
                    </Space>
                </Space>
              </Tooltip>
          )
        },
        {
            title: selectedRowKeys.length > 0 &&
                <Space>
                    <Tooltip title={"Approve All"} color={colors.secondary}>
                        <ConfirmModal
                            loading={muteManyFetching}
                            title={"Approve all selected rows?"} onConfirm={async () => {
                            try{
                                console.log(selectedRowKeys)
                                await muteMany({ids: selectedRowKeys, approved: true}).unwrap()
                                message.success("Updated successfully!")
                            }catch{
                                message.error("Some Error")
                            }
                        }}>
                            <Button
                                loading={muteFetching}
                                type={"secondary"}
                                style={ReviewPageStyles.muteButton}
                            ><VscUnmute size={24}  color={colors.secondary}/>
                            </Button>
                        </ConfirmModal>
                    </Tooltip>
                    <ConfirmModal
                        loading={muteManyFetching}
                        title={"Mute all selected rows?"} onConfirm={async () => {
                        try{
                            console.log(selectedRowKeys)
                            await muteMany({ids: selectedRowKeys, approved: false}).unwrap()
                            message.success("Updated successfully!")
                        }catch{
                            message.error("Some Error")
                        }
                    }}>
                    <Tooltip title={"Mute All"} color={colors.destructive}>
                        <Button
                        loading={muteFetching}
                        type={"destructive"} style={ReviewPageStyles.muteButton}><VscMute size={24}  color={colors.destructive} /></Button>
                    </Tooltip>
                    </ConfirmModal>
                </Space>,
            dataIndex: "id",
            render: (_, record) => {
                const onPress = () => {
                    muteReview(record.id);
                }
                const disabled = record.isApproved ?
                    <Button
                        loading={muteFetching}
                        onClick={(e => {
                            e.stopPropagation()
                            onPress()
                        })}
                        type={"secondary"}
                        style={ReviewPageStyles.muteButton}
                    ><VscUnmute size={24}  color={colors.secondary}/></Button>
                    : <Button
                        loading={muteFetching}
                        onClick={(e => {
                        e.stopPropagation()
                        onPress()
                    })} type={"destructive"} style={ReviewPageStyles.muteButton}><VscMute size={24}  color={colors.destructive} /></Button>
                return (
                    <Tooltip title={record.isApproved ? "Mute" : "Approve"} color={record.isApproved ? colors.secondary : colors.destructive}>
                        {disabled}
                    </Tooltip>
                )
            },

        },
    ]



    const onMuteChanged = (checkedChildren: boolean, mode:  keyof typeof muteFilters) => {

        let newMuteFilters = {
            ...muteFilters,
            approve: mode === "approve" ? checkedChildren : muteFilters.approve,
            mute: mode === "mute" ? checkedChildren : muteFilters.mute,
        }


        if(!newMuteFilters.approve && !newMuteFilters.mute) {
            newMuteFilters = {
                ...muteFilters,
                approve: true,
                mute: true,
                [mode]: false
            }
        }

        const filters = filterOptions.filterObjects?.filter(f => f.propertyName !== "isApproved") ?? []

        if (XOR(newMuteFilters.approve, newMuteFilters.mute)) {
            if(newMuteFilters.approve) {
                setFilterOptions({
                    ...filterOptions,
                    filterObjects: [...filters,{
                        propertyName: "isApproved",
                        value: "true",
                    }]
                })
            } else if (newMuteFilters.mute) {
                setFilterOptions({
                    ...filterOptions,
                    filterObjects: [...filters,{
                        propertyName: "isApproved",
                        value: "false",
                    }]
                })
            }
        }else setFilterOptions({...filterOptions, filterObjects: [...filters]})

        setMuteFilters(newMuteFilters)
    }

    const onFilterReset = () => {
     setMuteFilters({
         mute: true,
         approve: true,
         helpful: false,
         reported: false
     })
        setInterval(null)
        setFilterOptions(initialFilterState)
    }


    return (
        <div>
            <Row style={ReviewPageStyles.row} gutter={32}>
                <Col span={16}>
                    <Table
                        sticky
                        rowSelection={{type: "checkbox", ...rowSelection}}
                        rowKey={"id"}
                        loading={isFetching}
                        styles={antdPageTableStyles<ProductReview>()}
                        dataSource={reviews}
                        columns={columns}
                        pagination={false}
                        onChange={(_,__,actions) => {
                            const action = actions as SorterResult<ProductReview>;
                            setFilterOptions({
                                ...filterOptions,
                                orderPropertyName: action.field as keyof ProductReview,
                                descendingOrder: action.order === "descend"
                            })
                        }}

                        onRow={(record) => {
                            return {
                                onClick: (e) => {
                                    e.stopPropagation()
                                    setSelectedRecord(record)
                                    setShowReview(true)
                                },
                                style: {
                                    cursor: "pointer",
                                },
                            };
                        }}
                    />
                    <Divider />
                    <Pagination
                        defaultPageSize={filterOptions.pageSize}
                        showSizeChanger
                        pageSizeOptions={[10, 20, 50, 100]}
                        onChange={(page, pageSize) => {
                            setSelectedRowKeys([])
                            setFilterOptions({...filterOptions,currentPage: page, pageSize})
                        }}
                        total={data?.statistic.totalReviews}
                    />
                </Col>
                <Col span={8} style={ReviewPageStyles.statCol}>

                    {product &&
                        <>
                        <Flex vertical gap={5} style={ReviewPageStyles.productRoot}>
                            <Text style={header2}>Product Details</Text>
                            <Flex justify={"space-between"}>
                                <Text style={text1}>Name:</Text>
                                <Text style={text1Bold}>{product.name?.hideRest(35)}</Text>
                            </Flex>
                            <Flex justify={"space-between"}>
                                <Text style={text1}>Category:</Text>
                                <Text style={text1Bold}>{product.category?.name}</Text>
                            </Flex>
                            <Flex justify={"space-between"}>
                                <Text style={text1}>SKU:</Text>
                                <Text style={text1Bold}>{product.sku}</Text>
                            </Flex>
                            <Flex justify={"space-between"}>
                                <Text style={text1}>Average rating:</Text>
                                <Space align={"center"}>
                                    <Text style={text1Bold}>{product.averageRating}</Text>
                                    <StarFullIcon size={24} />
                                </Space>
                            </Flex>

                        </Flex>
                            <Divider />
                        </>
                        }


                    <Flex vertical gap={20}>
                    <Flex justify={"space-between"} align={"center"}>
                        <Text style={header2}>Filters</Text>
                        <Tooltip title={"Reset filters"} color={colors.darkBlue}>
                            <Button type={"text"} style={ReviewPageStyles.resetButton} onClick={() => onFilterReset()}>
                                <GrPowerReset size={32} color={colors.darkBlue}/>
                            </Button>
                        </Tooltip>
                    </Flex>
                    <Space>
                        <Text style={text1}>Interval:</Text>
                        <RangePicker styles={ordersRangePickerStyles} picker={"date"}
                                     value={interval}
                                     onChange={dates => {
                                         setInterval(dates)
                                         setFilterOptions({
                                             ...filterOptions,
                                             compareObjects: [
                                                 {
                                                     propertyName: "createdAtUtc",
                                                     lessValue: dates?.[1]?.toISOString(),
                                                     moreValue: dates?.[0]?.toISOString(),
                                                 }
                                             ]
                                         })
                                     }}
                        />

                    </Space>

                        <Space size={"large"}>
                            <Switch style={ReviewPageStyles.switch}
                                    value={muteFilters.approve}
                                    checkedChildren={<Text style={text3}>Approved</Text>}
                                    unCheckedChildren={<Text style={text3}>Approved</Text>}
                                    onChange={(e) => onMuteChanged(e, "approve")}
                            />
                            <Switch  style={ReviewPageStyles.switch}
                                     value={muteFilters.mute}
                                     checkedChildren={<Text style={text3}>Muted</Text>}
                                     unCheckedChildren={<Text style={text3}>Muted</Text>}
                                     onChange={(e) => onMuteChanged(e, "mute")}

                            />
                        </Space>
                    {data?.statistic && <RateStat data={data.statistic}
                                                  onRateSelect={(value) => {
                                                const filterObj = filterOptions.filterObjects?.filter(f => f.propertyName !== "rating") ?? []
                                                setFilterOptions({...filterOptions,
                                                    filterObjects: [...filterObj, {
                                                        propertyName: "rating",
                                                        value: value
                                                    }]
                                                })
                    }}/>}
                    </Flex>
                </Col>

                <Modal
                    centered
                    width={1200}
                    open={showReview}
                    footer={false}
                    onCancel={() => setShowReview(false)}
                >
                    <div style={{paddingTop: 20}}>
                        {selectedRecord && <ReviewListItem onActionFinish={() => setShowReview(false)} item={selectedRecord}/>}
                    </div>
                </Modal>
            </Row>
        </div>
    )
}