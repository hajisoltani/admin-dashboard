import React, { Suspense, useState } from 'react';
import { Await, defer, useLoaderData, useNavigate } from 'react-router-dom';
import { httpInterceptedService } from '@core/http-service';
import CategoryList from '../features/categories/components/CategoryList';
import Modal from '../components/Modal';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify'
import AddOrUpdateCategory from '../features/categories/components/AddOrUpdateCategory';
import { useCategoryContext } from '../features/categories/CategoryContext';



const CourseCategories = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState()
    const [showAddCategory, setShowAddCategory] = useState(false)

    const data = useLoaderData()
    const navigate = useNavigate()
    const { t } = useTranslation()

    const { category } = useCategoryContext()

    const deleteCategory = (categoryId) => {
        setSelectedCategory(categoryId)
        setShowDeleteModal(true)
    }

    const handleDeleteCategory = async () => {
        setShowDeleteModal(false)
        const response = httpInterceptedService.delete(
            `/CourseCategory/${selectedCategory}`
        );
        console.log(response);
        toast.promise(
            response,
            {
                pending: t("errorHandler.PendingDelete"),
                success: {
                    render() {
                        const url = new URL(window.location.href);
                        navigate(url.pathname + url.search);
                        return t("errorHandler.Success");
                    }
                },
                error: {
                    render({ data }) {
                        if (data.response.status === 400) {
                            return t("categoryList." + data.response.data.code);
                        } else {
                            return 'not found'
                        }
                    }
                }
            },
            {
                position: "bottom-left"
            }
        )
    }


    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="d-flex align-items-center justify-content-between mb-5">
                        <h3 className="mb-0">{t("mainLayout.sidebar.coursesCategory")}</h3>
                        <button
                            onClick={() => setShowAddCategory(true)}
                            className="btn btn-primary fw-bolder mt-1"
                        >
                            <i className="fas fa-plus ms-2"></i>{t("categoryList.AddCategory")}
                        </button>

                    </div>

                    {
                        (showAddCategory || category) && <AddOrUpdateCategory setShowAddCategory={setShowAddCategory} />
                    }



                    <Suspense fallback={<p className='text-info'>{t("categoryList.Pending")}</p>}>
                        <Await resolve={data.categories}>
                            {
                                (loadedCategories) => <CategoryList deleteCategory={deleteCategory} categories={loadedCategories} />
                            }

                        </Await>
                    </Suspense>



                </div>
            </div>
            <Modal
                isOpen={showDeleteModal}
                open={setShowDeleteModal}
                title={t("modal.delete")}
                body={t("modal.body")} >
                <button type='button' className='btn btn-secondary fw-bolder' onClick={() => setShowDeleteModal(false)}>
                    {t("modal.dissuasion")}
                </button>
                <button type='button' className='btn btn-primary fw-bolder' onClick={handleDeleteCategory}>
                    {t("modal.delete")}
                </button>
            </Modal>
        </>
    );
}

export async function categoriesLoader({ request }) {
    return defer({
        categories: loadCategories(request)
    })
}
const loadCategories = async (request) => {
    const page = new URL(request.url).searchParams.get('page') || 1
    const pageSize = import.meta.env.VITE_PAGE_SIZE
    let url = '/CourseCategory/sieve'
    url += `?page=${page}&pageSize=${pageSize}`
    const response = await httpInterceptedService.get(url)
    return response.data
}

export default CourseCategories;
