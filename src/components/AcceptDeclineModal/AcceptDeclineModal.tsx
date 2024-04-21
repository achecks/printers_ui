import { useEffect, useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

interface IAcceptDeclineModalProps {
    title: string
    showModal: boolean
    body: string
    callBack: (isAdding: boolean) => void
    acceptButtonText: string
    okButtonColor: string
    declineButtonText: string
    declineButtonColor: string
}

export const AcceptDeclineModal = (props: IAcceptDeclineModalProps) => {
    const {
        title,
        showModal,
        body,
        callBack,
        declineButtonText,
        acceptButtonText,
        okButtonColor,
        declineButtonColor
    } = props


    const [showModalLocal, setShowModalLocal] = useState(showModal)

    useEffect(() => {
        setShowModalLocal(showModal)
    }, [showModal])
    
    const acceptButtonClick = () => {
        callBack(true)
    }

    const declineButtonClick = () => {
        setShowModalLocal(false)
        callBack(false)
    }

    const getAcceptButton = () => {
        return (
            <Button id={'accept'} onClick={() => acceptButtonClick()} color={okButtonColor}>
                {acceptButtonText}
            </Button>
        )
    }

    const getDeclineButton = () => {
        return <Button id={'decline'} outline onClick={() => declineButtonClick()} color={declineButtonColor}>{declineButtonText}</Button>
    }

    return (
        <Modal isOpen={showModalLocal} returnFocusAfterClose={false} className={'accept-define-modal'}  >
            <ModalHeader toggle={() => declineButtonClick()}>{title}</ModalHeader>
            <ModalBody>
                { body &&
                    <p>{body}</p>
                }
            </ModalBody>
                <ModalFooter>
                    {getAcceptButton()}
                    {getDeclineButton()}
                </ModalFooter>
        </Modal>
    )
}