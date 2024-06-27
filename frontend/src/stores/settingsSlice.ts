import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import handlePromise from "@/utils/promise";
import CompanyService from "@/services/CompanyService";

export const getCompanyList = createAsyncThunk('settings/companies', async (_, thunkAPI) => {
    const [error, response, data] = await handlePromise(
        CompanyService.getCompanyList()
    );
    if (!response.ok) {
        return thunkAPI.rejectWithValue(error)
    }

    return data
})

interface SettingsState {
    company: { CompaniaId: string, Nombre: string, Codigo: string } | null;
    companyList: { CompaniaId: string, Nombre: string, Codigo: string }[];
    caja: string | null;
    lote: string | null;
}

const initialState: SettingsState = {
    company: null,
    companyList: [],
    caja: null,
    lote: null
}

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        reset: (state) => {
            state.company = initialState.company;
            state.companyList = initialState.companyList;
            state.caja = initialState.caja;
            state.lote = initialState.lote;
        },
        setCompany: (state, action) => {
            state.company = action.payload
        },
        setCaja: (state, action) => {
            state.caja = action.payload
        },
        setLote: (state, action) => {
            state.lote = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCompanyList.fulfilled, (state, action) => {
                state.companyList = action.payload
            })
    }
});

export const { reset, setCaja, setLote, setCompany } = settingsSlice.actions

export default settingsSlice.reducer;
