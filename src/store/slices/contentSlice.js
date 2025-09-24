import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSceneList, getPublicScenes } from '../../utils/api';

// 异步 action：分页加载内容（mock 时走旧结构；非 mock 时走公开广场 /square）
export const fetchContentPage = createAsyncThunk(
  'content/fetchContentPage',
  async ({ page, pageSize, filters }, { rejectWithValue }) => {
    try {
      const USE_MOCK = String(import.meta.env.VITE_USE_MOCK || '').toLowerCase() === 'true';

      if (USE_MOCK) {
        // 兼容 mock/真实接口
        const params = { count: pageSize, page, ...filters };
        const response = await getSceneList(params);
        return {
          items: response.data.scenes || [],
          total: response.data.total || (response.data.count || 0)
        };
      }

      // 非 mock：调用公开场景广场 GET /square
      const limit = pageSize;
      const offset = (page - 1) * pageSize;
      const squareParams = {
        limit,
        offset,
        tags: filters?.tags || undefined,
        search: filters?.search || undefined,
      };
      const response = await getPublicScenes(squareParams);
      const rows = Array.isArray(response.data) ? response.data : [];

      // 映射为 ContentCard 所需的展示结构
      const mapped = rows.map((row) => ({
        id: row.id,
        title: row.name,
        description: row.description,
        labels: Array.isArray(row.tags) ? row.tags : [],
        author: {
          name: row.owner_id ? row.owner_id.slice(0, 8) : 'Unknown',
          avatar: `https://api.dicebear.com/9.x/bottts/svg?seed=${row.owner_id || 'User'}`,
          isVerified: false,
          isOfficial: false,
        },
        downloads: 0,
        lastUpdate: row.created_at || '',
        subcategory: 'Featured AI templates',
      }));

      // 由于 /square 未提供总数，这里用“已加载 + 本次数量”近似，若本次数量小于 limit 则认为无更多
      const hasMore = rows.length === limit;
      const total = offset + rows.length + (hasMore ? 1 : 0);

      return { items: mapped, total };
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
