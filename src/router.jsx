import { createBrowserRouter } from "react-router-dom";
import IdentityLayout from "./layouts/IdentityLayout";
import Login, { loginAction } from "./features/identity/components/login/Login";
import Register, { registerAction } from "./features/identity/components/register/Register";
import MainLayout from "./layouts/mainLayout/MainLayout";
import Courses, { coursesLoader } from "./pages/Courses";
import CourseCategories, { categoriesLoader } from "./pages/CourseCategories";
import CourseDetails, { courseDetalisLoader } from "./features/courses/components/CourseDetails";
import { CategoryProvider } from "./features/categories/CategoryContext";
import NotFound from "./pages/NotFound";
import UnhandledException from "./pages/UnhandledException";
import Logout from "./features/identity/components/logout/Logout";



const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement:<UnhandledException/>,
        children: [
            {
                element: <Courses />,
                index: true,
                loader: coursesLoader

            },
            {
                path: 'course-categories',
                element: (<CategoryProvider>
                    <CourseCategories />
                </CategoryProvider>),
                loader: categoriesLoader
            },
            {
                path: 'courses/:id',
                element: <CourseDetails />,
                loader: courseDetalisLoader

            },
            {
                path: '*',
                element: <NotFound />
            }
           

        ]
    },
    {
        element: <IdentityLayout />,
        children: [
            {
                path: 'login',
                element: <Login />,
                action: loginAction,
                errorElement: <Login />
            },
            {
                path: 'register',
                element: <Register />,
                action: registerAction,
                errorElement: <Register />
            },
            {
                path:'logout',
                element:<Logout/>,
                errorElement:<Logout/>
            }
        ],
    }
    ,]);

export default router;