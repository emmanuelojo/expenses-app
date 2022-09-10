import { computed, reactive, readonly } from "vue";
import { LoginResponse } from "../types/authTypeResponse";
import authApi from "../network/authApi";
import { User } from "../models/User";
import { encrypt, decrypt, getUser } from "../utils/helpers";

interface AuthStore {
  token: string | null;
  user: User;
}

const state = reactive<AuthStore>({
  token: null,
  user: {} as User,
});

const mutations = {
  setToken: (payload: string) => {
    state.token = payload;
    localStorage.setItem("expenseToken", payload);
  },

  setUser: (payload: User) => {
    state.user = payload;

    const encryptedUID = encrypt(payload._id.toString());
    const encryptedUserData = encrypt(JSON.stringify(payload));

    localStorage.setItem("user", encryptedUserData);
  },
};

const actions = {
  login: async (data: any) => {
    const apiCall = await authApi.login(data);

    const result = apiCall.data;

    if (result.code === 200 && result.data) {
      mutations.setToken(result.access_token);
      mutations.setUser(result.data);

      return {
        success: true,
        message: result.message,
      };
    } else {
      return {
        success: false,
        message: result.message,
      };
    }
  },

  getUser: () => {
    const decryptedUserData = decrypt(getUser("user"));

    mutations.setUser(JSON.parse(decryptedUserData));
  },
};

const getters = {
  user: computed(() => state.user),
};

export default {
  state,
  mutations,
  getters,
  actions,
};
