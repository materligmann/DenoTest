import { Drash } from "https://deno.land/x/drash/mod.ts";
import { backend } from "../Ressource/fakeDB.ts";

export class Cron extends Drash.Http.Resource {
  static paths = ["/cron"];

  public GET() {
    console.log("cronning...");
    const seed = this.request.getBodyParam("seed");
    let seedNumber = seed as number;
    let newOrder = backend.generateOrder(seedNumber);
    this.response.body = newOrder;
    return this.response;
  }
}
