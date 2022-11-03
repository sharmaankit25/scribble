// category Model

import { Model } from "pinia-orm";
import { Str, BelongsTo } from "pinia-orm/dist/decorators";
import Category from "./Category.modal";

export default class AccountType extends Model {
  // entity is a required property for all models.
  static entity = "account_types";
  static primaryKey = "code";

  @Str("") declare code: string;
  @Str("") declare name: string;
  @Str("") declare categoryId: string;
  @Str("") declare description: string;
  @BelongsTo(() => Category, "code", "categoryId")
  declare category: Category | null;
}
