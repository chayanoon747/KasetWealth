import { createSlice } from '@reduxjs/toolkit';
const INIT_VARIABLES = {
    isEdit: false,
    selectedItems:[]
}

const variableSlice = createSlice({
    name: 'variables',
    initialState:INIT_VARIABLES,
    reducers: {
      setEditStatus(state, action) {
        state.isEdit = action.payload;
      },
      setSelectedItems(state, action) {
        // ใช้การกำหนดค่าตรงๆ แทนการ push
        state.selectedItems = action.payload;
    }
    },
});

const { actions, reducer } = variableSlice;
export const { setEditStatus, setSelectedItems } = actions;
export default reducer;