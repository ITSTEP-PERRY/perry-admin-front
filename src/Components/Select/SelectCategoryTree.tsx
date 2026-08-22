import {selectNodeStyles, selectTreeStyles} from "./css/selectTreeStyles.ts";
import {type CSSProperties, type ReactNode, useEffect, useState} from "react";
import {ArrowUpIcon} from "../Icon/ArrowUpIcon.tsx";
import {ArrowDownIcon} from "../Icon/ArrowDownIcon.tsx";
import {motion} from "motion/react";
import type {CategoryType} from "../../types/CategoryType.ts";
import "./css/styles.css"
import type {SelectOptions} from "../../types/selectOptions.ts";
import {TickIcon} from "../Icon/TickIcon.tsx";
import {text2} from "../../theme/textStyles.ts";

export type SelectTreeProps = {
    label?: string;
    placeholder?: string;
    suffix?: ReactNode;
    categories?: CategoryType[];
    onSelect?: (categoryId: string) => void;
}

type SelectCategoryNodeProps = {
    category: CategoryType;
    style?: CSSProperties;
    setSelected?: (selected: SelectOptions) => void;
    selected?: SelectOptions;
}

const SelectCategoryNode = ({category, style, ...props}: SelectCategoryNodeProps ) => {
    const [open, setOpen] = useState(false);

    const actualSuffix = open ? <ArrowUpIcon size={18} width={3}/> : <ArrowDownIcon size={18} width={3}/>
    return (
        <div style={{...selectNodeStyles.root, ...style}}>
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
                          }}
                    >
                        {category.name}
                    </span>
                        <div style={selectNodeStyles.suffixContainer}>
                            { category.id === props.selected?.value && <TickIcon size={9} width={1}/>}
                            {category?.subCategories && <span>{actualSuffix}</span>}
                        </div>
                </div>
            {open && category.subCategories?.map((subCategory: CategoryType) => (
                <SelectCategoryNode key={subCategory.id}
                                    category={subCategory}
                                    style={selectNodeStyles.innerContainer}
                                    selected={props.selected}
                                    setSelected={props.setSelected}
                />
            ))}
        </div>
    )
}

export const SelectCategoryTree = (props: SelectTreeProps) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<SelectOptions>({value: ""});
    const actualSuffix = props.suffix ? props.suffix : open ? <ArrowUpIcon size={18}/> : <ArrowDownIcon size={18}/>;

    useEffect(() => {
        if(props.onSelect) props.onSelect(selected.value as string)
    }, [props, selected])

    return (
        <div style={selectTreeStyles.root}>
            <div style={selectTreeStyles.container} onClick={() => setOpen(!open)}>
                <span style={selectTreeStyles.label}>Category</span>
                <div style={selectTreeStyles.input}>
                    <span style={selected.label ? {...text2} : selectTreeStyles.placeholder}>{selected.label ?? "Choose category"}</span>
                </div>
                <div style={selectTreeStyles.suffix}>{actualSuffix}</div>
            </div>
            {open && <motion.div
                style={selectTreeStyles.popup}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
            >
                {props.categories?.map((category: CategoryType) => (
                    <SelectCategoryNode key={category.id} category={category} selected={selected} setSelected={setSelected}/>
                ))}
            </motion.div>}
        </div>
    )
}