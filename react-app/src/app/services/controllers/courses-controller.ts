import { AxiosResponse } from "axios";
import { RequestBuilder } from "request-builder-library/src";
import { IGetCourse, IGetCoursesResponse } from "./models";

export class CoursesController {
  private searchUrl = `https://api.wisey.app/api/v1/core/preview-courses`;

  getCourses(token: string): Promise<AxiosResponse<IGetCoursesResponse, any>> {
    const path = `${this.searchUrl}`;
    return new RequestBuilder()
      .setHeaders({
        Authorization: `Bearer ${token}`,
      })
      .get<IGetCoursesResponse>(path);
  }

  getCourse(
    courseId: string,
    token: string
  ): Promise<AxiosResponse<IGetCourse, any>> {
    const path = `${this.searchUrl}/${courseId}`;
    return new RequestBuilder()
      .setHeaders({
        Authorization: `Bearer ${token}`,
      })
      .get<IGetCourse>(path);
  }
}
