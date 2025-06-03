import React, { FC } from 'react';

import { Button, Input } from '@zlden/react-developer-burger-ui-components';
import styles from './profile.module.css';
import commonStyles from '../common.module.css';

import { UserProfileProps } from './type';
import { ProfileMenu } from '@components';

export const UserProfile: FC<UserProfileProps> = ({
  formData,
  isModified,
  errorMessage,
  onSubmit,
  onCancel,
  onInputChange
}) => (
  <main className={commonStyles.container}>
    <div className={`mt-30 mr-15 ${styles.menu}`}>
      <ProfileMenu />
    </div>

    <form
      className={`mt-30 ${styles.form} ${commonStyles.form}`}
      onSubmit={onSubmit}
    >
      <div className="pb-6">
        <Input
          type="text"
          placeholder="Имя"
          onChange={onInputChange}
          value={formData.name}
          name="name"
          error={false}
          errorText=""
          size="default"
          icon="EditIcon"
        />
      </div>

      <div className="pb-6">
        <Input
          type="email"
          placeholder="E-mail"
          onChange={onInputChange}
          value={formData.email}
          name="email"
          error={false}
          errorText=""
          size="default"
          icon="EditIcon"
        />
      </div>

      <div className="pb-6">
        <Input
          type="password"
          placeholder="Пароль"
          onChange={onInputChange}
          value={formData.password}
          name="password"
          error={false}
          errorText=""
          size="default"
          icon="EditIcon"
        />
      </div>

      {isModified && (
        <div className={styles.button}>
          <Button
            type="secondary"
            htmlType="button"
            size="medium"
            onClick={onCancel}
          >
            Отменить
          </Button>
          <Button type="primary" size="medium" htmlType="submit">
            Сохранить
          </Button>
        </div>
      )}

      {errorMessage && (
        <p className={`${commonStyles.error} pt-5 text text_type_main-default`}>
          {errorMessage}
        </p>
      )}
    </form>
  </main>
);
