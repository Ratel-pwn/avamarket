import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useProtectedApi } from '../utils/api';
import { Search, Sparkles, Image as ImageIcon, Video, Text, Mic, Code, ChartBar, Palette, User, Filter, SortAsc, Briefcase, Server, Mail, BookOpen, LucideArrowLeftRight, ArrowRight, ChevronRight, ShieldCheck, BadgeCheck, User as UserIcon, X, ArrowDownToLine } from 'lucide-react';
import ContentCard from '../components/ContentCard';
import BentoGrid from '../components/BentoGrid';
import PixelVignetteBackground from '../components/PixelVignetteBackground';
import { categories } from '../data/mockData';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContentPage, resetContent } from '../store/slices/contentSlice';
import Footer from '../components/Footer';
import '../components/HomePageBackground.css';

const categoryIconMap = {
  "AI": <Sparkles size={16} strokeWidth={2.5} />,
  "Sales": <Briefcase size={16} strokeWidth={2.5}/>,
  "IT Ops": <Server size={16} strokeWidth={2.5}/>,
  "Marketing": <Mail size={16} strokeWidth={2.5}/>,
  "Document Ops": <BookOpen size={16}strokeWidth={2.5} />,
  "Other": <Palette size={16} strokeWidth={2.5}/>,
  "Support": <User size={16} strokeWidth={2.5}/>,
};

