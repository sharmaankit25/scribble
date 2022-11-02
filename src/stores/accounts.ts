import { ref } from "vue";
import { defineStore } from "pinia";

interface AccountsInterface {
  code: string;
  name: string;
  category: string;
  description: string;
  type: string;
  parent: string;
  placeholder: boolean;
}

export const useAccountsStore = defineStore("accounts", () => {
  const accounts = ref<AccountsInterface[]>([]);
  const addAccount = (content: AccountsInterface) => {
    accounts.value.push(content);
  };

  return { accounts, addAccount };
});
