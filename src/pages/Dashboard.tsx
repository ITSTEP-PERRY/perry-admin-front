import {WishlistStatChart} from "../widgets/Charts/Wishlist/WishListStatChart.tsx";
import {Flex, Image, Modal,Space} from "antd";
import {useState} from "react";
import Text from "antd/es/typography/Text";
import {text1, text2, text3} from "../theme/textStyles.ts";
import {useGetPopularProductsBySellerIdQuery, useGetPopularProductsQuery} from "../api/slices/productApiSlice.ts";
import {CustomSpin} from "../Components/Utils/CustomSpin.tsx";
import {StarFullIcon} from "../Components/Icon/StarFullIcon.tsx";
import {dashboardStyles} from "./css/dashboardStyles.ts";
import {CommentsIcon} from "../Components/Icon/CommentsIcon.tsx";
import {EyeOpenIcon} from "../Components/Icon/EyeOpenIcon.tsx";
import {header3} from "../theme/headerStyles.ts";
import {CiDeliveryTruck} from "react-icons/ci";
import {OrderStatusPieChart} from "../widgets/Charts/Order/OrderStatusPieChart.tsx";
import {useAppSelector} from "../app/hooks.ts";
import {getUser} from "../app/slices/userSlice.ts";
import type {ProductType} from "../types/ProductType.ts";


const PopularItems = ({popularProducts}: { popularProducts: ProductType[] }) => {
    return (
        <Flex vertical gap={3} style={dashboardStyles.popularContainer}>
            {popularProducts && popularProducts.map((item) => (
                <Flex key={item.id} style={dashboardStyles.popularItem} >
                    <Image src={item.imageUrl} width={70}/>
                    <Flex vertical justify={"center"} gap={10}>
                        <a href={"https://" + import.meta.env.VITE_BASE_DOMAIN + `/products/${item.id}`} style={{fontSize: text2.fontSize}}>{item.name?.hideRest(30)}</a>
                        <Flex gap={15}>
                            <Space>
                                <EyeOpenIcon size={24}/>
                                <Text style={text3}>{item.viewCount}</Text>
                            </Space>
                            <Space>
                                <CiDeliveryTruck size={24} />
                                <Text style={text3}>{item.orderCount}</Text>
                            </Space>
                            <Space>
                                <CommentsIcon size={24}/>
                                <Text style={text3}>{item.reviewCount}</Text>
                            </Space>
                            <Space>
                                <StarFullIcon size={24} />
                                <Text style={text3}>{item.averageRating}</Text>
                            </Space>
                        </Flex>
                    </Flex>
                </Flex>
            ))}
            <Flex justify="center">
                <a style={{fontSize: text1.fontSize}}>See more...</a>
            </Flex>
        </Flex>
    )
}

export function Dashboard() {
    const [open, setOpen] = useState(false);

    const {data: popularProducts, isFetching: popularFetching} = useGetPopularProductsQuery(5)
    const user = useAppSelector(getUser)
    const {data: myPopularProducts, isFetching: myPopularFetching} = useGetPopularProductsBySellerIdQuery({
        id: user?.id ?? "",
        take: 5
    },{
        skip: !user
    })

    return (
        <div style={{height:'93vh'}}>
            <Flex style={{width:'100%'}} justify={"space-between"}>
                <Flex style={dashboardStyles.leftRoot}>
                    <Flex style={{width:'100%', height: "fit-content"}} gap={10}>
                        <WishlistStatChart style={{ width: "30%",  }} chartHeight={"25vh"} onExpand={() => setOpen(true)} />
                        <OrderStatusPieChart style={{ width: "40%",  }} chartHeight={"25vh"} />
                    </Flex>
                </Flex>
                    <Flex style={dashboardStyles.rightRoot} vertical gap={10}>
                        <Flex vertical gap={10} style={dashboardStyles.popularRoot}>
                            <Text style={header3}>Top My Products</Text>
                            {myPopularFetching ?
                                <CustomSpin />
                                :
                                <PopularItems popularProducts={myPopularProducts?.items ?? []}/>
                            }
                        </Flex>
                        <Flex vertical gap={10} style={dashboardStyles.popularRoot}>
                            <Text style={header3}>Top Viewed Products</Text>
                            {popularFetching ?
                                <CustomSpin />
                                :
                                <PopularItems popularProducts={popularProducts?.items ?? []}/>
                            }
                        </Flex>
                    </Flex>
            </Flex>
            <Modal
                open={open}
                onCancel={() => setOpen(false)} width={"100%"} height={"100vh"}
                footer={null}
                closable={false}
                styles={{container: {padding: '0'}}}
            >
                <WishlistStatChart style={{ width: "100%"}} chartHeight={"40vh"} expanded onExpand={() => setOpen(false)} />
            </Modal>
        </div>
    )
}

