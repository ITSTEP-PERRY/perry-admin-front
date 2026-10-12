import {useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {type FilterSliceType, getGlobalFilters, setGlobalFilters as setGFilters} from "../../app/slices/globalFilterSlice.ts";

export function useFilters<T extends object>(initValue?: T) {
    const globFilters = useAppSelector(getGlobalFilters);
    const dispatch = useAppDispatch();
    const [localFilters, setLocalFilters] = useState<T | undefined>(initValue);

    const filters=
        useMemo(() => ({...localFilters, ...globFilters} as T & FilterSliceType), [localFilters, globFilters]);

    const setGlobalFilters = (g: FilterSliceType) => dispatch(setGFilters(g));


    return {filters, setLocalFilters, setGlobalFilters};
}