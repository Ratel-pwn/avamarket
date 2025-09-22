import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

// 创建一个 axios 实例，用于所有 API 请求
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8090',
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
 * 注册新用户
 * @param {object} userData - { username, email, password }
 */
export const register = (userData) => {
  return apiClient.post('/auth/register', userData);
};

/**
 * 用户登录
 * @param {string} username
 * @param {string} password
 */
export const login = async (username, password) => {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);

  const response = await apiClient.post('/auth/login', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (response.data && response.data.access_token) {
    localStorage.setItem('accessToken', response.data.access_token);
  }
  return response.data;
};

/**
 * 登出，清除 token
 */
export const logout = () => {
  localStorage.removeItem('accessToken');
};

/**
 * 获取当前登录的用户信息
 */
export const getCurrentUser = () => {
  return apiClient.get('/auth/users/me');
};


// --- 内容/场景 API ---

/**
 * 获取场景列表（分页）
 * @param {object} params - { page, count, filters }
 */
export const getSceneList = (params) => {
  // 接口需要 POST /scene/list
  return apiClient.post('/scene/list', params);
};

/**
 * 获取场景详情
 * @param {string} sceneId
 */
export const getSceneDetail = (sceneId) => {
  // 接口需要 GET /scene/detail?sceneId=...
  return apiClient.get('/scene/detail', { params: { sceneId } });
};


// --- 保留原有的 Auth0 功能 ---

// 保留原有 Auth0 认证 API
export function useProtectedApi() {
  const { getAccessTokenSilently } = useAuth0();

  // 调用受保护 API
  const fetchProtected = async () => {
    const token = await getAccessTokenSilently({
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    });
    // 注意：这里仍然使用 Auth0 的 token 和独立的 fetch
    const res = await fetch(`${import.meta.env.VITE_API_URL}/protected`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("API error: " + res.status);
    }
    return res.json();
  };

  return { fetchProtected };
}
