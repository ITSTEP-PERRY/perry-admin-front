import {selectNodeStyles, selectTreeStyles} from "./css/selectTreeStyles.ts";
import {type ComponentProps, type CSSProperties, type ReactNode, useEffect, useState} from "react";
import {ArrowUpIcon} from "../Icon/ArrowUpIcon.tsx";
import {ArrowDownIcon} from "../Icon/ArrowDownIcon.tsx";
import {motion} from "motion/react";
import type {CategoryType} from "../../types/CategoryType.ts";
import "./css/styles.css"
import type {SelectOptions} from "../../types/SelectOptions.ts";
import {TickIcon} from "../Icon/TickIcon.tsx";
import {text2} from "../../theme/textStyles.ts";
import {Form, type Select} from "antd";
import {colors} from "../../theme/colors.ts";
import {ClosableDiv} from "../General/ClosableDiv.tsx";
import {searchCategoryToSelectOptions} from "../../utils/search/categorySearch.ts";
import {useCategoriesQuery} from "../../api/categoryApiSlice.ts";
import {useAppSelector} from "../../app/hooks.ts";
import {getCurrentCategoryId} from "../../app/slices/categorySlice.ts";

export type SelectTreeProps = {
    label?: string;
    placeholder?: string;
    suffix?: ReactNode;
    categories?: CategoryType[];
    onChange?: (categoryId: string) => void;
    value?: string;
    styles?: {
        label?: CSSProperties,
        popup?: CSSProperties,
    };
    style?: CSSProperties;
    status?: ComponentProps<typeof Select>["status"];
}

type SelectCategoryNodeProps = {
    category: CategoryType;
    style?: CSSProperties;
    setSelected?: (selected: SelectOptions) => void;
    selected?: SelectOptions;
    setOpenRoot?: (open: boolean) => void;
    open?: boolean;
    onValueChange?: (value: string) => void;
}

const SelectCategoryNode = ({category, style, ...props}: SelectCategoryNodeProps ) => {
    const [open, setOpen] = useState(false);
    const actualSuffix = open ? <ArrowUpIcon size={18} width={3}/> : <ArrowDownIcon size={18} width={3}/>
    const {data: categories} = useCategoriesQuery()
    const currentCategoryId = useAppSelector(getCurrentCategoryId);

    const handleDisplaySelected = (id: string) => {
        const tree: string[] = []
        const inner = (id: string, categories: CategoryType[]): boolean => {
            for (const item of categories) {
                if (item.id === id) {
                    return true;
                }
                if (item.subCategories && item.subCategories?.length > 0) {
                    const result = inner(id, item.subCategories)
                    if(result) tree.push(item.id)
                }
            }
            return false
        }
        if (categories) inner(id, categories)
        return tree
    }
    const include = handleDisplaySelected(props.selected?.value as string).includes(category.id)

    useEffect(() => {
        if (category.id === props.selected?.value) {
            const elem = document.getElementById(props.selected.value as string);
            elem?.scrollIntoView({behavior: "smooth"})
        }
    }, [category.id, props.selected]);


    return (
        <div id={category.id} style={{...selectNodeStyles.root, ...style}}>
                <div className="optionNode"
                    style={selectNodeStyles.container}
                     onClick={() => setOpen(!open)}
                >
                    <span style={selectNodeStyles.label}
                          onClick={(e) => {
                              e.stopPropagation();
                              if(props.setSelected) {
                                  props.setSelected({
                                      ...props.selected,
                                      value: category.id,
                                      label: category.name,
                                  })
                              }
                              // console.log(category.id)

                              props.onValueChange?.(category.id);
                              props.setOpenRoot?.(false)
                          }}
                    >
                        {category.name}
                    </span>
                        <div style={selectNodeStyles.suffixContainer}>
                            { category.id === props.selected?.value && <TickIcon size={9} width={1}/>}
                            {category?.subCategories && category?.subCategories?.length > 0 && <span>{actualSuffix}</span>}
                        </div>
                </div>
            {(open || include) && category.subCategories?.filter(c => c.id !== currentCategoryId).map((subCategory: CategoryType) => (
                <SelectCategoryNode key={subCategory.id}
                                    category={subCategory}
                                    style={selectNodeStyles.innerContainer}
                                    selected={props.selected}
                                    setSelected={props.setSelected}
                                    setOpenRoot={props.setOpenRoot}
                                    onValueChange={props.onValueChange}
                />
            ))}
        </div>
    )
}

export const SelectCategoryTree = (props: SelectTreeProps) => {
    const { status } = Form.Item.useStatus();
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<SelectOptions>(searchCategoryToSelectOptions(props.value, props.categories) ?? {});
    const actualSuffix = props.suffix ? props.suffix : open ? <ArrowUpIcon size={18}/> : <ArrowDownIcon size={18}/>;

    const handleOpen = () => {
        setOpen(!open)

        const elem = document.getElementById(selected.value as string);
        elem?.scrollIntoView({behavior: "smooth"})
    }

    // useEffect(() => {
    //     props.onChange?.(selected.value as string)
    // }, [props, selected])

    return (
        <div  style={{...selectTreeStyles.root, ...props.style}}>
            <div style={selectTreeStyles.container} onClick={handleOpen}>
                <span style={{...selectTreeStyles.label, ...props.styles?.label, color: status === "error" ? colors.destructive : colors.darkText}}>{props.label}</span>
                <div style={selectTreeStyles.input}>
                    <span style={selected.label ? {...text2} : selectTreeStyles.placeholder}>{selected.label ?? "Choose category"}</span>
                </div>
                <div style={selectTreeStyles.suffix}>{actualSuffix}</div>
            </div>
            {open &&
                <ClosableDiv onClose={setOpen}>
                <motion.div
                style={{...selectTreeStyles.popup, ...props.styles?.popup}}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
            >
                {props.categories?.map((category: CategoryType) => (
                    <SelectCategoryNode key={category.id}
                                        category={category}
                                        selected={selected}
                                        setSelected={setSelected}
                                        setOpenRoot={setOpen}
                                        onValueChange={props.onChange}
                    />
                ))}
            </motion.div>
                </ClosableDiv>}
        </div>
    )
}