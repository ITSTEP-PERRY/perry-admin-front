import { useGetUserByIdQuery } from "../../api/slices/userApiSlice"
import type {ProductReview} from "../../types/ProductReview.ts";
import {colors} from "../../theme/colors.ts";
import {VscMute, VscUnmute} from "react-icons/vsc";
import {Avatar, Flex, List, message, Pagination, Space, Tag, Tooltip} from "antd";
import {text2, text2Bold, text3} from "../../theme/textStyles.ts";
import Text from "antd/es/typography/Text";
import {CustomRate} from "../../Components/Inputs/CustomRate.tsx";
import {ImageCollageItem} from "../Product/ProductImageCollage.tsx";
import {useAntdTableRowSelect} from "../../shared/Hooks/useAntdTableRowSelect.tsx";
import {
    useAllReviewsQuery,
    useGetMyGradeByIdQuery,
    useGradeReviewMutation,
    useReportReviewMutation, useSetApprovalReviewMutation
} from "../../api/slices/reviewApiSlice.ts";
import {useState} from "react";
import type {FilterOptions} from "../../types/FilterOptions.ts";
import {Button} from "../../Components/Buttons/Button.tsx";
import {dateFormatter} from "../../shared/formatter.ts";
import {Link} from "react-router";
import {ConfirmModal} from "../../Components/Inputs/ConfirmModal.tsx";

export const ReviewListItem = ({item}: { item: ProductReview }) => {
    const {data: user} = useGetUserByIdQuery(item.userId)
    const {data: grade} = useGetMyGradeByIdQuery(item.id, {
        skip: !item.id
    })
    const [mute, {isLoading: muteLoading}] = useSetApprovalReviewMutation()
    const [gradeReview, {isLoading: gradeLoading}] = useGradeReviewMutation()
    const [reportReview, {isLoading: reportLoading}] = useReportReviewMutation()
    const disabled = item.isApproved ?
        <Button type={"secondary"} ><VscUnmute size={24}  color={colors.secondary}/></Button>
        : <Button type={"destructive"} ><VscMute size={24}  color={colors.destructive} /></Button>


    const reported = grade && grade.reported
    const isHelpful = !!grade && grade.isHelpful

    return (
        <List.Item

        >
            <List.Item.Meta
                avatar={
                <Flex justify={"space-between"} >
                    <Flex vertical gap={10}>
                        <Space>
                            <Avatar src={user?.avatar} size={"small"} />
                            <Link to={`/reviews/${item.userId}`}>{item.authorName ? item.authorName : `${user?.lastName} ${user?.firstName}`}</Link>
                        </Space>
                        <CustomRate disabled value={Number(item.rating)} size={18} />
                    </Flex>
                    <Text>{dateFormatter.format(new Date(item.createdAtUtc))}</Text>
                </Flex>
                }
            />
            <Flex vertical gap={10}>
                <Flex vertical gap={10}>
                    <Text style={text2Bold}>{item.title}</Text>
                    <Text style={text3}>{item.body}</Text>
                </Flex>
                <Flex>
                    {item.images.map((image, index) => (
                            <ImageCollageItem key={index} src={image.url}
                                              width={140}
                                              height={"100px"}

                            />
                    ))}
                </Flex>
                <Flex gap={10}>
                    {item.tags.map((tag, index) => (
                        <Tag key={index} style={{padding:10, ...text3}} color={colors.secondary}>{tag.name}</Tag>
                    ))}
                </Flex>
                <Flex justify="space-between" align={"center"}>
                    <Space style={{ marginTop: 10 }}>
                        <Button
                            type={isHelpful ? "primary" : "secondary"}
                            loading={gradeLoading}
                            onClick={async () =>{
                                try{
                                    await gradeReview(item.id).unwrap()
                                    await message.success("Success")

                                }catch{
                                    message.error("Some error")
                                }
                            }}
                        ><Text style={text2}>Helpful</Text></Button>
                        |
                        <ConfirmModal
                            loading={reportLoading}
                            onConfirm={async () => {
                            try{
                                await reportReview(item.id).unwrap()
                                message.success(reported ? "Reported successfully." : "Reported cancelled.")

                            }catch{
                                message.error("Some error")
                            }
                        }} body={<Text style={{...text2, textAlign: "center"}}>
                            {reported ? "Do you want cancel your report ?" : "We’ll check if this review meets our community guidelinesOpens in a new tab. If it does not, we will remove it."}
                        </Text>}>
                            <Button
                                type={"destructive"}
                                style={{backgroundColor: reported ? colors.destructive : ""}}
                            ><Text style={{...text2, color: reported ? "white" : "" }}>
                                {reported ? "Reported" : "Report"}
                            </Text></Button>
                        </ConfirmModal>
                        |
                        <ConfirmModal
                            loading={muteLoading}
                            body={<Text style={{...text2, textAlign: "center"}}>
                                {item.isApproved ? "Mute current review?" : "Approve current review?"}
                            </Text>}
                            onConfirm={async () =>{
                                try {
                                    await mute(item.id).unwrap()
                                    message.success("Success")
                                }catch{
                                    message.error("Some error")
                                }
                            }}
                        >
                        <Tooltip title={item.isApproved ? "Mute" : "Approve"} color={item.isApproved ? colors.secondary : colors.destructive}>
                            {disabled}
                        </Tooltip>
                        </ConfirmModal>
                    </Space>
                    <Link to={`/reviews/${item.productId}`} >See all Product reviews</Link>
                </Flex>
            </Flex>
        </List.Item>
    )
}

export const ReviewList = () => {
    const [filterOptions, setFilterOptions] = useState<FilterOptions<ProductReview>>({
        pageSize: 3,
        descendingOrder: true
    });
    const {setSelectedRowKeys} = useAntdTableRowSelect<ProductReview>()

    const {data, isFetching} = useAllReviewsQuery({options: filterOptions});

    const reviews = data?.pagedList.items;
    return (
        <div>
            <Flex vertical gap={20} justify={"center"} >
                <List
                    style={{overflow: "auto", maxHeight: "70vh"}}
                    itemLayout={"vertical"}
                    loading={isFetching}
                    dataSource={reviews}
                    renderItem={(review, index) => (
                        <ReviewListItem key={index} item={review}/>
                    )}
                />
                <Pagination
                    defaultPageSize={filterOptions.pageSize}
                    pageSizeOptions={[Number(filterOptions.pageSize), 20, 50, 100]}
                    onChange={(page, pageSize) => {
                        setSelectedRowKeys([])
                        setFilterOptions({...filterOptions, page, pageSize})
                    }}
                    showSizeChanger
                    total={data?.statistic.totalReviews}
                />
            </Flex>
        </div>
    )
}