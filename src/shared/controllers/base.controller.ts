export class BaseController {
  protected response(data: any, status: number = 200) {
    return {
      status,
      data,
    };
  }
}
