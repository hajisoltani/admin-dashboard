import { createContext, useContext, useState } from "react";

const CategoryContex = createContext()

const CategoryProvider = ({ children }) => {
    const [category, setCategory] = useState()

    return (
        <CategoryContex.Provider value={{ category, setCategory }}>
            {children}
        </CategoryContex.Provider>
    )
}

const useCategoryContext = () => {
    return useContext(CategoryContex)
}

export { useCategoryContext, CategoryProvider }