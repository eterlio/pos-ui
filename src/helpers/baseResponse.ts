import { AxiosResponse } from "axios";

export class BaseResponse<T> {
  public response: T;
  public success: boolean;
  constructor(response: AxiosResponse) {
    this.response = response.data.response || response.data;
    this.success = response.data.success;
  }
}
