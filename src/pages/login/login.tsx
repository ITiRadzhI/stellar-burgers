import React, { FC, SyntheticEvent, useState } from 'react';
import { LoginForm } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { loginUserThunk } from '../../services/slices/user';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const resultAction = await dispatch(
        loginUserThunk({ email: emailValue, password: passwordValue })
      );

      if (loginUserThunk.fulfilled.match(resultAction)) {
        navigate('/');
      } else {
        setErrorMessage('Неправильный логин или пароль');
        console.error('Login failed:', resultAction.payload);
      }
    } catch (error) {
      setErrorMessage('Ошибка при входе. Попробуйте позже.');
      console.error('Error during login:', error);
    }
  };

  return (
    <LoginForm
      errorMessage={errorMessage}
      emailValue={emailValue}
      setEmailValue={setEmailValue}
      passwordValue={passwordValue}
      setPasswordValue={setPasswordValue}
      onSubmit={handleSubmit}
    />
  );
};
