import {Col, Divider, Flex, Row, Skeleton, Space} from "antd";
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
    useCategoryByIdQuery, useCategoryBySlugQuery,
    useDeleteCategoryByIdMutation,
} from "../api/slices/categoryApiSlice.ts";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {getCurrentCategorySlug, resetCurrentCategory} from "../app/slices/categorySlice.ts";
import {CreateOrUpdateCategoryModal} from "../widgets/Category/CreateOrUpdateCategoryModal.tsx";
import {ConfirmModal} from "../Components/Inputs/ConfirmModal.tsx";
import {findCategoryByCategoryId} from "../utils/search/categorySearch.ts";
import type {CategoryType} from "../types/CategoryType.ts";
import {CustomSpin} from "../Components/Utils/CustomSpin.tsx";

export const CategoryPage = () => {
    const {data: categories, isFetching} = useCategoriesQuery()
    const [selectedCategory, setSelectedCategory] = useState("");
    const selectedCategorySlug = useAppSelector(getCurrentCategorySlug)
    const {isFetching: categoryTreeLoading} = useCategoryByIdQuery(selectedCategory, {
        skip: !selectedCategory,
    })
    const {data: categoryDetails, isFetching: categoryDetailsFetching} = useCategoryBySlugQuery(selectedCategorySlug, {
        skip: !selectedCategory,
    })
    const dispatch = useAppDispatch();
    const [deleteCategory, {isLoading: deleteLoading}] = useDeleteCategoryByIdMutation();
    const [searchValue, setSearchValue] = useState("");

    const parentCategory = findCategoryByCategoryId(categoryDetails?.parentCategoryId as string, categories) as CategoryType;

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
                                 loading={isFetching}
                                 placeholder="Choose a category"
                                 options={options}
                                 value={selectedCategory}
                                 onChange={async (e) => {
                                        setSelectedCategory(e);
                                        dispatch(resetCurrentCategory());

                                 }}
                                 popupRender={(menu) => (
                                     <Flex vertical>
                                         <CreateOrUpdateCategoryModal>
                                             <AddButton>
                                                 <Text style={text2}
                                                 >Add category</Text>
                                             </AddButton>
                                         </CreateOrUpdateCategoryModal>
                                         {menu}
                                     </Flex>
                                 )}
                        />
                        <BaseSearch value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    style={categoryPageBaseSearchStyles}/>
                    </Flex>
                        {selectedCategory ?
                            categoryTreeLoading ? <CustomSpin text={"Fetching category..."} style={{height: "90%"}} /> :
                             <CategoryTree key={selectedCategory} categoryId={selectedCategory} searchValue={searchValue}/>
                        :
                            <Flex align={"center"} justify={"center"} style={{height: "100%"}}>
                                <ItemNotFound text={"No subcategories in the selected category"} />
                            </Flex>

                        }
                </Col>
                <Col span={8} style={categoryPageDescriptionStyles.container}>
                    {categoryDetails?.id ?
                        categoryDetailsFetching ?
                            <Skeleton active/>
                            :
                        <Flex vertical justify={"space-between"} style={{height: "100%"}} >
                            <Flex vertical gap={5}>
                                {categoryDetails.imageUrl && <img src={categoryDetails.imageUrl} alt={categoryDetails.imageUrl}
                                      style={categoryPageDescriptionStyles.image}/>}
                                <Space style={categoryPageDescriptionStyles.margin} size={"medium"}>
                                    <img src={Hanger} alt={Hanger}/>
                                    <Title style={header3}>{categoryDetails.name}</Title>
                                </Space>
                                <Divider style={categoryPageDescriptionStyles.divider}/>
                                <Text style={{...text3, ...categoryPageDescriptionStyles.margin}}>{categoryDetails.description}</Text>
                                <Divider style={categoryPageDescriptionStyles.divider}/>
                                <Flex justify={"space-between"} style={categoryPageDescriptionStyles.margin}>
                                    <Text style={text2Bold}>Status</Text>
                                    <Text style={text3}>{categoryDetails.isActive ? "Active" : "Disabled"}</Text>
                                </Flex>
                                <Flex justify={"space-between"} align={"baseline"}>
                                    <Text style={text2Bold}>Role</Text>
                                    <Text style={text3}>{categoryDetails.parentCategoryId ? "Child" : "Parent"} category</Text>
                                </Flex>

                                {categoryDetails.parentCategoryId &&
                                    <>
                                    <Flex justify={"space-between"} align={"baseline"}>
                                        <Text style={text2Bold}>Parent category</Text>
                                        <Text
                                            style={text3}>{parentCategory?.name}</Text>
                                    </Flex>
                                    </>
                                }
                            </Flex>
                            <Flex justify={"space-between"} gap={12}>
                                <CreateOrUpdateCategoryModal style={{width: "100%"}} edit>
                                    <Button type={"secondary"} style={categoryPageDescriptionStyles.button}>
                                        <EditIcon size={28} color={colors.secondary}/>
                                        <Text style={text2}>Edit</Text>
                                    </Button>
                                </CreateOrUpdateCategoryModal>
                                <ConfirmModal loading={deleteLoading} type={"danger"} confirmText={"Delete"} body={
                                    <Flex vertical align={"center"}>
                                        <Text style={text1}>You can't recover categories, subcategories;</Text>
                                        <Text style={text1}>products will be deactivated.</Text>
                                    </Flex>
                                    }
                                              onConfirm={async () => {
                                                await deleteCategory(categoryDetails.id)
                                                  dispatch(resetCurrentCategory());

                                }}>
                                    <Button type={"destructive"} style={categoryPageDescriptionStyles.button}>
                                        <TrashcanIcon size={28} color={colors.destructive}/>
                                        <Text style={text2} >Delete</Text>
                                    </Button>
                                </ConfirmModal>
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