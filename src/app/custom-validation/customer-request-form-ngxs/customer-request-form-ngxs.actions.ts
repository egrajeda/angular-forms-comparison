export namespace CustomerRequestFormNgxs {
  export class SetCustomerId {
    static readonly type = '[CustomerRequestFormNgxs] SetCustomerId';
    constructor(readonly customerId: string) {}
  }

  export class SetDate {
    static readonly type = '[CustomerRequestFormNgxs] SetDate';
    constructor(readonly date: Date) {}
  }

  export class SetMessage {
    static readonly type = '[CustomerRequestFormNgxs] SetMessage';
    constructor(readonly message: string) {}
  }

  export class Submit {
    static readonly type = '[CustomerRequestFormNgxs] Submit';
  }
}
