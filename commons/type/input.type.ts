import React from 'react';
import { Control, FieldError, RegisterOptions } from 'react-hook-form';

export interface BaseControlledInputProps {
  name: string;
  control: Control<any>;
  rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  defaultValue?: string | boolean | number;
  placeholder?: string;
}

export interface BaseInputProps {
  error?: string;
  help?: string;
  inlineLabel?: boolean;
  label?: React.ReactNode;
  customPrefix?: React.ReactNode;
  suffix?: React.ReactNode;
  rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
}

export type InputProps = BaseInputProps & React.InputHTMLAttributes<HTMLInputElement>;

export type ControlledInputProps = InputProps & BaseControlledInputProps;

export interface SelectOptionProps {
  value: string | undefined;
  label: string | undefined;
}
