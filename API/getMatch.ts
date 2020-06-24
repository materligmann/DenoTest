import { Drash } from "https://deno.land/x/drash/mod.ts";
import { backend } from "../Ressource/fakeDB.ts";

export class GetMatch extends Drash.Http.Resource {
  static paths = ["/getMatch"];

  public GET() {
    let id: number = this.request.getBodyParam("id");
    this.response.body = { "matchId": backend.getMatchWithID(id) };
    return this.response;
  }
}
