import "./styles.module.scss";
import SingleRow from "./SingleRow";
import { useEffect, useState } from "react";

export default function Table({
  userData,
  isFetching,
  onSave,
  onDelete,
  checkedUser,
  setCheckedUser,
}) {
  const [allUser, setAllUser] = useState([]);
  useEffect(() => {
    setAllUser(userData);
  }, [userData]);
  const allCheckHandler = () => {
    if (checkedUser.length === allUser.length) {
      setCheckedUser([]);
    } else {
      setCheckedUser((e) => {
        return allUser.map((user) => user.id);
      });
    }
  };

  return (
    <>
      <table>
        <tr>
          <th>
            <input
              type="checkbox"
              onClick={() => allCheckHandler()}
              checked={checkedUser.length === allUser.length}
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
        {isFetching ? (
          <h1>Loading</h1>
        ) : (
          <>
            {allUser.map((user) => (
              <SingleRow
                key={user.id}
                user={user}
                checked={checkedUser.find((e) => e === user.id)}
                setCheckedUser={setCheckedUser}
                onSave={onSave}
                onDelete={onDelete}
              />
            ))}
          </>
        )}
      </table>
    </>
  );
}
