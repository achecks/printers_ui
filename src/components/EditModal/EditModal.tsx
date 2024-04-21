import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Input, Label, Row, Form, FormFeedback } from 'reactstrap'
import { useEffect, useState } from 'react'
import './EditModal.scss'
import { IPrinter } from '../../types'
import { isIpAddressValid } from '../../utils'

interface IEditModalProps {
    callback: (isAdding: boolean, printer?: IPrinter) => void
    showModal: boolean
    currentPrinter: IPrinter
    isAdding: boolean
}

export const EditModal = (props: IEditModalProps) => {
    const {
        callback,
        showModal,
        currentPrinter,
        isAdding
    } = props

    const [showModalLocal, setShowModalLocal] = useState<boolean>(showModal)
    const [printerName, setPrinterName] = useState<string>('')
    const [ipAddress, setIpAddress] = useState<string>('')
    const [isActive, setIsActive] = useState<boolean>(false)
    const [isIpValidated, setIsIpValidated] = useState<boolean>(false)
    const [isIpValid, setIsIpValid] = useState<boolean>(false)
    const [isNameValidated, setIsNameValidated] = useState<boolean>(false)

    useEffect(() => {
        setShowModalLocal(showModal)

    }, [showModal])

    useEffect(() => {
        if (currentPrinter?.printerName.trim() && currentPrinter.ipAddress?.trim()) {
            setPrinterName(currentPrinter.printerName)
            setIpAddress(currentPrinter.ipAddress)
            setIsActive(currentPrinter.isActive)
            setIsNameValidated(true)
            setIsIpValid(isIpAddressValid(currentPrinter.ipAddress))
            setIsIpValidated(true)
        }
    }, [currentPrinter])

    const isNameValid = () => {
        return !!printerName?.trim()
    }

    const validate = () => {
        if (!isNameValid()) {
            setIsNameValidated(true)
        }
        if (!isIpValid) {
            setIsIpValidated(true)
        }
        return isNameValid() && isIpValid
    }

    const nameOnChange = (newValue: string) => {
        setIsNameValidated(true)
        setPrinterName(newValue)
    }

    const ipAddressOnChange = (newValue: string) => {
        setIsIpValid(isIpAddressValid(newValue))
        setIsIpValidated(true)
        setIpAddress(newValue)
    }

    const reset = () => {
        setPrinterName('')
        setIpAddress('')
        setIsNameValidated(false)
        setIsIpValidated(false)
        setIsIpValid(false)
        setIsActive(false)
    }

    const okClick = () => {
        if (validate()) {
            setShowModalLocal(false)

            const newPrinter: IPrinter = {
                printerId: currentPrinter?.printerId ? currentPrinter?.printerId : 0,
                printerName: printerName,
                ipAddress: ipAddress,
                isActive: isActive
            }
            reset()
            callback(isAdding, newPrinter)
        }
    }

    const cancelClick = () => {
        reset()
        setShowModalLocal(false)
        callback(false)
    }

    return (
        <Modal isOpen={showModalLocal} returnFocusAfterClose={false} className='edit-modal'>
            <ModalHeader toggle={() => cancelClick()}>{`${isAdding ? 'Add' : 'Update'} printer`}</ModalHeader>
            <ModalBody>
                <Form>
                <Row>
                    <Label>
                        <span className='mb-2 font-medium text-gray-900 dark:text-white'>
                            Printer Name
                        </span>
                        <Input 
                            type='text' 
                            name='printerName' 
                            id='printerName' 
                            aria-label='' 
                            value={printerName} 
                            onChange={(e) => nameOnChange(e.target.value)}
                            valid={isNameValid()}
                            invalid={isNameValidated && !isNameValid()}
                        />
                        <FormFeedback>Please enter a printer name.</FormFeedback>
                    </Label>             
                </Row>
                <Row className='mt-2'>
                    <Label>
                        <span className='mb-2 font-medium text-gray-900 dark:text-white'>
                            IP address
                        </span>
                        <Input 
                            type='text' 
                            name='ipAddress' 
                            id='ipAddress' 
                            aria-label='' 
                            invalid={!isIpValid && isIpValidated} 
                            valid={isIpValid} 
                            value={ipAddress} 
                            onChange={(e) => ipAddressOnChange(e.target.value)} 
                            placeholder='eg. 123.45.678.910'
                        />
                        <FormFeedback>Please enter a valid IP address in the format: 999.999.999.999</FormFeedback>
                    </Label>
                </Row>
                <Row className='mb-3 mt-2'>
                    <Label className='mb-0 font-medium text-gray-900 dark:text-white' >
                        Status
                    </Label>
                    <Label check>     
                        <Input type='checkbox'  id='cbStatus' label='Status' 
                            checked={isActive} onChange={() => setIsActive(!isActive)} 
                        />
                        <span className='ml-2'>Printer is active.</span>
                    </Label>
                </Row>
                </Form>
                <ModalFooter>
                    <Button id='declineButton' onClick={okClick} color='primary'>Ok</Button>
                    <Button id='acceptButton' onClick={cancelClick} outline color='secondary'>Cancel</Button>
                </ModalFooter>
            </ModalBody>
        </Modal>
    )
}
