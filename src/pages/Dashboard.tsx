import {useFilters} from "../shared/Hooks/useFilters.tsx";
import type {ProductReview} from "../types/ProductReview.ts";
import {Button} from "../Components/Buttons/Button.tsx";

export function Dashboard() {
    const {filters, setLocalFilters} = useFilters<ProductReview>();
    return (
        <>
            <div>{filters.dateRange?.[0].toDateString()}a</div>
        <Button type={"primary"} onClick={() => setLocalFilters({...filters})}>Click</Button>
        </>
    );
}

