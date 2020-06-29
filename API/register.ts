import { Drash } from "https://deno.land/x/drash/mod.ts";
import { backend } from "../Ressource/fakeDB.ts";

export class Register extends Drash.Http.Resource {
  static paths = ["/register"];

  public POST() {
    const email = this.request.getBodyParam("email");
    const password = this.request.getBodyParam("password");
    let emailStr = email as string;
    let paswordstr = password as string;
    console.log("Email Received " + emailStr);
    console.log("Password Received " + paswordstr);
    this.response.body = backend.register(emailStr, paswordstr);
    return this.response;
  }
}
