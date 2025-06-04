import React, { FC } from 'react';
import {
  Input,
  Button,
  PasswordInput
} from '@zlden/react-developer-burger-ui-components';
import styles from '../common.module.css';
import { Link } from 'react-router-dom';
import { AuthFormProps } from './type';

export const LoginForm: FC<AuthFormProps> = ({
  emailValue,
  setEmailValue,
  passwordValue,
  setPasswordValue,
  errorMessage,
  onSubmit
}) => (
  <main className={styles.container}>
    <div className={`pt-6 ${styles.wrapCenter}`}>
      <h3 className="pb-6 text text_type_main-medium">Вход</h3>
      <form
        className={`pb-15 ${styles.form}`}
        name="login"
        onSubmit={onSubmit}
      >
        <div className="pb-6">
          <Input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmailValue(e.target.value)}
            value={emailValue}
            name="email"
            error={false}
            errorText=""
            size="default"
          />
        </div>
        <div className="pb-6">
          <PasswordInput
            onChange={(e) => setPasswordValue(e.target.value)}
            value={passwordValue}
            name="password"
          />
        </div>
        <div className={`pb-6 ${styles.button}`}>
          <Button type="primary" size="medium" htmlType="submit">
            Войти
          </Button>
        </div>
        {errorMessage && (
          <p className={`${styles.error} text text_type_main-default pb-6`}>
            {errorMessage}
          </p>
        )}
      </form>
      <div className={`pb-4 ${styles.question} text text_type_main-default`}>
        Вы - новый пользователь?
        <Link to="/register" className={`pl-2 ${styles.link}`}>
          Зарегистрироваться
        </Link>
      </div>
      <div className={`${styles.question} text text_type_main-default pb-6`}>
        Забыли пароль?
        <Link to="/forgot-password" className={`pl-2 ${styles.link}`}>
          Восстановить пароль
        </Link>
      </div>
    </div>
  </main>
);
