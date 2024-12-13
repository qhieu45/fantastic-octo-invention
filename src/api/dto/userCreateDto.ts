export class UserCreateDto {
  constructor(public email: string) {}

  static from(email: string) {
    return new UserCreateDto(email);
  }
}
