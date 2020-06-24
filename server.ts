import { Drash } from "https://deno.land/x/drash/mod.ts";
import { Register } from "./API/register.ts";
import { Login } from "./API/login.ts";
import { Cron } from "./API/cron.ts";
import { GetMatch } from "./API/getMatch.ts";
import { GetMatchs } from "./API/getMatchs.ts";

const server = new Drash.Http.Server({
  response_output: "application/json",
  resources: [Register, Login, Cron, GetMatch, GetMatchs],
});

server.run({
  hostname: "localhost",
  port: 8080,
});

console.log("Server listennig on port 8080");