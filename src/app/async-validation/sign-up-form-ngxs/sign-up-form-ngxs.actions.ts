export namespace SignUpFormNgxs {
  export class SetUsername {
    static readonly type = '[SignUpFormNgxs] SetUsername';
    constructor(readonly username: string) {}
  }

  export class SetPassword {
    static readonly type = '[SignUpFormNgxs] SetPassword';
    constructor(readonly password: string) {}
  }

  export class Submit {
    static readonly type = '[SignUpFormNgxs] Submit';
  }
}
