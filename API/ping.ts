import { Drash } from "https://deno.land/x/drash/mod.ts";

export class Ping extends Drash.Http.Resource {
  static paths = ["/ping"];

  public GET() {
    this.response.body = "Ping !";
    return this.response;
  }
}
