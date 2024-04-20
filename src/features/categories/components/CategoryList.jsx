import React, { useEffect, useState } from 'react';
import Pagination from '../../../components/pagination';
import { useNavigation } from 'react-router-dom';
import Spinner from '../../../components/Spinner';
import { httpInterceptedService } from '../../../core/http-service';
import CategoryTable from './CategoryTable';


const CategoryList = ({ categories: { data, totalRecords }, deleteCategory }) => {

  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false)

  const navigation = useNavigation()

  useEffect(() => {
    const fetchData = async () => {
      const response = await httpInterceptedService.get("/CourseCategory/sieve");
      setSearchData(response.data.data);
    };
    fetchData()
  }, [data]);

  useEffect(() => {
    if (searchTerm === '') {
      setSearchResults(searchData)
    } else {
      const results =
        searchData.filter(category =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      setSearchResults(results);
    }
  }, [searchTerm, searchData]);

  const handleChange = event => {
    if (event.target.value === '') {
      setShowSearch(false)
      setSearchTerm('')
    } else {
      setSearchTerm(event.target.value);
      setShowSearch(true)
    }
  };
  return (
    <>
      <div className="row" >
        <div className="col-12">
          <div className='input-group' style={{ display: 'flex' ,width:'30%'}}>
            <input 
              type='text'
              className='form-control fw-bolder mt-1 mb-4 w-25 relative'
              value={searchTerm}
              onChange={handleChange}
            />
            <i style={{padding:'5px 10px',position:'absolute' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-search"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </i>
          </div>

          <div className="card">
            {navigation.state !== "idle" && <Spinner />}
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>نام</th>
                  <th>عملیات</th>
                </tr>
              </thead>
              <tbody>
                {showSearch ?
                  searchResults.map(category =>
                    <CategoryTable category={category} deleteCategory={deleteCategory} />
                  )
                  :
                  data.map((category) =>
                    <CategoryTable category={category} deleteCategory={deleteCategory} />
                  )}
              </tbody>
              {searchTerm !== '' && searchResults.length === 0 && (
                <p className="text-center mt-3">هیچ نتیجه‌ای یافت نشد.</p>
              )}
            </table>
            <div className="card-footer">
              {
                showSearch ? null : <Pagination totalRecords={totalRecords} />
              }

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryList;
