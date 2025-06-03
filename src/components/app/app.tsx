import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useParams,
  useNavigate
} from 'react-router-dom';

import { useDispatch, useSelector } from '../../services/store';
import {
  loadIngredients
} from '../../services/slices/ingredients';
import {
  verifyUserAuth,
  selectIsAuthVerified
} from '../../services/slices/user';

import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

import {
  AppHeader,
  OrderInfo,
  IngredientDetails,
  Modal
} from '@components';

import '../../index.css';
import styles from './app.module.css';

const useAuth = () => {
  return useSelector(state => selectIsAuthVerified(state.user));
};

interface ProtectedRouteProps {
  element: JSX.Element;
  requiresAuth: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, requiresAuth }) => {
  const isAuth = useAuth();

  if (requiresAuth) {
    return isAuth ? element : <Navigate to="/login" replace />;
  }

  return !isAuth ? element : <Navigate to="/" replace />;
};

const OrderInfoModal: React.FC = () => {
  const { number } = useParams<{ number: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const onClose = () => {
    if (location.state?.background) {
      navigate(-1);
    } else {
      navigate('/feed');
    }
  };

  return (
    <Modal title="Информация о заказе" onClose={onClose}>
      {number && <OrderInfo orderNumber={number} />}
    </Modal>
  );
};

const IngredientDetailsModal: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const onClose = () => {
    if (location.state?.background) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <Modal title="Детали ингредиента" onClose={onClose}>
      {id && <IngredientDetails />}
    </Modal>
  );
};

const ModalSwitch: React.FC = () => {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route
          path="/login"
          element={<ProtectedRoute element={<Login />} requiresAuth={false} />}
        />
        <Route
          path="/register"
          element={<ProtectedRoute element={<Register />} requiresAuth={false} />}
        />
        <Route
          path="/forgot-password"
          element={<ProtectedRoute element={<ForgotPassword />} requiresAuth={false} />}
        />
        <Route
          path="/reset-password"
          element={<ProtectedRoute element={<ResetPassword />} requiresAuth={false} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} requiresAuth />}
        />
        <Route
          path="/profile/orders"
          element={<ProtectedRoute element={<ProfileOrders />} requiresAuth />}
        />
        <Route
          path="/profile/orders/:number"
          element={<ProtectedRoute element={<ProfileOrders />} requiresAuth />}
        />
        <Route path="/feed/:number" element={<Feed />} />
        <Route path="/ingredients/:id" element={<ConstructorPage />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {background ? (
        <Routes>
          <Route path="/profile/orders/:number" element={<OrderInfoModal />} />
          <Route path="/feed/:number" element={<OrderInfoModal />} />
          <Route path="/ingredients/:id" element={<IngredientDetailsModal />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/profile/orders/:number" element={<OrderInfoModal />} />
          <Route path="/feed/:number" element={<OrderInfoModal />} />
          <Route path="/ingredients/:id" element={<IngredientDetailsModal />} />
        </Routes>
      )}
    </>
  );
};

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadIngredients());
    dispatch(verifyUserAuth());
  }, [dispatch]);

  return (
    <Router>
      <div className={styles.app}>
        <AppHeader />
        <ModalSwitch />
      </div>
    </Router>
  );
};

export default App;
