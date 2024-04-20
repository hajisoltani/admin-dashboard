import React, { Suspense } from 'react';
import { httpInterceptedService } from '@core/http-service';
import CourseList from '../features/courses/components/CourseList';
import { Await, defer, useLoaderData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Courses = () => {
  const data = useLoaderData()
  const {t} = useTranslation()
  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex align-items-center justify-content-between mb-5">
          <h3 className="mb-0">{t("mainLayout.sidebar.allCourses")}</h3>
          <a href="#" class="btn btn-primary fw-bolder  mt-n1">
            <i class="fas fa-plus ms-2"></i>{t("course.addcourse")}
          </a>
        </div>
        <Suspense fallback={<p className='text-info'>{t("categoryList.Pending")}</p>}>
          <Await resolve={data.courses}>
            {
              (loadedCourses) => <CourseList courses={loadedCourses} />
            }
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export async function coursesLoader() {
  return defer({
    courses: loadCourses()
  })
}

const loadCourses = async () => {
  const response = await httpInterceptedService.get("/Course/list");
  console.log('course loader: ', response.data);
  return response.data;
}

export default Courses;
