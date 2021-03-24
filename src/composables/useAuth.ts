import { container } from 'tsyringe';
import AuthStore from '@/stores/authStore';
import { reactive } from 'vue';

export function useAuth() {
  const authStore = container.resolve(AuthStore);

  const credentials = reactive({
    username: '',
    password: '',
  });

  async function login(): Promise<void> {
    const error = await authStore.Login(
      credentials.username,
      credentials.password
    );

    if (error) {
      throw error;
    }
    window.location.reload();
  }

  async function logout(): Promise<void> {
    const error = await authStore.Logout();
    if (error) {
      throw error;
    }
    window.location.reload();
  }

  return {
    login,
    logout,
    credentials,
  };
}
