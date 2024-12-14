export class User {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly partnerId: number,
    public readonly created_at: Date,
    public readonly updated_at: Date,
  ) {}
}
