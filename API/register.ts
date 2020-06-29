import { Drash } from "https://deno.land/x/drash/mod.ts";
import { backend } from "../Ressource/fakeDB.ts";

export class Register extends Drash.Http.Resource {
  static paths = ["/register"];

  public POST() {
    const email = this.request.getBodyParam("email");
    const password = this.request.getBodyParam("password");
    console.log("Email Received " + email);
    console.log("Password Received " + password);

    if ((email as string) && (password as string)) {
      this.response.body = backend.register(email, password);
    }
    return this.response;
  }
}
