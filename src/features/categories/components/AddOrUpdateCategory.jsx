import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { httpInterceptedService } from '../../../core/http-service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useCategoryContext } from '../CategoryContext';
import { useTranslation } from 'react-i18next';

const AddOrUpdateCategory = ({ setShowAddCategory }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const { category, setCategory } = useCategoryContext()
    const { t } = useTranslation()

    useEffect(() => {
        if (category) {
            setValue("name", category.name)
            setValue('id', category.id)
        }

    }, [category])

    const onClose = () => {
        setShowAddCategory(false)
        setCategory(null)
    }

    const onSubmit = (data) => {
        setShowAddCategory(false)
        const response = httpInterceptedService.post('/CourseCategory/', data)
        toast.promise(
            response,
            {
                pending: t("errorHandler.Pending"),
                success: {
                    render() {
                        const url = new URL(window.location.href);
                        navigate(url.pathname + url.search);
                        if (category) {
                            setCategory(null)
                        }
                        return t("errorHandler.Success");
                    }
                },
                error: {
                    render({ data }) {
                        if (data.response.status === 400) {
                            return t("categoryList." + data.response.data.code)
                        } else {
                            return t("errorHandler.Error")
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
        <div className='card'>
            <div className="card-body">
                <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="form-label"></label>
                        <input
                            className={`form-control form-control-lg ${errors.name && 'is-invalid'
                                }`}
                            {...register("name", { required: true })} />
                        {
                            errors.name && errors.name.type === 'required' &&
                            (<p className='text-danger small fw-bolder mt-1'>{t("buttons.InputName")}</p>)

                        }
                        <div className="text-start mt-3">
                            <button type='button'
                                className="btn btn-lg btn-secondary ms-2 "
                                onClick={onClose}
                            >
                                {t("buttons.Close")}
                            </button>
                            <button type='submit' className="btn btn-lg btn-primary ms-2 "
                            >
                                {t("buttons.RecordChanges")}
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddOrUpdateCategory;
