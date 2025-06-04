import { Dispatch, SetStateAction, SyntheticEvent } from 'react';

export type PageProps = {
  emailValue: string;
  setEmailValue: Dispatch<SetStateAction<string>>;
  errorMessage?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
