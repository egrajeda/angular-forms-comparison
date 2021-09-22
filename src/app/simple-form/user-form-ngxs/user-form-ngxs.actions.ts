export namespace UserFormNgxs {
  export class SetName {
    static readonly type = '[UserFormNgxs] SetName';
    constructor(readonly name: string) {}
  }

  export class SetBirthdate {
    static readonly type = '[UserFormNgxs] SetBirthdate';
    constructor(readonly birthdate: Date) {}
  }

  export class SetFavoriteColor {
    static readonly type = '[UserFormNgxs] SetFavoriteColor';
    constructor(readonly favoriteColor: string) {}
  }

  export class Submit {
    static readonly type = '[UserFormNgxs] Submit';
  }
}
