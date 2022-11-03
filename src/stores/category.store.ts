import { useRepo } from "pinia-orm";

import Category from "./models/Category.modal";

export const useCategoryStore = () => {
  const categoryRepo = useRepo(Category)
  const categories = categoryRepo.all();
  const categoriesWithAccountTypes = categoryRepo.withAll().get()
  return { categories, categoriesWithAccountTypes };
};
