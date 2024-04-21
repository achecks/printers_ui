export interface IPrinter {
    printerId: number;
    printerName: string;
    ipAddress: string;
    isActive: boolean;
}

export const DefaultPrinter: IPrinter = {
    printerId: 0,
    printerName: '',
    ipAddress: '',
    isActive: false
}

export const getStatusLabel = (isActive: boolean): string => {
    return isActive ? 'Active' : 'Inactive'

}