import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { mockSceneListResponse, mockSceneDetailResponse } from '../data/mockData';

// 读取并校验环境变量（优先 VITE_API_URL，回退 VITE_API_BASE_URL）
const rawUrl = (import.meta.env && (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL)) || '';
const envBase = String(rawUrl);
const computedBaseURL = envBase.trim() || 'http://localhost:8000';
const USE_MOCK = String(import.meta.env?.VITE_USE_MOCK || '').toLowerCase() === 'true';
if (!envBase.trim()) {
  // eslint-disable-next-line no-console
  console.warn('[API] 未读取到 VITE_API_URL/VITE_API_BASE_URL，已使用默认值：', computedBaseURL);
}

// 创建一个 axios 实例，用于所有 API 请求
const apiClient = axios.create({
  baseURL: computedBaseURL,
  // 数组参数使用重复键形式：tags=AI&tags=Featured
  paramsSerializer: {
    serialize: (params) => {
      const usp = new URLSearchParams();
      if (params && typeof params === 'object') {
        Object.keys(params).forEach((key) => {
          const val = params[key];
          if (Array.isArray(val)) {
            val.forEach((v) => {
              if (v !== undefined && v !== null) usp.append(key, v);
            });
          } else if (val !== undefined && val !== null) {
            usp.append(key, val);
          }
        });
      }
      return usp.toString();
    }
  }
});

// 添加一个请求拦截器，在每个请求的 header 中附加 token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 注册新用户（真实接口）
 */
export const register = (userData) => {
  return apiClient.post('/auth/register', userData);
};

/**
 * 登录（真实接口）
 */
export const login = async (username, password) => {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);

  const response = await apiClient.post('/auth/login', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  if (response.data && response.data.access_token) {
    localStorage.setItem('accessToken', response.data.access_token);
  }
  return response.data;
};

export const logout = () => { localStorage.removeItem('accessToken'); };

export const getCurrentUser = () => { return apiClient.get('/auth/users/me'); };

// --- 内容/场景 API（恢复 mock） ---
export const getSceneList = async (params) => {
  if (USE_MOCK) {
    return Promise.resolve({ data: mockSceneListResponse });
  }
  return apiClient.post('/scene/list', params);
};

export const getSceneDetail = async (sceneId) => {
  if (USE_MOCK) {
    return Promise.resolve({ data: mockSceneDetailResponse });
  }
  return apiClient.get('/scene/detail', { params: { sceneId } });
};

// 公开场景广场
export const getPublicScenes = (params) => {
  // params: { limit, offset, tags, search }
  return apiClient.get('/square', { params });
};

// --- 保留原有的 Auth0 功能 ---
export function useProtectedApi() {
  const { getAccessTokenSilently } = useAuth0();

  const fetchProtected = async () => {
    const token = await getAccessTokenSilently({ audience: import.meta.env.VITE_AUTH0_AUDIENCE });
    const res = await fetch(`${computedBaseURL}/protected`, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) { throw new Error('API error: ' + res.status); }
    return res.json();
  };

  return { fetchProtected };
}
