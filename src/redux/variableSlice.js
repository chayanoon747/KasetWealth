import { createSlice } from '@reduxjs/toolkit';

const INIT_VARIABLES = {
    isEdit: false,
    selectedItems:[],
    category: "",
    photoURL: "",
    date: ""
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
      setDate(state, action) {
        state.date = action.payload;
      },
    },
});

const { actions, reducer } = variableSlice;
export const { setEditStatus, setSelectedItems, setItemCategory, setItemPhotoURL, setDate } = actions;
export default reducer;