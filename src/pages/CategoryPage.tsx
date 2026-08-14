import {Col, Divider, Flex, Row, Space} from "antd";
import {
    categoryPageBaseSearchStyles, categoryPageDescriptionStyles, categoryPageEmptyDescriptionStyles,
    categoryPageRootStyles,
    categoryPageSelectStyles, 
} from "./css/categoryPageStyles.ts";
import {Select} from "../Components/Select/Select.tsx";
import {AddButton} from "../Components/Buttons/AddButton.tsx";
import Text from "antd/es/typography/Text";
import {text1, text2, text2Bold, text3} from "../theme/textStyles.ts";
import {BaseSearch} from "../Components/Search/BaseSearch.tsx";
import {ItemNotFound} from "../widgets/ItemNotFound.tsx";
import {CategoryTree} from "../widgets/Category/CategoryTree.tsx";
import {categoryDummyData} from "../data/dummy/categoryDummyData.ts";
import {header3} from "../theme/headerStyles.ts";
import Title from "antd/es/typography/Title";
import Hanger from "../assets/icons/Hanger.svg"
import {Button} from "../Components/Buttons/Button.tsx";
import {EditIcon} from "../Components/Icon/EditIcon.tsx";
import {colors} from "../theme/colors.ts";
import {TrashcanIcon} from "../Components/Icon/TrashcanIcon.tsx";

const options = [
    { value: "Fashion", label: "Fashion" },
    { value: "Electronics", label: "Electronics" },
    { value: "Household", label: "Household" },
    { value: "WorkTools", label: "Work Tools" },
]


const categories = true
export const CategoryPage = () => {
    return (
            <Row gutter={24} style={categoryPageRootStyles}>
                <Col span={16}>
                    <Flex gap={16} align={"center"}>
                        <Text style={{...text1, textWrap: "nowrap"}}>Category</Text>
                        <Select style={categoryPageSelectStyles}
                                placeholder="Choose a category"
                                options={options}
                                popupRender={(menu) => (
                                    <Flex vertical >
                                        <AddButton>
                                            <Text style={text2}>Add category</Text>
                                        </AddButton>
                                        {menu}
                                    </Flex>
                                )}
                        />
                        <BaseSearch style={categoryPageBaseSearchStyles}/>
                    </Flex>
                        {categories ?
                             <CategoryTree categoryId={"10"}/>
                        :
                            <Flex align={"center"} justify={"center"} style={{height: "100%"}}>

                                <ItemNotFound text={"No subcategories in the selected category"} />
                            </Flex>

                        }
                </Col>
                <Col span={8} style={categoryPageDescriptionStyles.container}>
                    {categories ?
                        <Flex vertical justify={"space-between"} style={{height: "100%"}}>
                            <Flex vertical>
                                <img src={categoryDummyData.imageUrl!} alt={categoryDummyData.imageUrl!}
                                     style={categoryPageDescriptionStyles.image}/>
                                <Space style={categoryPageDescriptionStyles.margin} size={"medium"}>
                                    <img src={Hanger} alt={Hanger}/>
                                    <Title style={header3}>{categoryDummyData.name}</Title>
                                </Space>
                                <Divider style={categoryPageDescriptionStyles.divider}/>
                                <Text style={{...text3, ...categoryPageDescriptionStyles.margin}}>{categoryDummyData.description}</Text>
                                <Divider style={categoryPageDescriptionStyles.divider}/>
                                <Flex justify={"space-between"} style={categoryPageDescriptionStyles.margin}>
                                    <Text style={text2Bold}>Status</Text>
                                    <Text style={text3}>{categoryDummyData.isActive ? "Active" : "Disabled"}</Text>
                                </Flex>
                                <Flex justify={"space-between"} >
                                    <Text style={text2Bold}>Role</Text>
                                    <Text style={text3}>{categoryDummyData.parentCategoryId ? "Fashion" : "Parent category"}</Text>
                                </Flex>
                            </Flex>
                            <Flex justify={"space-between"} gap={12}>
                                <Button type={"secondary"} style={categoryPageDescriptionStyles.button}>
                                    <EditIcon size={28} color={colors.secondary}/>
                                    <Text style={text2}>Edit</Text>
                                </Button>
                                <Button type={"destructive"} style={categoryPageDescriptionStyles.button}>
                                    <TrashcanIcon size={28} color={colors.destructive}/>
                                    <Text style={text2}>Delete </Text>
                                </Button>
                            </Flex>
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