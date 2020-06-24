import { Drash } from "https://deno.land/x/drash/mod.ts";
import { backend } from "../Ressource/fakeDB.ts";

export class Login extends Drash.Http.Resource {
  static paths = ["/login"];

  public POST() {
    const email = this.request.getBodyParam("email");
    const password = this.request.getBodyParam("password");

    console.log("Email Received " + email);
    console.log("Password Received " + password);

    this.response.body = backend.signIn(email, password);
    return this.response;
  }
}
