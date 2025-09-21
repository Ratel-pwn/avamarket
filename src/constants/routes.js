// 路由常量定义
export const ROUTES = {
  HOME: '/',
  DETAIL: '/detail/:id',
  PUBLISH: '/publish',
  PROFILE: '/profile',
  MY_POSTS: '/my-posts'
};

// 路由参数提取函数
export const getRouteParams = (pathname) => {
  const segments = pathname.split('/').filter(Boolean);
  return {
    id: segments[1] || null, // detail/:id 中的 id
    type: segments[0] || 'home'
  };
};
