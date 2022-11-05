import { useRepo } from "pinia-orm";
import { computed } from "vue";
import Account from "./models/Account.modal";
interface AccountsInterface {
  name: string;
  description: string;
  accountTypeCode: string;
  parentId: string;
  placeholder: boolean;
}

type AccountIdType = string | number;

export const useAccountStore = () => {
  const accountRepo = useRepo(Account);
  const accounts = accountRepo.all();
  const accountsWithType = computed<Account[]>(() =>
    accountRepo.withAll().get()
  );
  const createAccount = (data: AccountsInterface) => {
    accountRepo.save(data);
  };
  const deleteAccount = async (id: AccountIdType) => {
    return await accountRepo.destroy(id);
  };

  return {
    accounts,
    accountRepo,
    accountsWithType,
    createAccount,
    deleteAccount,
  };
};
