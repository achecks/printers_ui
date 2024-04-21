import { useState } from 'react'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';

export const DateSelector = (props) => {

    const [objectData, setObjectData] = useState(dayjs(props.value))
    const {
        onChange,
        value
    } = props

    const onChangeLocal = (newObjectData) => {
        setObjectData(newObjectData)
        onChange(newObjectData.$d)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker defaultValue={dayjs(value)} value={objectData} onChange={(newValue) => onChangeLocal(newValue)}  />
        </LocalizationProvider>
    )
}