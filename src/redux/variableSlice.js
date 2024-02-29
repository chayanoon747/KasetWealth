import { createSlice } from '@reduxjs/toolkit';

const INIT_VARIABLES = {
    isEdit: false,
    selectedItems:[],
    transactionType: "",
    category: "",
    photoURL: "",
    itemData: {},
    selectedDate: "",
    isUpdate: false,
    status: false,
    guageWealth: 0, // Initialize with default value
    guageRiability: 0, // Initialize with default value
}

const variableSlice = createSlice({
    name: 'variables',
    initialState: INIT_VARIABLES,
    reducers: {
      
      setEditStatus(state, action) {
        state.isEdit = action.payload;
      },
      setSelectedItems(state, action) {
        state.selectedItems = action.payload;
      },
      setItemTransactionType(state, action) {
        state.transactionType = action.payload;
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
      setIsUpdate(state, action) {
        state.isUpdate = action.payload;
      },
      setStatus(state, action) {
        state.status = action.payload;
      },
      setGuageValues(state, action) {
        state.guageWealth = action.payload.guageWealth;
        state.guageRiability = action.payload.guageRiability;
      },
    },
});

const { actions, reducer } = variableSlice;
export const { setEditStatus, setSelectedItems, setItemTransactionType, setItemCategory, setItemPhotoURL, setItemData, setSelectedDate, setIsUpdate, setStatus, setGuageValues } = actions;
export default reducer;
