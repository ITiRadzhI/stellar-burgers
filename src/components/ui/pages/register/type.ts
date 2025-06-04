import { Dispatch, SetStateAction } from 'react';

export type RegisterUIProps = {
  errorMessage: string;
  emailValue: string;
  setEmailValue: Dispatch<SetStateAction<string>>;
  passwordValue: string;
  setPasswordValue: Dispatch<SetStateAction<string>>;
  userNameValue: string;
  setUserNameValue: Dispatch<SetStateAction<string>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
