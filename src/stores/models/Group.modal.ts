// group Model

import { Model } from "pinia-orm";
import { HasMany, Str } from "pinia-orm/dist/decorators";
import Category from "./Category.modal";

export default class Group extends Model {
  // entity is a required property for all models.
  static entity = "groups";
  static primaryKey = "code";

  @Str("") declare code: string;
  @Str("") declare name: string;
  @Str("") declare description: string;
  @HasMany(() => Category, "groupId", "code")
  declare categories: Category | null;
}
