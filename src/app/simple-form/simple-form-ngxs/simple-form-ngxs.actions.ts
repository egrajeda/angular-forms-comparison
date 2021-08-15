export namespace SimpleFormNgxs {
  export class SetName {
    static readonly type = '[SimpleFormNgxs] SetName';
    constructor(readonly name: string) {}
  }

  export class SetBirthdate {
    static readonly type = '[SimpleFormNgxs] SetBirthdate';
    constructor(readonly birthdate: Date) {}
  }

  export class SetFavoriteColor {
    static readonly type = '[SimpleFormNgxs] SetFavoriteColor';
    constructor(readonly favoriteColor: string) {}
  }

  export class Submit {
    static readonly type = '[SimpleFormNgxs] Submit';
  }
}
