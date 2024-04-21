export const initialState = {
    printers: []
}

const printerReducer = (state = initialState, action) => {
    //TODO: Implement other reducers.
    switch (action.type) {
        case 'SET_PRINTERS':
            return {
                ...state,
                printers: action.data
            }
        default:
            return state;

    }
}

export default printerReducer