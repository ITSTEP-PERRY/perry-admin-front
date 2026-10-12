import {useState} from "react";
import {datePicker, rangePickerStyles} from "./css/datePickerStyles.ts";
import Text from "antd/es/typography/Text";
import {Button} from "../Buttons/Button.tsx";
import {DatePicker, Flex} from "antd";
import {ClosableDiv} from "../General/ClosableDiv.tsx";
import {dateFormatter} from "../../shared/formatter.ts";
const { RangePicker } = DatePicker;
export interface CustomDatePickerProps {
    placeholder?: string;
    value?: [Date, Date];
    onChange?: (dates: [Date,Date]) => void;

}
export function CustomDatePicker({placeholder,value, onChange}: CustomDatePickerProps) {
    const [open, setOpen] = useState(false);
    const [pickerOpen, setPickerOpen] = useState(false);

    const inputValue =  () => {
        if (value){
            const eq = value[0].getDate() === value[1].getDate() &&
                value[0].getMonth() === value[1].getMonth() &&
                value[0].getFullYear() === value[1].getFullYear();

            return  eq ? dateFormatter.format(value?.[0] ) :
                dateFormatter.format(value?.[0])  + " - " + dateFormatter.format(value?.[1])
        }

    }

    const handleChange = (firstDay: Date, lastDay: Date) => {
        onChange?.([lastDay, firstDay]);
        setOpen(false);
    }

    const date = new Date();

    return (
        <div style={datePicker.wrapper}>
            <div style={datePicker.root}>
                <Button type={"text"} onClick={() => {setOpen(!open);}}>
                    <Text style={datePicker.input}>{inputValue() ? inputValue() : placeholder ? placeholder : "Select Date"}</Text>
                </Button>
            </div>
        {open &&
            <ClosableDiv onClose={() => {
                if(!pickerOpen) setOpen(false);}
            }>
                    <Flex vertical style={datePicker.menu}>

                    <Button type={"text"}
                            style={datePicker.menuButton}
                            onClick={() => {
                                const firstDay = new Date(date.getFullYear(),
                                    date.getMonth(),
                                    date.getDate(),0,0,0);
                                const lastDay = new Date(date.getFullYear(), date.getMonth(),
                                    date.getDate(),23,59,59);

                                handleChange(lastDay, firstDay)
                            }}>
                        <Text>Today</Text>
                    </Button>
                    <Button type={"text"}
                            style={datePicker.menuButton}
                            onClick={() => {
                                const firstDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
                                const lastDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                                handleChange(lastDay, firstDay);
                            }}>
                        <Text>Last 7 Days</Text>
                    </Button>
                    <Button type={"text"}
                            style={datePicker.menuButton}
                            onClick={() => {
                                const firstDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 30);
                                const lastDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                                handleChange(lastDay, firstDay)
                            }}>
                        <Text>Last 30 Days</Text>
                    </Button>
                    <Button type={"text"}
                            style={datePicker.menuButton}
                            onClick={() => {
                                const date = new Date();
                                const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                                const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                                handleChange(lastDay, firstDay)
                            }}>
                        <Text>Current month</Text>
                    </Button>
                        <RangePicker
                            onOpenChange={(e) => {
                                setPickerOpen(e);
                                setOpen(e)
                            }}
                            styles={rangePickerStyles}
                            picker={"date"}
                            onChange={(dates) => {
                                if(dates && dates[1] && dates[0]) {
                                    handleChange(dates?.[1].toDate(), dates?.[0].toDate());
                                }
                            }}
                        />

                </Flex>
            </ClosableDiv>
        }
        </div>
    );
}