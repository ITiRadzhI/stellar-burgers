import { Dispatch, SetStateAction } from 'react';

export type AuthFormProps = {
  emailValue: string;
  setEmailValue: (value: string) => void;
  passwordValue: string;
  setPasswordValue: (value: string) => void;
  errorMessage?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
