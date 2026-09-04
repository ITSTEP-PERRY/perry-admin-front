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
import {header3} from "../theme/headerStyles.ts";
import Title from "antd/es/typography/Title";
import Hanger from "../assets/icons/Hanger.svg"
import {Button} from "../Components/Buttons/Button.tsx";
import {EditIcon} from "../Components/Icon/EditIcon.tsx";
import {colors} from "../theme/colors.ts";
import {TrashcanIcon} from "../Components/Icon/TrashcanIcon.tsx";
import {
    useCategoriesQuery,
    useCategoryByIdQuery,
    useDeleteCategoryByIdMutation,
    useLazyCategoryByIdQuery
} from "../api/categoryApiSlice.ts";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {getCurrentCategory, setCurrentCategory} from "../app/slices/categorySlice.ts";
import {CreateOrUpdateCategoryModal} from "../widgets/Category/CreateOrUpdateCategoryModal.tsx";
import {DeleteModal} from "../Components/Inputs/DeleteModal.tsx";

export const CategoryPage = () => {
    const {data: categories, isLoading, refetch} = useCategoriesQuery()
    const [selectedCategory, setSelectedCategory] = useState("");
    const {refetch: refetchSelectedCategory} = useCategoryByIdQuery(selectedCategory)
    const currentCategory = useAppSelector(getCurrentCategory)
    const [triggerFetch] = useLazyCategoryByIdQuery();
    const dispatch = useAppDispatch();
    const [deleteCategory, {isLoading: deleteLoading}] = useDeleteCategoryByIdMutation();

    const options = categories?.map(category => ({
        value: category.id,
        label: category.name,
    }))


    return (
            <Row gutter={24} style={categoryPageRootStyles}>
                <Col span={16}>
                    <Flex gap={16} align={"center"}>
                        <Text style={{...text1, textWrap: "nowrap"}}>Category</Text>
                        <Select style={categoryPageSelectStyles}
                                 loading={isLoading}
                                 placeholder="Choose a category"
                                 options={options}
                                 value={selectedCategory}
                                 onChange={async (e) => {
                                        setSelectedCategory(e);
                                        const t = await triggerFetch(e)
                                        dispatch(setCurrentCategory(t.data ?? currentCategory));
                                 }}
                                 popupRender={(menu) => (
                                     <Flex vertical>
                                         <AddButton>
                                             <Text style={text2}>Add category</Text>
                                         </AddButton>
                                         {menu}
                                     </Flex>
                                 )}
                        />
                        <BaseSearch style={categoryPageBaseSearchStyles}/>
                    </Flex>
                        {selectedCategory ?
                             <CategoryTree categoryId={selectedCategory}/>
                        :
                            <Flex align={"center"} justify={"center"} style={{height: "100%"}}>

                                <ItemNotFound text={"No subcategories in the selected category"} />
                            </Flex>

                        }
                </Col>
                <Col span={8} style={categoryPageDescriptionStyles.container}>
                    {currentCategory.id ?
                        <Flex vertical justify={"space-between"} style={{height: "100%"}}>
                            <Flex vertical>
                                {currentCategory.imageUrl && <img src={currentCategory.imageUrl} alt={currentCategory.imageUrl}
                                      style={categoryPageDescriptionStyles.image}/>}
                                <Space style={categoryPageDescriptionStyles.margin} size={"medium"}>
                                    <img src={Hanger} alt={Hanger}/>
                                    <Title style={header3}>{currentCategory.name}</Title>
                                </Space>
                                <Divider style={categoryPageDescriptionStyles.divider}/>
                                <Text style={{...text3, ...categoryPageDescriptionStyles.margin}}>{currentCategory.description}</Text>
                                <Divider style={categoryPageDescriptionStyles.divider}/>
                                <Flex justify={"space-between"} style={categoryPageDescriptionStyles.margin}>
                                    <Text style={text2Bold}>Status</Text>
                                    <Text style={text3}>{currentCategory.isActive ? "Active" : "Disabled"}</Text>
                                </Flex>
                                <Flex justify={"space-between"} >
                                    <Text style={text2Bold}>Role</Text>
                                    <Text style={text3}>{currentCategory.parentCategoryId ? "Fashion" : "Parent category"}</Text>
                                </Flex>
                            </Flex>
                            <Flex justify={"space-between"} gap={12}>
                                <CreateOrUpdateCategoryModal style={{width: "100%"}} category={currentCategory}>
                                    <Button type={"secondary"} style={categoryPageDescriptionStyles.button}>
                                        <EditIcon size={28} color={colors.secondary}/>
                                        <Text style={text2}>Edit</Text>
                                    </Button>
                                </CreateOrUpdateCategoryModal>
                                <DeleteModal body={
                                    <Flex vertical align={"center"}>
                                        <Text style={text1}>You can't recover categories, subcategories;</Text>
                                        <Text style={text1}>products will be deactivated.</Text>
                                    </Flex>
                                    }
                                    onConfirm={async () => {
                                    await deleteCategory(currentCategory.id)
                                    await refetchSelectedCategory()
                                    await refetch()
                                }}>
                                    <Button loading={deleteLoading} type={"destructive"} style={categoryPageDescriptionStyles.button}>
                                        <TrashcanIcon size={28} color={colors.destructive}/>
                                        <Text style={text2} >Delete</Text>
                                    </Button>
                                </DeleteModal>
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