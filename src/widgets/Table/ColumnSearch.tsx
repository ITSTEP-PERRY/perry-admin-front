import {Flex, Input, type TableColumnType} from "antd";
import {SearchIcon} from "../../Components/Icon/SearchIcon.tsx";
import {Button} from "../../Components/Buttons/Button.tsx";
import {CloseIcon} from "../../Components/Icon/CloseIcon.tsx";
import {text3} from "../../theme/textStyles.ts";
import {colors} from "../../theme/colors.ts";

export type GetColumnSearchProps<T> = {
    dataIndex: keyof T;
    onSearch?: (column: string, value: string) => void;
    onFilter?: (column: string, value: string) => void;
}

export function getColumnSearch<T>({
    dataIndex,
    onSearch,
    onFilter,

   }: GetColumnSearchProps<T>): TableColumnType<T> {

    const handleSearch = (
        selectedKeys: string[],
        dataIndex: keyof T,
    ) => {
        // confirm();
        onSearch?.(dataIndex as string, selectedKeys[0])
    };

    return ({
        filterDropdown: ({setSelectedKeys, selectedKeys, close}) => (
            <div style={{padding: 8}} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    placeholder={`Search ${dataIndex as string}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    // onPressEnter={() => handleSearch(selectedKeys as string[], dataIndex)}
                    style={{marginBottom: 8, display: 'block'}}
                />
                <Flex justify={"space-between"} >
                    {onSearch && <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], dataIndex)}
                        icon={<SearchIcon size={16}/>}
                        size="small"
                        style={{width: 90, ...text3}}
                    >
                        Search
                    </Button>}
                    <Button
                        style={text3}
                        type="secondary"
                        size="small"
                        onClick={() => {
                            const value = (selectedKeys as string[])[0]
                            if(value) onFilter?.(dataIndex as string, value)
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        style={{padding: 0}}
                        type="text"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        <CloseIcon size={16}  width={3}/>
                    </Button>
                </Flex>
            </div>
        ),
        filterIcon: () => (
            <SearchIcon size={32} color={colors.darkText}/>
        ),
        onFilter: (value, record) =>
            (record[dataIndex] as string)
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
    });
}