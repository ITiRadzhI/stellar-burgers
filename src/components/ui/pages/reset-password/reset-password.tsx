import React, { FC } from 'react';
import {
  Input,
  Button,
  PasswordInput
} from '@zlden/react-developer-burger-ui-components';
import styles from '../common.module.css';
import { Link } from 'react-router-dom';
import { PasswordResetProps } from './type';

export const PasswordResetForm: FC<PasswordResetProps> = ({
  errorMessage,
  passwordValue,
  setPasswordValue,
  tokenValue,
  setTokenValue,
  onSubmit
}) => (
  <main className={styles.container}>
    <div className={`pt-6 ${styles.wrapCenter}`}>
      <h3 className="pb-6 text text_type_main-medium">Восстановление пароля</h3>
      <form
        className={`pb-15 ${styles.form}`}
        name="passwordReset"
        onSubmit={onSubmit}
      >
        <div className="pb-6">
          <PasswordInput
            onChange={(e) => setPasswordValue(e.target.value)}
            value={passwordValue}
            name="password"
          />
        </div>
        <div className="pb-6">
          <Input
            type="text"
            placeholder="Введите код из письма"
            onChange={(e) => setTokenValue(e.target.value)}
            value={tokenValue}
            name="token"
            error={false}
            errorText=""
            size="default"
          />
        </div>
        <div className={`pb-6 ${styles.button}`}>
          <Button type="primary" size="medium" htmlType="submit">
            Сохранить
          </Button>
        </div>
        {errorMessage && (
          <p className={`${styles.error} text text_type_main-default pb-6`}>
            {errorMessage}
          </p>
        )}
      </form>
      <div className={`${styles.question} text text_type_main-default pb-6`}>
        Вспомнили пароль?
        <Link to="/login" className={`pl-2 ${styles.link}`}>
          Войти
        </Link>
      </div>
    </div>
  </main>
);
