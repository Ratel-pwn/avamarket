import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSceneList } from '../../utils/api';

// 异步 action：分页加载内容
export const fetchContentPage = createAsyncThunk(
  'content/fetchContentPage',
  async ({ page, pageSize, filters }, { rejectWithValue }) => {
    try {
      const params = {
        count: pageSize,
        page,
        ...filters
      };
      const response = await getSceneList(params);
      // 直接使用 axios 返回的数据结构 response.data
      return {
        items: response.data.scenes || [],
        total: response.data.total || 0
      };
    } catch (err) {
      const errorPayload = err.response ? err.response.data : err.message;
      return rejectWithValue(errorPayload || 'Failed to load content');
    }
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    contentList: [],
    loadedCount: 0,
    totalCount: 0,
    currentPage: 1,
    pageSize: 20,
    loading: false,
    error: null,
    filters: {}
  },
  reducers: {
    resetContent(state, action) {
      state.contentList = [];
      state.loadedCount = 0;
      state.totalCount = 0;
      state.currentPage = 1;
      state.loading = false;
      state.error = null;
      state.filters = action.payload || {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContentPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContentPage.fulfilled, (state, action) => {
        state.loading = false;
        // 去重追加
        const existingIds = new Set(state.contentList.map(item => item.id));
        const newItems = action.payload.items.filter(item => !existingIds.has(item.id));
        state.contentList = [...state.contentList, ...newItems];
        
        state.loadedCount = state.contentList.length;
        state.totalCount = action.payload.total;
        state.currentPage += 1;
      })
      .addCase(fetchContentPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load content';
      });
  }
});

export const { resetContent } = contentSlice.actions;
export default contentSlice.reducer;
