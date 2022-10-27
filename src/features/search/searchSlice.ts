import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { DaDataSuggestion } from './typesDaData';

interface ISearchState {
  url: string;
  token: string;
  daDataAddress: DaDataSuggestion[] | null;
}

interface IResponse {
	suggestions: DaDataSuggestion[];
}

const initialState: ISearchState = {
  url: "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
  token: "6fbad274991f4f4a9543cd3198f4c5a93c73666d",
  daDataAddress: null
};

export const getDaDataAddress = createAsyncThunk(
  '@@search/DaData',
  async (inputValue: string): Promise<IResponse> => {
    const response = await fetch(initialState.url, {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Authorization": "Token " + initialState.token
				},
				body: JSON.stringify({query: inputValue, count: 12})
			});
    const result: Promise<IResponse> = await response.json();
    return result;
  }
);

export const searchSlice = createSlice({
  name: '@@search',
  initialState,
  reducers: {
    clearDaData: (state) => {
      state.daDataAddress = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDaDataAddress.fulfilled, (state, action: PayloadAction<IResponse>) => {
        state.daDataAddress = action.payload.suggestions;
      });
  },
});

export const { clearDaData } = searchSlice.actions;

export const selectDaData = (state: RootState) => state.search.daDataAddress;

export default searchSlice.reducer;
