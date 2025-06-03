import React, { FC, SyntheticEvent, useState } from 'react';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';

import { RegisterUI } from '@ui-pages';
import { registerUserThunk } from '../../services/slices/user';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const resultAction = await dispatch(
        registerUserThunk({ email, password, name: userName })
      );

      if (registerUserThunk.fulfilled.match(resultAction)) {
        navigate('/login');
      } else {
        setErrorMessage('Ошибка регистрации. Проверьте данные и попробуйте снова.');
        console.error('Registration failed:', resultAction.payload);
      }
    } catch (error) {
      setErrorMessage('Произошла ошибка. Попробуйте позже.');
      console.error('Error during registration:', error);
    }
  };

  return (
    <RegisterUI
      errorText={errorMessage}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
