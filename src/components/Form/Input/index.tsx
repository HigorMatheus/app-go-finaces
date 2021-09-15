/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { TextInputProps } from 'react-native';
import { Container } from './styles';

interface InputProps extends TextInputProps {
  // eslint-disable-next-line react/require-default-props
  active?: boolean;
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function Input({ active = false, ...rest }: InputProps) {
  return <Container active={active} {...rest} />;
}
