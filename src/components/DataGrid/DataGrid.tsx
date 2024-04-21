import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import ExpandRowComponent from '../ExpandableRow/ExpandableRow'
import './DataGrid.scss'

export const DataGrid = (props: any) => {
    return (
        <DataTable
            noHeader
            pagination={false}
            paginationServer
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            {...props}
            expandableRows
            expandableRowsComponent={ExpandRowComponent}
            expandableRowsComponentProps={{editCallback: props.editCallback, deleteCallback: props.deleteCallback }}
            conditionalRowStyles={[
                {
                    when: () => true,
                    style: {
                    '&:hover': {
                        cursor: 'pointer',
                        backgroundColor: 'rgb(245, 245, 245)'
                    }
                    }
                }
            ]}
        />
    )
}