const HomePage = ({ onOpenDetail }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [currentView, setCurrentView] = useState('categories');
  const [showBentoGrid, setShowBentoGrid] = useState(true);

  // Redux: 内容分页
  const dispatch = useDispatch();
  const {
    contentList,
    loadedCount,
    totalCount,
    currentPage,
    pageSize,
    loading: sceneLoading,
    error: sceneError
  } = useSelector(state => state.content);

  // 首次加载
  React.useEffect(() => {
    dispatch(resetContent());
    dispatch(fetchContentPage({ page: 1, pageSize, filters: {} }));
  }, [dispatch, pageSize]);

  // 无限滚动加载更多
  const loaderRef = React.useRef();
  React.useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new window.IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !sceneLoading && loadedCount < totalCount) {
          dispatch(fetchContentPage({ page: currentPage, pageSize, filters: {} }));
        }
      },
      { threshold: 1 }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [sceneLoading, loadedCount, totalCount, currentPage, pageSize, dispatch]);

  // Auth0 受保护 API 示例
  const { fetchProtected } = useProtectedApi();
  const [protectedData, setProtectedData] = useState(null);
  const [protectedLoading, setProtectedLoading] = useState(false);
  const [protectedError, setProtectedError] = useState(null);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults(null);
      setCurrentView('categories');
      setShowBentoGrid(true);
      return;
    }

    const results = contentList.filter(t =>
      (t.title && t.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (Array.isArray(t.labels) && t.labels.some(label => label.toLowerCase().includes(searchTerm.toLowerCase())))
    );

    setSearchResults(results);
    setCurrentView('results');
    setShowBentoGrid(false);
  };

  const handleCategorySelect = (categoryKey) => {
    setSelectedCategory(categoryKey);
    setSelectedSubcategory(null);
    setSearchResults(null);
    setCurrentView('categories');
    setShowBentoGrid(false);
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory.name);
    const results = contentList.filter(t => t.subcategory === subcategory.name);
    setSearchResults(results);
    setCurrentView('results');
    setShowBentoGrid(false);
  };

  // 新增：点击 explore more 跳转到该二级分类完整列表
  const handleExploreMore = (subcategoryName) => {
    setSelectedSubcategory(subcategoryName);
    const results = contentList.filter(t => t.subcategory === subcategoryName);
    setSearchResults(results);
    setCurrentView('results');
    setShowBentoGrid(false);
  };

  const handleContentClick = async (item) => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
    // 拉取详情数据
    try {
      // 这里假设 item.id 为场景 id，userEmail 可用 isAuthenticated 用户邮箱或空字符串
      const userEmail = ""; // 可根据实际登录信息获取
      const detail = await getSceneDetail(item.id, userEmail);
      // 只取第一个模板（如有多个可扩展）
      const template = detail.templates?.[0] || {};
      onOpenDetail(template);
    } catch (err) {
      // 可加错误提示
      onOpenDetail(item); // fallback
    }
  };

  
  // 首页分区式渲染：每个二级分类一个区块（标题+卡片+explore more）
  const renderCategoriesView = () => {
    if (!selectedCategory) return null;
    const subcategories = categories[selectedCategory].subcategories;

    return (
      <div className="page-container flex flex-col gap-12">
        {subcategories.map((subcategory) => {
          // 获取该二级分类下的所有场景
          const items = contentList.filter(t => t.subcategory === subcategory.name).slice(0, 6);

          if (items.length === 0) return null;

          return (
            <section key={subcategory.id}>
              <div className="flex items-center justify-between mb-4">
                <h2>{subcategory.name}</h2>
                <button
                  className="nav-link"
                  onClick={() => handleExploreMore(subcategory.name)}
                >
                  Explore more templates <ArrowRight size={12} strokeWidth={1}/>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {items.map((item) => (
                    <ContentCard
                    key={item.id}
                    item={item}
                    type={'template'}
                    svgPreview={item.dslFiles?.[0]?.svgPreview}
                    onClick={handleContentClick}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    );
  };

  // 二级分类结果页/搜索结果页
  const renderResultsView = () => {
    // 结果筛选
    let filteredResults = searchResults || contentList;
    // 如果有 selectedSubcategory，且不是全局搜索，则只显示该二级分类
    if (selectedSubcategory) {
      filteredResults = filteredResults.filter(
        (item) => item.subcategory === selectedSubcategory
      );
    }
    // 排序（默认按下载量降序）
    filteredResults = [...filteredResults].sort((a, b) => (b.downloads || 0) - (a.downloads || 0));

    return (
      <div className="w-full max-w-7xl px-4">
        <div className="flex items-center justify-between mb-6 w-full">
          <h2 className="text-primary-font">
            Results
            {selectedSubcategory && (
              <span className="ml-2 text-base text-secondary-font font-normal">
                [{filteredResults.length}]
              </span>
            )}
          </h2>
          <div className="flex items-center gap-2">
            <h3 className="roboto-mono-regular text-sm text-secondary-font">Sort</h3>
            <select className="dropdown-select w-40 text-sm" defaultValue="relevancy">
              <option value="relevancy">Relevancy</option>
              <option value="downloads">Downloads</option>
              <option value="latest">Latest</option>
            </select>
          </div>
        </div>
        <div className="divide-y divide-[var(--border-color)] content-card w-full">
          {filteredResults.length === 0 && (
            <div className="text-center py-12 w-full">
              <p className="text-secondary-font">No results found</p>
            </div>
          )}
          {filteredResults.map((item) => (
            <div
              key={item.id}
              className="py-6"
              onClick={() => handleContentClick(item)}
            >
              {/* 内容区域 */}
              <div className="w-full flex flex-col gap-4">
                <div className="flex flex-grow gap-1 flex-wrap items-center">
                  <span className="card-title">{item.title}</span>
                  {item.labels && item.labels.slice(0, 3).map((label, idx) => (
                    <span key={idx} className="tech-tag text-xs mr-1">{label}</span>
                  ))}
                  {item.labels && item.labels.length > 3 && (
                    <span className="tech-tag text-xs mr-1">+{item.labels.length - 3}</span>
                  )}
                </div>
                <div className="text-secondary-font text-xs line-clamp-2 font-normal">
                  {item.description}
                </div>
                <div className="flex items-center gap-2 text-xs text-secondary-font">
                  <img src={item.author?.avatar} alt={item.author?.name || item.author?.nickname} className="w-5 h-5 rounded-full" />
                  <span>{item.author?.name || item.author?.nickname}</span>
                  {item.author?.isOfficial ? (
                    <span className="badge badge-official" title="Official"><ShieldCheck className="badge-icon" /></span>
                  ) : item.author?.isVerified ? (
                    <span className="badge badge-verified" title="Verified"><BadgeCheck className="badge-icon" /></span>
                  ) : (
                    <span></span>
                  )}
                  <span>·</span>
                  <span>{item.lastUpdate || item.updatedAt || ""}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><ArrowDownToLine size={12} strokeWidth={1}/> {(item.downloads || 0).toLocaleString()} </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-home-gradient flex flex-col gap-0" style={{ position: "relative", zIndex: 1 }}>
      <PixelVignetteBackground variant="default" />
      {/* 顶部分类导航+搜索栏+分类按钮 */}
      <div className="w-full flex flex-col items-center pt-8 pb-4 px-6">
        {/* 搜索栏，左侧显示当前选中分类 */}
        <div className="w-full max-w-4xl align-center">
          <div className="search-bar">
            {/* 面包屑区域：flex + gap-2 控制子元素间距 */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {/* 第一个分类 */}
              {selectedCategory && (
                <span className="inline-block whitespace-nowrap">
                  <span className="category-tag flex items-center">
                    {/* <span className="h-2 inline-flex items-center leading-none">{categoryIconMap[selectedCategory]}</span> */}
                    <span>{selectedCategory}</span>
                  </span>
                  <button
                    className="ml-[-18px]"
                    style={{ lineHeight: 1 }}
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedSubcategory(null);
                      setCurrentView('categories');
                      setSearchResults(null);
                      setShowBentoGrid(true);
                    }}
                  >
                    <X size={10} strokeWidth={1}/>
                  </button>
                </span>
              )}
              {/* 第2个分类 */}
              {selectedSubcategory && selectedCategory && (
                  <span className="inline-block whitespace-nowrap">
                    {/* <span className="leading-none">{categories[selectedCategory].subcategories.find(s => s.name === selectedSubcategory)?.icon || ""}</span> */}
                    <span className="category-tag flex items-center">
                      <span>{selectedSubcategory}</span>
                    </span>
                    <button
                      className="ml-[-18px]"
                      style={{ lineHeight: 1 }}
                      onClick={() => {
                        setSelectedSubcategory(null);
                        setCurrentView('categories');
                        setSearchResults(null);
                      }}
                    >
                      <X size={10} strokeWidth={1}/>
                    </button>
                  </span>
              )}
            <textarea
              placeholder="Search anywhere..."
              rows={1}
              maxLength={100}
              onInput={e => {
                const el = e.target;
                el.style.height = 'auto';
                const max = 48; // 2 lines x 24px line-height ~ 1.5rem -> using px cap
                const newH = Math.min(el.scrollHeight, max);
                el.style.height = newH + 'px';
                // hard cap to two lines by trimming extra newlines
                if (el.scrollHeight > max) {
                  const lines = el.value.split('\n');
                  if (lines.length > 2) {
                    el.value = lines.slice(0, 2).join('\n');
                  }
                }
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSearch(e.target.value);
                }
              }}
            />
            </div>
            <Search size={20} className="text-icon-hint" />
        </div>
          {/* 一级分类横向icon导航 */}
          <div className="w-full flex justify-center flex-col">
            <div className="w-full flex flex-row justify-center  pt-4">
              <div className="categorybar-wrap w-full flex flex-row justify-center">
                <div className="max-w-7xl overflow-x-auto flex gap-2" 
                  style={{scrollbarWidth: 'none', msOverflowStyle: 'none', }} >
                {Object.keys(categories).map((cat) => (
                  <button
                    key={cat}
                    className={`nav-item flex flex-col items-center justify-center gap-1 min-w-[80px] flex-shrink-0 ${
                      selectedCategory === cat ? 'nav-item-active' : ''
                    }`}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSelectedSubcategory(null);
                      setCurrentView('categories');
                      setSearchResults(null);
                      setShowBentoGrid(false);
                    }}
                  >
                    <span className="inline-flex items-center leading-none">{categoryIconMap[cat]}</span>
                    <span className="text-xs leading-none">{cat}</span>
                  </button>
                ))}
                </div>
                <span className="categorybar-blur"></span>
              </div>
            </div>
            <span className="category-divider"></span>
          </div>
          {/* 二级分类区，emoji+文字一排，紧凑 */}
          {selectedCategory && (
            <div className="w-full flex justify-center">
              <div className="max-w-7xl flex flex-wrap gap-2">
                {categories[selectedCategory].subcategories.map((subcat) => (
                  <button
                    key={subcat.id}
                    className={`nav-item flex flex-row items-center gap-1 min-w-[80px] px-3 py-2 rounded-card border-none ${
                      selectedSubcategory === subcat.name ? 'nav-item-active' : ''
                    }`}
                    onClick={() => {
                      setSelectedSubcategory(subcat.name);
                      setCurrentView('results');
                      const results = [
                        ...templates.filter(t => t.subcategory === subcat.name),
                        ...platforms.filter(p => p.subcategory === subcat.name)
                      ];
                      setSearchResults(results);
                      setShowBentoGrid(false);
                    }}
                  >
                    <span className="leading-none">{subcat.icon}</span>
                    <span className="text-xs leading-none">{subcat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* BentoGrid 区块 - 只在没有选择分类时显示 */}
      {showBentoGrid && <BentoGrid />}
      {/* 内容区，宽度自适应一致 */}
      <div className="flex-1 flex flex-col w-full max-w-7xl mx-auto">
        {currentView === 'categories' ? renderCategoriesView() : renderResultsView()}
        {/* 加载更多指示器 */}
        <div ref={loaderRef} style={{ height: 40, textAlign: 'center', color: '#888' }}>
          {sceneLoading
            ? 'Loading...'
            : loadedCount >= totalCount
              ? ''
              : ''}
        {/* 数量显示 */}
        <div className="flex items-center justify-end px-24 py-2 text-xs text-icon-font">
          filtered: {loadedCount} / {totalCount}
        </div>
        </div>
        {sceneError && (
          <div className="text-red-500 text-center py-2">{sceneError}</div>
        )}
      </div>
      <Footer />
      </div>
  );
};

export default HomePage;
