import React from 'react';
import { mocked } from 'ts-jest/utils';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { Register } from '.';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../global/styles/theme';
import { NavigationContainer } from '@react-navigation/native';
const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});
const Providers: React.FC = ({ children }) => {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </NavigationContainer>
  );
};
describe('Register Screen', () => {
  it('should be open category modal when user click on  button', async () => {
    const { getByTestId } = render(<Register />, { wrapper: Providers });
    const categoryModal = getByTestId('modal-category');
    const buttonCategory = getByTestId('button-category');

    fireEvent.press(buttonCategory);
    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    });
  });
});
