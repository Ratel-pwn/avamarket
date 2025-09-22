import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, LogIn, Fan, LogOut } from 'lucide-react';
import { ROUTES } from '../constants/routes';
import { logoutUser } from '../store/slices/authSlice';
import { useAuth0 } from "@auth0/auth0-react";

const Header = ({ onNavigate, activeTab = 'template', onLoginClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const auth0 = useAuth0(); // Still keep for SSO logout if needed, but primary auth is via redux
  
  const navigate = useNavigate();

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    // Also logout from auth0 if the user was logged in via SSO
    if (auth0.isAuthenticated) {
        auth0.logout({ returnTo: window.location.origin });
    }
    setIsProfileOpen(false);
  };

  const NavLink = ({ id, children, to }) => {
    const isActive = activeTab === id;
    return (
      <Link
        to={to || ROUTES.HOME}
        onClick={() => onNavigate(id)}
        className={`nav-item rounded-button px-3 py-1 ${
          isActive ? 'nav-item-active' : ''
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <header 
      className={`header-bg transition-all duration-300 ${
        isScrolled ? 'header-floating' : ''
      }`} 
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* 左侧导航 */}
          <div className="flex items-center space-x-8">
            {/* Logo + 圆球按钮 */}
            <div className="flex items-center select-none">
              <button
                className="w-7 h-7 mr-2 flex items-center justify-center block md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Open menu"
                style={{ minWidth: 28, minHeight: 28 }}
              >
                <Menu size={20}  color="var(--primary-font)"/>
              </button>
              <Link 
                to={ROUTES.HOME}
                className="roboto-mono-bold text-lg text-primary-font tracking-tight hover:text-primary-font-a80 transition-colors cursor-pointer"
                onClick={() => onNavigate('template')}
              >
                AvaMarket
              </Link>
            </div>
            
            {/* 主导航 */}
            {/* 桌面端导航 */}
            <nav className="hidden md:flex items-center space-x-2">
              <NavLink id="template">Templates</NavLink>
              <NavLink id="platform">Platforms</NavLink>
              <NavLink id="mcp">MCP</NavLink>
            </nav>
          </div>

          {/* 右侧操作 */}
          <div className="flex items-center space-x-4">
            {/* 桌面端 Publish 按钮 */}
            <button
              className="roboto-mono-light btn-primary h-8.5 items-center gap-2 hidden md:inline-flex"
              onClick={() => {
                if (!isAuthenticated) {
                  onLoginClick();
                } else {
                  navigate(ROUTES.PUBLISH);
                }
              }}
            >
              <Fan size={16} strokeWidth={1.5} style={{animation: 'spin 2s linear infinite' }} />
              Publish
            </button>
            {/* 个人中心/登录 */}
            <div className="relative">
              {!isAuthenticated ? (
                <button
                  className="btn-secondary h-8.5 flex items-center gap-2"
                  onClick={onLoginClick}
                >
                  <LogIn size={16} strokeWidth={1} />
                  Login
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="dropdown-select flex items-center h-8.5"
                  >
                    <span
                      className="truncate rounded-full text-sm"
                      title={user?.username || user?.email || 'User'}
                      style={{ maxWidth: 96, display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {user?.username
                        ? (user.username.length > 16 ? user.username.slice(0, 16) + '…' : user.username)
                        : (user?.email || 'User')}
                    </span>
                    <img
                      src={user?.picture || `https://api.dicebear.com/9.x/bottts/svg?seed=${user?.username || 'User'}`}
                      alt={user?.name || "User"}
                      className="w-7 h-7 rounded-full"
                    />
                  </button>
                  {/* 下拉菜单 */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 py-2 z-50 dropdown-menu">
                      <button className="block w-full text-left px-4 py-2 dropdown-item">
                        Profile
                      </button>
                      <button className="dropdown-menu-item">
                        My Posts
                      </button>
                      <hr className="dropdown-menu-divider" />
                      <button
                        className="dropdown-menu-item roboto-mono-semibold text-red-400 hover:text-red-500 hover:bg-red-50"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {/* 移动端下拉菜单 */}
        {isMobileMenuOpen && (
          <div className="block md:hidden absolute left-0 right-0 top-16 z-50 dropdown-menu">
            <nav className="flex flex-col items-start px-6 py-4 space-y-2">
              <NavLink id="template">Templates</NavLink>
              <NavLink id="platform">Platforms</NavLink>
              <NavLink id="mcp">MCP</NavLink>
              <button
                className="roboto-mono-light btn-primary w-full text-left my-2 gap-2"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (!isAuthenticated) {
                    onLoginClick();
                  } else {
                    navigate(ROUTES.PUBLISH);
                  }
                }}
              >
                <Fan size={16} strokeWidth={1.5} style={{animation: 'spin 2s linear infinite' }} />
                Publish
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
