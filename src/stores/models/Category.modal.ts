// category Model

import { Model } from "pinia-orm";
import { Str, BelongsTo, HasMany } from "pinia-orm/dist/decorators";
import AccountType from "./AccountType.modal";
import Group from "./Group.modal";

export default class Category extends Model {
  // entity is a required property for all models.
  static entity = "categories";
  static primaryKey = "code";

  @Str("") declare code: string;
  @Str("") declare name: string;
  @Str("") declare groupId: string;
  @Str("") declare description: string;
  @BelongsTo(() => Group, "code", "groupId") declare group: Group | null;
  @HasMany(() => AccountType, "categoryId", "code")
  declare accountTypes: AccountType | null;
}
