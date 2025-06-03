import React, { FC, memo } from 'react';

import styles from './modal.module.css';

import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { ModalOverlayUI } from '@ui';
import { TModalUIProps } from './type';

export const ModalUI: FC<TModalUIProps> = memo(({ title, onClose, children }) => (
  <>
    <div className={styles.modal}>
      <div className={styles.header}>
        <h3 className={`${styles.title} text text_type_main-large`}>{title}</h3>
        <button className={styles.button} type="button" onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
    <ModalOverlayUI onClick={onClose} />
  </>
));
