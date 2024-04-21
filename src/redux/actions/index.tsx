import { apiGetAllPrinters, apiUpdatePrinter, apiAddPrinter, apiDeletePrinter } from '../../api/printer'
import { IPrinter } from '../../types'
//TODO: Add reducers for add, update and delete.

export const getPrinters = () => {
  return async (dispatch: any) => {
    const response = await apiGetAllPrinters()
    if (response) {
      dispatch({
        type: 'SET_PRINTERS',
        data: response
      })
    }
  }
}

export const addPrinter = (printer: IPrinter) => {
  return async (dispatch: any) => {
    const response = await apiAddPrinter(printer)
    if (response) {
      dispatch({
        type: 'SET_PRINTERS',
        data: response
      })
    }
  }
}

export const updatePrinter = (printer: IPrinter) => {
  return async (dispatch: any) => {
    const response = await apiUpdatePrinter(printer)
    if (response) {
      dispatch({
        type: 'SET_PRINTERS',
        data: response
      })
    }
  }
}

export const deletePrinter = (id: number) => {
  return async (dispatch: any) => {
    const response = await apiDeletePrinter(id)
    if (response) {
      dispatch({
        type: 'SET_PRINTERS',
        data: response
      })
    }
  }
}

export const SetPrinters = (data: IPrinter[]) => (dispatch: any) => dispatch({ type: 'SET_PRINTERS', data })