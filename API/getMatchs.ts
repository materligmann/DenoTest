import { Drash } from "https://deno.land/x/drash/mod.ts";
import { backend } from "../Ressource/fakeDB.ts";

export class GetMatchs extends Drash.Http.Resource {
  static paths = ["/getMatchs"];

  public GET() {
    let id: number = this.request.getBodyParam("id");
    this.response.body = backend.getMatchs();
    return this.response;
  }
}
