import type {ProductReview} from "../../types/ProductReview.ts";
import {Flex, List, Pagination} from "antd";
import {useAntdTableRowSelect} from "../../shared/Hooks/useAntdTableRowSelect.tsx";
import {
    useAllReviewsQuery,
} from "../../api/slices/reviewApiSlice.ts";
import {useState} from "react";
import type {FilterOptions} from "../../types/FilterOptions.ts";
import {ReviewListItem} from "./ReviewListItem.tsx";



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