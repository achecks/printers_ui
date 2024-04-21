import { useEffect, useState } from 'react'
import { Plus, Trash2, Edit } from 'react-feather'
import { DataGrid } from '../components/DataGrid/DataGrid'
import { useSelector } from 'react-redux'
import { Button, Card, CardBody } from 'reactstrap'
import { getPrinters, addPrinter, updatePrinter, deletePrinter } from '../redux/actions'
import { EditModal } from '../components/EditModal/EditModal'
import './Home.scss'
import { IPrinter, DefaultPrinter, getStatusLabel } from '../types'
import { RootState } from '../redux/reducers/rootReducer'
import { useAppDispatch } from '../redux/storeConfig/store'
import { AcceptDeclineModal } from '../components/AcceptDeclineModal/AcceptDeclineModal'
//TODO: Add styling to app.

export const Home = () => {
    const printers = useSelector((state: RootState) => state.printerReducer.printers)

    const [data, setData] = useState()
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [currentPrinter, setCurrentPrinter] = useState<IPrinter>()
    const [isAdding, setIsAdding] = useState<boolean>(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false)
    
    const dispatch = useAppDispatch();

    const gridColumns = [
        {
            name: 'Printer name',
            selector: (row: IPrinter) => row.printerName,
            cell: (row: IPrinter) => {
                return (
                    <div>{row.printerName}</div>
                )
            }
        },
        {
            name: 'IP address',
            selector: (row: IPrinter) => row.ipAddress,
            cell: (row: IPrinter) => {
                return (
                    <div>{row.ipAddress}</div>
                )
            }
        },
        {
            name: 'Status',
            selector: (row: IPrinter) => getStatusLabel(row.isActive),
            cell: (row: IPrinter) => {
                return (
                    <div>{getStatusLabel(row.isActive)}</div>
                )
            }
        },
        {
            cell: (row: IPrinter) => {
                return (
                    <div className='button-container'>
                        <div onClick={() => editClick(row)} className='edit-button'>
                            <Edit size={22} />
                        </div>
                        <div onClick={() => deleteClick(row)}>
                            <Trash2 size={22} />
                        </div>
                    </div>
                    
                
                )
            }
        }
    ]

    useEffect(() => {
        dispatch(getPrinters())
    }, [dispatch])

    useEffect(() => {
        setData(printers)
    }, [printers])

    const addClick = () => {
        setCurrentPrinter(DefaultPrinter)
        setIsAdding(true)
        setShowEditModal(true)
    }

    const editClick = (row: IPrinter) => {
        setCurrentPrinter(row)
        setIsAdding(false)
        setShowEditModal(true)
    }

    const deleteClick = (printer: IPrinter) => {
        setShowDeleteConfirm(true)
        setCurrentPrinter(printer)
    }

    const editCallback = (isAdding: boolean, printer?: IPrinter) => {
        setShowEditModal(false)
        if (printer) {
            if (isAdding) {
                dispatch(addPrinter(printer))
            } else {
                dispatch(updatePrinter(printer))
            }
        }
    }

    const deleteCallback = (isDelete: boolean) => {
        if (isDelete) {
            dispatch(deletePrinter(currentPrinter!.printerId))
        }
        setShowDeleteConfirm(false)
    }

    return (
        <div className='home'>
            <h1>Printer Information</h1>
            <div className='d-flex justify-content-end'>
                <Button id='addButton' onClick={addClick} className='add-button d-flex' color='primary'>
                    <Plus size={14} color='white' strokeWidth='3' className='plus-icon'/>
                    <span className='mr-1'>Add printer</span>
                </Button>
            </div>
            
            {/*
            Uncomment to rather use Tailwind styled button:
             <button type="button" onClick={addClick} className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] float-right">
                Add printer
            </button> */}
            <Card className='card-container p-0'>
                <CardBody>
                    <DataGrid data={data} columns={gridColumns} editCallback={editClick} deleteCallback={deleteClick} />
                </CardBody>
            </Card>
            <EditModal showModal={showEditModal} callback={editCallback} currentPrinter={currentPrinter!} isAdding={isAdding} />
            <AcceptDeclineModal 
                title='Confirm delete' 
                acceptButtonText='Delete' 
                declineButtonText='Cancel' 
                callBack={deleteCallback} 
                body={'Are you sure you would like to delete this printer? This action cannot be undone.'}
                declineButtonColor='secondary'
                okButtonColor='danger'
                showModal={showDeleteConfirm}
            />
        </div>
    )
}