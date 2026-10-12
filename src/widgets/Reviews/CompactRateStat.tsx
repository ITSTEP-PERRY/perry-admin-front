import {Flex, Modal, Tooltip} from "antd";
import Text from "antd/es/typography/Text";
import {StarFullIcon} from "../../Components/Icon/StarFullIcon.tsx";
import {text1, text2} from "../../theme/textStyles.ts";
import {colors} from "../../theme/colors.ts";
import type {ProductReviewDto} from "../../types/dto/ReviewDto.ts";
import "./css/rateStatStyles.css"
import {BsArrowsAngleExpand} from "react-icons/bs";
import {Button} from "../../Components/Buttons/Button.tsx";
import {useState} from "react";
import {RateStat} from "./RateStat.tsx";

export type CompactRateStatProps = {
    data: ProductReviewDto["statistic"],
    onRateSelect?: (rate: string) => void;
}

export const CompactRateStat = ({data, onRateSelect}:CompactRateStatProps) => {
    const [open, setOpen] = useState(false);
    return(
        <Flex  vertical >
            <Flex style={{width: "100%", textWrap: "nowrap"}} gap={20} align={"center"}>
                {['5','4','3','2','1'].map((item) => {
                    const value = data.statistics?.find(s => s.name === item)?.value ?? 0
                    const percent = value ? (value / data.totalReviews) * 100 : 0

                    return <Tooltip key={item} title={`Total: ${value}`} color={colors.darkText}>
                        <Flex style={{ cursor: "pointer"}}
                              align={"center"} onClick={() => onRateSelect?.(item)}
                              className={"rateSelected"}
                        >
                                <Text style={text1}>{item}</Text>
                                <StarFullIcon size={24}/>
                                <Text style={text2}>{Math.round(percent)}%</Text>

                            </Flex>
                    </Tooltip>
                })}
                <Tooltip title={"Expand"} color={colors.darkText}>
                    <Button type={"text"}
                            style={{padding: "0px 12px"}}
                            onClick={() => setOpen(!open)}
                    >
                        <BsArrowsAngleExpand size={18}/>
                    </Button>
                </Tooltip>
            </Flex>

            <Modal open={open}
                   onCancel={()=>setOpen(false)}
                   footer={false}
            >
                <RateStat data={data} onRateSelect={onRateSelect}/>
            </Modal>
        </Flex>
    )
}