import { useRepo } from "pinia-orm";
import Group from "@/stores/models/Group.modal";

export const useGroupStore = () => {
  const groupRepo = useRepo(Group);
  const groups = groupRepo.all();
  const getAll = () => {
    return groupRepo.all();
  };
  const withCategories = () => {
    return groupRepo.withAll().get();
  };
  return { groups, getAll, withCategories };
};
