export class UserCreateDto {
  constructor(
    public email: string,
    public partnerId: number,
  ) {}

  static from(email: string, partnerId: number) {
    return new UserCreateDto(email, partnerId);
  }
}
