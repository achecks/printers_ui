import { useEffect } from "react"
import { Button } from "reactstrap"
import { getStatusLabel } from "../../types"
import './ExpandableRow.scss'

const ExpandRowComponent = (props: any) => {
    
    useEffect(() => {
        console.log('props', props)
    }, [props])

    if (!props.data) {
        return null
    }
    const printer = props.data

    return (
      <div className="expandable-row">
        <p><span>Printer name:</span> {printer.printerName}</p>
        <p><span>IP address:</span> {printer.ipAddress}</p>
        <p><span>Status:</span> {getStatusLabel(printer.isActive)}</p>
        <div className='d-flex justify-content-between'>
            <Button id='editButton' onClick={() => props.editCallback(props.data)} className='add-button w-50 mr-1' outline color='primary'>Edit</Button>
            <Button id='deleteButton' onClick={() => props.deleteCallback(props.data)} className='add-button w-50 ml-1' outline color='danger'>Delete</Button>
        </div>
      </div>
    )
  } 
  
  export default ExpandRowComponent