import React, { useEffect, useState } from "react";
import AdminDashboard from "../../components/AdminDashboard";
import Table from "../../components/table";
import { useGetUsersQuery } from "../../store/users";
import Pagination from "../../components/Pagination";
import { CiSearch } from "react-icons/ci";
import "./styles.module.scss";
import { MdDelete } from "react-icons/md";
// import { useNavigate, useLocation } from "react-router-dom";

export default function Users() {
  const { data: users, isFetching } = useGetUsersQuery();
  const [updatedData, setUpdatedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedUser, setCheckedUser] = useState([]);
  const [filtered, setFiltered] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [paginatedSearch, setPaginatedSearch] = useState(null);
  const resultPerPage = 10;
  let productsCount = !isFetching
    ? searchResults
      ? searchResults.length
      : updatedData
      ? updatedData.length
      : users.length
    : "";

  const page = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (!isFetching) {
      let data = updatedData ? [...updatedData] : [...users];
      let newData = data.slice(
        resultPerPage * (currentPage - 1),
        resultPerPage * currentPage
      );
      setFiltered(newData);
    }
  }, [currentPage, isFetching, updatedData, users]);

  useEffect(() => {
    if (!isFetching) {
      const usersData = updatedData ? [...updatedData] : [...users];
      const foundUser = usersData.filter((user) => {
        return Object.values(user).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(search.toLowerCase())
        );
      });
      setSearchResults(
        (p) => foundUser,
        () => console.log("anshu")
      );

      setCurrentPage(1);
      const startIndex = resultPerPage * (currentPage - 1);
      const endIndex = startIndex + resultPerPage;
      const paginatedResults = searchResults
        ? searchResults.slice(startIndex, endIndex)
        : null;
      setPaginatedSearch((p) => paginatedResults);
    }
    console.log(searchResults);
  }, [search, users, isFetching, updatedData, currentPage, searchResults]);

  const onSave = ({ name, email, id, role }) => {
    let newUser = [...users].map((e) => {
      if (e.id === id) {
        return {
          name,
          email,
          id,
          role,
        };
      }
      return e;
    });
    newUser.sort((a, b) => a.id - b.id);
    setUpdatedData(newUser);
  };

  const onDelete = (arr) => {
    let d = updatedData ? [...updatedData] : [...users];

    let tempArr = [];

    let j = 0;
    arr.sort((a, b) => a.id - b.id);
    for (let i = 0; i < d.length; i++) {
      if (arr[j] !== d[i].id) {
        tempArr.push(d[i]);
      } else {
        j++;
      }
    }
    setUpdatedData((prevData) => {
      return tempArr;
    });
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
  };
  const allSelectedDeleteHandler = () => {
    onDelete(checkedUser);
  };

  return (
    <AdminDashboard>
      {!isFetching && (
        <>
          <header>
            <div>
              {!isFetching && (
                <p>
                  {checkedUser.length} of{" "}
                  {updatedData ? updatedData.length : users.length} row(s)
                  selected
                </p>
              )}
              <form onSubmit={searchSubmitHandler}>
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button>
                  <CiSearch />
                </button>
              </form>
            </div>
            <MdDelete onClick={() => allSelectedDeleteHandler()} />
          </header>
          <Table
            userData={paginatedSearch || filtered || updatedData || users}
            allData={searchResults || updatedData || users}
            isFetching={isFetching}
            onSave={onSave}
            onDelete={onDelete}
            checkedUser={checkedUser}
            setCheckedUser={setCheckedUser}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <div>
              Page {currentPage} of {Math.ceil(productsCount / resultPerPage)}
            </div>
            <Pagination
              page={page}
              productsCount={productsCount}
              resultPerPage={resultPerPage}
            />
          </div>
        </>
      )}
    </AdminDashboard>
  );
}
