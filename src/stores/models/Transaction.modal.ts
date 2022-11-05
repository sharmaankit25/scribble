// Transaction Model

import { Model } from "pinia-orm";
import { BelongsTo, Mutate, Num, Str } from "pinia-orm/dist/decorators";
import { Uid } from "pinia-orm/dist/nanoid/index";
import Account from "./Account.modal";

export default class Transaction extends Model {
  static entity = "transactions";
  static primaryKey = "id";

  @Uid() declare id: string;
  @Str("") declare fromAccountId: string;
  @Str("") declare toAccountId: string;
  @Num(0) declare amount: number;
  @Str("") declare description: string;
  @Str("") declare type: string;
  @BelongsTo(() => Account, "fromAccountId", "id")
  declare fromAccount: Account | null;
  @BelongsTo(() => Account, "toAccountId", "id")
  declare toAccount: Account | null;
  declare transfer: Account | null;

  @Mutate(() => Date.now()) @Num(0) declare timestamp: number;

  static piniaOptions = {
    persist: true,
  };
}
