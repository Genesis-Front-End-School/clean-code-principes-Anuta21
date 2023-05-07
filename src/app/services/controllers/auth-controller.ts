import { AxiosResponse } from "axios";
import { RequestBuilder } from "../../common";
import { IGetToken } from "./models";

export class AuthController {
  private url = `https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions`;

  getToken(): Promise<AxiosResponse<IGetToken, any>> {
    return new RequestBuilder().get<IGetToken>(this.url);
  }
}
