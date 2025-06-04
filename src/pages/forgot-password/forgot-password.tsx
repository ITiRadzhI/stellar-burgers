import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPasswordApi } from '@api';
import { PasswordRecoveryPage } from '@ui-pages';

export const ForgotPassword: FC = () => {
  const [emailValue, setEmailValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    forgotPasswordApi({ email: emailValue })
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      .catch((err: Error) => setErrorMessage(err.message));
  };

  return (
    <PasswordRecoveryPage
      errorMessage={errorMessage}
      emailValue={emailValue}
      setEmailValue={setEmailValue}
      onSubmit={onSubmit}
    />
  );
};
