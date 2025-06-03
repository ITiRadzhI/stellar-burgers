import React, { FC } from 'react';
import styles from './profile-menu.module.css';
import { NavLink } from 'react-router-dom';

interface UserMenuProps {
  currentPath: string;
  onLogout: () => void;
}

export const UserMenu: FC<UserMenuProps> = ({ currentPath, onLogout }) => (
  <>
    <NavLink
      to="/profile"
      end
      className={({ isActive }) =>
        `text text_type_main-medium text_color_inactive pt-4 pb-4 ${
          styles.link
        } ${isActive ? styles.link_active : ''}`
      }
    >
      Профиль
    </NavLink>

    <NavLink
      to="/profile/orders"
      className={({ isActive }) =>
        `text text_type_main-medium text_color_inactive pt-4 pb-4 ${
          styles.link
        } ${isActive ? styles.link_active : ''}`
      }
    >
      История заказов
    </NavLink>

    <button
      className={`text text_type_main-medium text_color_inactive pt-4 pb-4 ${styles.button}`}
      onClick={onLogout}
    >
      Выход
    </button>

    <p className="pt-20 text text_type_main-default text_color_inactive">
      {currentPath === '/profile'
        ? 'В этом разделе вы можете изменить свои персональные данные'
        : 'В этом разделе вы можете просмотреть свою историю заказов'}
    </p>
  </>
);
