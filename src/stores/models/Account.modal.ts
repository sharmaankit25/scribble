// account Model

import { Model } from "pinia-orm";
import { Bool, Str, Uid } from "pinia-orm/dist/decorators";

export default class Account extends Model {
  // entity is a required property for all models.
  static entity = "accounts";

  @Uid() declare id: string;
  @Str("") declare name: string;
  @Str("") declare description: string;
  @Str("") declare category: string;
  @Str("") declare type: string;
  @Str("") declare parent: string;
  @Bool(false) declare placeholder: boolean;

  static piniaOptions = {
    persist: true,
  };
}
