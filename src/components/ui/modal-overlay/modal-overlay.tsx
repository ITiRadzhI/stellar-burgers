import React, { FC } from 'react';
import styles from './modal-overlay.module.css';

interface ModalOverlayProps {
  onClick: () => void;
}

export const ModalOverlayUI: FC<ModalOverlayProps> = ({ onClick }) => (
  <div
    className={styles.overlay}
    onClick={onClick}
    data-cy="modal-overlay"
  />
);
