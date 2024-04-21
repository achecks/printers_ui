export const isIpAddressValid = (ipAddress: string): boolean => {
    const ipFormat = /(?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d{1})\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d{1})/g
    return !!ipAddress.match(ipFormat)
}

