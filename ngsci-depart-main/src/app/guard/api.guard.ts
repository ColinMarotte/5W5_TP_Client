import { inject } from "@angular/core";
import { CanActivateFn, createUrlTreeFromSnapshot } from "@angular/router";
import { ApiService } from "../services/api.service";
import { HttpService } from "../services/http.service";

export const apiGuard: CanActivateFn = (route, state) => {
  if (!inject(HttpService).isLogged()) {
    return createUrlTreeFromSnapshot(route, ["/login"]);
  }

  return true;
};
