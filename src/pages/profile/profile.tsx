import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchUserDataThunk,
  selectCurrentUser,
  updateUserDataThunk
} from '../../services/slices/user';
import { ProfileUI } from '@ui-pages';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const profileInfo = useSelector((state) => selectCurrentUser(state.user));

  // Инициализация локального состояния формы на основе данных пользователя из стора
  const [formValue, setFormValue] = useState({
    name: profileInfo?.name || '',
    email: profileInfo?.email || '',
    password: ''
  });

  // Обновляем форму при изменении данных пользователя
  useEffect(() => {
    setFormValue({
      name: profileInfo?.name || '',
      email: profileInfo?.email || '',
      password: ''
    });
  }, [profileInfo]);

  const isFormChanged =
    formValue.name !== (profileInfo?.name || '') ||
    formValue.email !== (profileInfo?.email || '') ||
    formValue.password.length > 0;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUserDataThunk(formValue));
    // После обновления можно заново загрузить данные пользователя
    dispatch(fetchUserDataThunk());
    alert('Данные успешно изменены');
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: profileInfo?.name || '',
      email: profileInfo?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
