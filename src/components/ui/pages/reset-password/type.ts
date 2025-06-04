import { Dispatch, SetStateAction } from 'react';

export type PasswordResetProps = {
  errorMessage: string;
  passwordValue: string;
  setPasswordValue: Dispatch<SetStateAction<string>>;
  tokenValue: string;
  setTokenValue: Dispatch<SetStateAction<string>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
