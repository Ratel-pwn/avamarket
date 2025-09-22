import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../store/slices/authSlice';
import { useAuth0 } from '@auth0/auth0-react';
import { X, Mail, Lock, User } from 'lucide-react';

const LoginModal = ({ isOpen, onClose }) => {
  const [isRegisterView, setIsRegisterView] = useState(false);
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.auth);
  const { loginWithRedirect } = useAuth0();

  // Form state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password })).then((result) => {
      if (loginUser.fulfilled.match(result)) {
        onClose();
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser({ username, email, password })).then((result) => {
      if (registerUser.fulfilled.match(result)) {
        setIsRegisterView(false);
        setUsername('');
        setEmail('');
        setPassword('');
      }
    });
  };
  
  const handleSsoLogin = () => {
    loginWithRedirect();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content window auth-modal">
        <div className="window-header flex justify-between items-center">
          <h2 className="window-title">{isRegisterView ? 'Create Account' : 'Login'}</h2>
          <button onClick={onClose} className="text-icon-hint hover:text-primary-font" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="window-body">
          <form onSubmit={isRegisterView ? handleRegister : handleLogin} className="flex flex-col gap-4 w-full">
            {isRegisterView && (
              <div className="relative input-with-icon">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-icon-hint" />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field pl-10"
                  required
                />
              </div>
            )}
            <div className="relative input-with-icon">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-icon-hint" />
              <input
                type={isRegisterView ? 'email' : 'text'}
                placeholder={isRegisterView ? 'Email' : 'Username or Email'}
                value={isRegisterView ? email : username}
                onChange={(e) => (isRegisterView ? setEmail(e.target.value) : setUsername(e.target.value))}
                className="input-field pl-10"
                required
              />
            </div>
            <div className="relative input-with-icon">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-icon-hint" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-xs text-center">
                {typeof error === 'object' ? error.detail : error}
              </p>
            )}
            <button type="submit" className="btn-primary w-full mt-1" disabled={status === 'loading'}>
              {status === 'loading' ? 'Processing...' : isRegisterView ? 'Register' : 'Login'}
            </button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-xs text-secondary-font">
              {isRegisterView ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button onClick={() => setIsRegisterView(!isRegisterView)} className="font-bold hover:text-DifyBlue">
                {isRegisterView ? 'Login' : 'Register'}
              </button>
            </p>
          </div>

          <div className="relative my-5">
            <hr className="dropdown-menu-divider" />
            <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-white px-2 text-xs text-secondary-font">OR</span>
          </div>

          <button onClick={handleSsoLogin} className="btn-secondary w-full">
            Continue with SSO
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
