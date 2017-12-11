const initialState = {
  list: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_LIST':
      return {
        ...state,
        list: [{ ...action.payload, zip: action.zip, id: action.zip + Math.random() }].concat(state.list),
        loading: false
      }
    case 'LOADING':
      return {
        ...state,
        loading: action.payload
      }
    case 'VALID_ZIP':
      return {
        ...state,
        validZip: action.payload
      }
    case 'SELECTED_ZIP':
      return {
        ...state,
        validZip: true,
        selectedZipId: action.payload
      }
    case 'UPDATE_ITEM':
      return {
        ...state,
        list: state.list.map(item => {
          if (item.id === action.id) {
            item.zip = action.zip
          }
          return item
        }),
        validZip: false,
        selectedZipId: null
      }
    default:
      return state
  }
}

export default reducer