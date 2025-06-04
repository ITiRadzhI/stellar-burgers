import React, { FC } from 'react';
import {
  Input,
  Button,
  PasswordInput
} from '@zlden/react-developer-burger-ui-components';
import styles from '../common.module.css';
import { Link } from 'react-router-dom';
import { RegisterUIProps } from './type';

export const RegistrationForm: FC<RegisterUIProps> = ({
  errorMessage,
  emailValue,
  setEmailValue,
  passwordValue,
  setPasswordValue,
  userNameValue,
  setUserNameValue,
  onSubmit
}) => (
  <main className={styles.container}>
    <div className={`pt-6 ${styles.wrapCenter}`}>
      <h3 className="pb-6 text text_type_main-medium">Регистрация</h3>
      <form
        className={`pb-15 ${styles.form}`}
        name="register"
        onSubmit={onSubmit}
      >
        <div className="pb-6">
          <Input
            type="text"
            placeholder="Имя"
            onChange={(e) => setUserNameValue(e.target.value)}
            value={userNameValue}
            name="name"
            error={false}
            errorText=""
            size="default"
          />
        </div>
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
            Зарегистрироваться
          </Button>
        </div>
        {errorMessage && (
          <p className={`${styles.error} text text_type_main-default pb-6`}>
            {errorMessage}
          </p>
        )}
      </form>
      <div className={`${styles.question} text text_type_main-default pb-6`}>
        Уже зарегистрированы?
        <Link to="/login" className={`pl-2 ${styles.link}`}>
          Войти
        </Link>
      </div>
    </div>
  </main>
);
