import {Col, Divider, Flex, Row} from "antd";
import {
    categoryPageBaseSearchStyles, categoryPageDescriptionStyles, categoryPageEmptyDescriptionStyles,
    categoryPageRootStyles,
    categoryPageSelectStyles, 
} from "./css/categoryPageStyles.ts";
import {Select} from "../Components/Select/Select.tsx";
import {AddButton} from "../Components/Buttons/AddButton.tsx";
import Text from "antd/es/typography/Text";
import {text1, text2} from "../theme/textStyles.ts";
import {BaseSearch} from "../Components/Search/BaseSearch.tsx";
import {ItemNotFound} from "../widgets/ItemNotFound.tsx";
import {CategoryTree} from "../widgets/CategoryTree.tsx";


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
                <Col span={8} style={categoryPageDescriptionStyles}>
                    {categories ?
                            <Flex vertical>
                                <Divider />
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