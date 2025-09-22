import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import PublishPage from './pages/PublishPage';
import Header from './components/Header';
import LoginModal from './components/LoginModal'; // 引入LoginModal
import { ROUTES } from './constants/routes';
import { fetchUser } from './store/slices/authSlice';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('template');
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // 管理弹窗状态
  const dispatch = useDispatch();

  // 在应用加载时，检查是否存在token并尝试获取用户信息
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  const handleNavigate = (name, payload) => {
    if (name === 'template' || name === 'platform' || name === 'mcp') {
      setActiveTab(name);
      navigate(ROUTES.HOME);
      return;
    }
    if (name === 'detail' && payload?.item) {
      navigate(`/detail/${payload.item.id}`);
      return;
    }
    if (name === 'publish') {
      navigate(ROUTES.PUBLISH);
      return;
    }
    navigate(ROUTES.HOME);
  };

  return (
    <div className="App">
      <Header 
        onNavigate={handleNavigate} 
        activeTab={activeTab} 
        onLoginClick={() => setIsLoginModalOpen(true)} // 传递打开弹窗的函数
      />
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} // 传递关闭弹窗的函数
      />
      <Routes>
        <Route 
          path={ROUTES.HOME} 
          element={<HomePage onOpenDetail={(item) => handleNavigate('detail', { item })} />} 
        />
        <Route 
          path={ROUTES.DETAIL} 
          element={<DetailPageWrapper />} 
        />
        <Route 
          path={ROUTES.PUBLISH} 
          element={<PublishPage />} 
        />
      </Routes>
    </div>
  );
}

// DetailPage包装组件，用于处理路由参数
function DetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 这里应该根据id从API或store获取item数据
  // 暂时使用模拟数据
  const item = {
    id,
    title: "Sample Dify Scenario",
    author: { name: "Sample Author", avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Sample", isVerified: true, isOfficial: false },
    downloads: 1234,
    category: "AI",
    subcategory: "Featured AI templates",
    labels: ["Dify", "OpenAI"],
    description: "A sample Dify scenario",
    lastUpdate: "1 week ago",
    dslFiles: [{ platformName: "Dify", fileUrl: "#" }],
    readme: "# Sample Dify Scenario\n\nThis is a sample scenario for Dify platform."
  };

  return (
    <DetailPage 
      item={item} 
      type="template" 
      onBack={() => navigate(ROUTES.HOME)} 
    />
  );
}

export default App;
