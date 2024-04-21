import axios from 'axios'
import { IPrinter } from '../types'
//TODO: Implement endpoints.

const url = 'https://localhost:7219/PrinterApi'

export const apiGetAllPrinters = async () => {
    const response = await axios.get(url)
    return response.data
}

export const apiAddPrinter = async (printer: IPrinter): Promise<IPrinter[]> => {
    return axios.post(url, printer).then((response: any) => {
        return response.data
    })
}

export const apiUpdatePrinter = async (printer: IPrinter) => {
    return axios.put(url, printer).then((response: any) => {
        return response.data
      })
}

export const apiDeletePrinter = async (id: number) => {
    const url = `https://localhost:7219/PrinterApi/?id=${id}`
    return axios.delete(url).then((response: any) => {
        return response.data
      })
}