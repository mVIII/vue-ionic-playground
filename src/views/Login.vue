<template>
  <div class="">
    <h2>Login</h2>
    <div>
      <label for="username">Username</label>
      <input
        data-test="username"
        type="text"
        id="username"
        name="username"
        v-model="credentials.username"
      />
    </div>
    <div>
      <label for="password">Password</label>
      <input
        data-test="password_input"
        type="password"
        id="password"
        name="password"
        v-model="credentials.password"
      />
    </div>
    <button type="submit" data-test="submit_button" @click="login()">
      Login
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuth } from '@/composables/useAuth';

export default defineComponent({
  name: 'Login',
  setup() {
    const { credentials, login } = useAuth();

    return {
      login,
      credentials,
    };
  },
});
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>
