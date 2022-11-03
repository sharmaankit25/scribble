// Transaction Model

import { Model } from "pinia-orm";
import { Attr, BelongsTo, Bool, Str, Uid } from "pinia-orm/dist/decorators";
import Account from "./Account.modal";

export default class Transaction extends Model {
  static entity = "transactions";

  @Uid() declare id: string;
  @Attr(null) declare accountId: string | null;
  @Str("") declare title: string;
  @Str("") declare body: string;
  @Bool(false) declare published: boolean;
  @BelongsTo(() => Account, "accountId") declare author: Account | null;
}
