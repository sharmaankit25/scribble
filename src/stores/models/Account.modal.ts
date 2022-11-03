// account Model

import { Model } from "pinia-orm";
import { BelongsTo, Bool, HasOne, Str } from "pinia-orm/dist/decorators";
import { Uid } from "pinia-orm/dist/nanoid/index";
import AccountType from "./AccountType.modal";

export default class Account extends Model {
  // entity is a required property for all models.
  static entity = "accounts";

  @Uid() declare id: string;
  @Str("") declare name: string;
  @Str("") declare description: string;
  @Str("") declare accountTypeCode: string;
  @Str("") declare parentId: string;
  @Bool(false) declare placeholder: boolean;

  @HasOne(() => AccountType, "code", "accountTypeCode")
  declare accountType: AccountType | null;

  static piniaOptions = {
    persist: true,
  };
}
