import { AxiosError } from "axios";
import { CoursesController, ICourse, IGetCourse } from "./controllers";
import { AuthController } from "./controllers/auth-controller";
import { authErrorResponse, baseErrorResponse } from "./constants";

export class Client {
  public readonly courses: CoursesController;
  public readonly auth: AuthController;

  constructor() {
    this.courses = new CoursesController();
    this.auth = new AuthController();
  }

  async getToken(): Promise<string | undefined> {
    try {
      const responseData = (await this.auth.getToken()).data;
      return responseData.token;
    } catch (error) {
      return;
    }
  }

  async getCourse(
    courseId: string,
    token: string
  ): Promise<IGetCourse | string | undefined> {
    try {
      const responseData = (await this.courses.getCourse(courseId, token)).data;
      const lessons = responseData.lessons.sort((a, b) => a.order - b.order);
      responseData.lessons = lessons.slice();
      return responseData;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) return authErrorResponse;
        else return baseErrorResponse;
      }
    }
  }

  async getCourses(token: string): Promise<ICourse[] | string | undefined> {
    try {
      const responseData = (await this.courses.getCourses(token)).data;
      return responseData.courses.reverse();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) return authErrorResponse;
        else return baseErrorResponse;
      }
    }
  }
}
