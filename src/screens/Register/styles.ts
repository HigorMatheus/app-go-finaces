import styled from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  height: ${getStatusBarHeight() + RFValue(83)}px;
  align-items: center;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  margin-bottom: ${RFValue(19)}px;
`;

export const Form = styled.View`
  width: 100%;
  flex: 1;
  padding: 24px;
  justify-content: space-between;
`;

export const Fields = styled.View``;

export const TransactionTypes = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 16px;
`;
