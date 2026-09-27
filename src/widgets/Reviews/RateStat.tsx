import {Flex, Space, Tooltip} from "antd";
import Text from "antd/es/typography/Text";
import {StarFullIcon} from "../../Components/Icon/StarFullIcon.tsx";
import {text1, text1Bold, text2} from "../../theme/textStyles.ts";
import {colors} from "../../theme/colors.ts";
import type {ProductReviewDto} from "../../types/dto/ReviewDto.ts";
import "./css/rateStatStyles.css"

export type RateStatProps = {
    data: ProductReviewDto["statistic"],
    onRateSelect?: (rate: string) => void;
}

export const RateStat = ({data, onRateSelect}:RateStatProps) => {
    console.log(data)
    return(
        <Flex style={{width: "100%"}} vertical gap={10}>
            <Flex gap={50}>
                <Space >
                    <Text style={text1}>Total Review:</Text>
                    <Text style={text1Bold}>{data.totalReviews}</Text>
                </Space>
                <Space >
                    <Text style={text1}>Total Comments:</Text>
                    <Text style={text1Bold}>{data.totalComments}</Text>
                </Space>
            </Flex>
           <Flex style={{width: "100%"}} vertical>
               {['5','4','3','2','1'].map((item) => {
                   const value = data.statistics?.find(s => s.name === item)?.value ?? 0
                   const percent = value ? (value / data.totalReviews) * 100 : 0

                   return <Tooltip key={item} title={`Total: ${value}`} color={colors.darkText}>
                           <Flex style={{width: "100%", cursor: "pointer"}}
                                        align={"center"} gap={10} onClick={() => onRateSelect?.(item)}
                                        className={"rateSelected"}
                           >
                               <Flex>
                                   <Text style={text1}>{item}</Text>
                                   <StarFullIcon size={24}/>
                               </Flex>
                               <Flex style={{width: "100%"}} gap={10}>
                                   <Flex style={{width: "80%"}}>
                                       <div style={{width: `${percent}%`, height: "20px", backgroundColor: colors.darkText,}}></div>
                                       <div style={{width: `${100 - (percent ?? 100)}%`, height: "20px", backgroundColor: colors.objects}}></div>
                                   </Flex>
                                   <Text style={text2}>{Math.round(percent)}%</Text>
                               </Flex>
                           </Flex>
                   </Tooltip>
               })}
           </Flex>
        </Flex>
    )
}