import { useRepo } from "pinia-orm";
import { computed } from "vue";
import Transaction from "./models/Transaction.modal";

export interface TransactionsInterface {
  fromAccountId: string | null;
  toAccountId: string | null;
  amount: number;
  description: string;
  type: string;
}

type TransactionIdType = string | number;

export const useTransactionStore = () => {
  const transactionRepo = useRepo(Transaction);
  const transactions = transactionRepo.all();
  const transactionsWithAccounts = computed<Transaction[]>(() =>
    transactionRepo.withAll().get()
  );
  const createTransaction = (data: TransactionsInterface) => {
    transactionRepo.save(data);
  };
  const deleteTransaction = async (id: TransactionIdType) => {
    return await transactionRepo.destroy(id);
  };

  return {
    transactions,
    transactionRepo,
    transactionsWithAccounts,
    createTransaction,
    deleteTransaction,
  };
};
