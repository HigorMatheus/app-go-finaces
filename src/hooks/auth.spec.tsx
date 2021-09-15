import { renderHook, act } from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils';
import { logInAsync } from 'expo-google-app-auth';
import { AuthProvider, useAuth } from './auth';

jest.mock('expo-google-app-auth');

describe('Auth hook', () => {
  it('should be able to sign in with Google account', async () => {
    const googleMocked = mocked(logInAsync as any);
    googleMocked.mockReturnValueOnce({
      type: 'success',
      user: {
        id: 'any_id',
        email: 'higor@teste.com',
        name: 'higor matheus',
        photoUrl: 'photo.png',
      },
    });
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe('higor@teste.com');
  });

  it('user should not connect if cancel authentication with Google', async () => {
    const googleMocked = mocked(logInAsync as any);
    googleMocked.mockReturnValueOnce({
      type: 'cancel',
    });
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty('id');
  });

  it(' should be error when incorrect Google parameters', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    try {
      await act(() => result.current.signInWithGoogle());
    } catch (e) {
      expect(result.current.user).toEqual({});
    }
  });
});
