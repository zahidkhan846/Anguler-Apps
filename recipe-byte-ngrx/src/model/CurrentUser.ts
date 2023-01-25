export class CurrentUser {
  constructor(
    public email: string,
    public fullName: string,
    public userId: string,
    private authToken: string,
    private expTime: Date
  ) {}

  get token() {
    const isTokenExp = new Date() > this.expTime;
    if (!this.authToken || isTokenExp) {
      return null;
    }
    return this.authToken;
  }
}
