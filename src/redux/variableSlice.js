import { createSlice } from '@reduxjs/toolkit';

const INIT_VARIABLES = {
    isEdit: false,
    selectedItems:[],
    category: "",
    photoURL: "",
    itemData: {},
    selectedDate: ""
}

const variableSlice = createSlice({
    name: 'variables',
    initialState:INIT_VARIABLES,
    reducers: {
      
      setEditStatus(state, action) {
        state.isEdit = action.payload;
      },
      setSelectedItems(state, action) {
        state.selectedItems = action.payload;
      },
      setItemCategory(state, action) {
        state.category = action.payload;
      },
      setItemPhotoURL(state, action) {
        state.photoURL = action.payload;
      },
      setItemData(state, action) {
        state.itemData = action.payload;
      },
      setSelectedDate(state, action) {
        state.selectedDate = action.payload;
      },
    },
});

const { actions, reducer } = variableSlice;
export const { setEditStatus, setSelectedItems, setItemCategory, setItemPhotoURL, setItemData, setSelectedDate } = actions;
export default reducer;