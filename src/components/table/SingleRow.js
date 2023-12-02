import React, { useState } from "react";
import styles from "./styles.module.scss";
import { MdDelete } from "react-icons/md";

export default function SingleRow({
  user,
  setCheckedUser,
  checked,
  onSave,
  onDelete,
}) {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  const saveHandler = () => {
    onSave({ name, email, role, id: user.id });
    setEdit(false);
  };
  const deleteHandler = (id) => {
    onDelete([id]);
  };
  const cancelHandler = () => {
    setEdit(false);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
  };

  return (
    <tr className={checked ? `${styles.active}` : ""}>
      <td>
        <input
          type="checkbox"
          onClick={() =>
            setCheckedUser((arr) => {
              let newarr;
              if (checked) {
                newarr = arr.filter((e) => e !== user.id);
              } else {
                newarr = [...arr, user.id];
              }
              return newarr;
            })
          }
          checked={checked}
        />
      </td>
      <td>
        <input
          className={`${edit ? styles.editable : ""}`}
          type="text"
          value={name}
          disabled={!edit}
          onChange={(e) => setName(e.target.value)}
        />
      </td>
      <td>
        <input
          className={`${edit ? styles.editable : ""}`}
          type="text"
          value={email}
          disabled={!edit}
          onChange={(e) => setEmail(e.target.value)}
        />
      </td>
      <td>
        <input
          className={`${edit ? styles.editable : ""}`}
          type="text"
          value={role}
          disabled={!edit}
          onChange={(e) => setRole(e.target.value)}
        />
      </td>
      <td>
        {edit && <button onClick={() => saveHandler()}>Save</button>}
        {edit && <button onClick={() => cancelHandler()}>Cancel</button>}
        {!edit && <button onClick={() => setEdit(true)}>Edit</button>}
        <MdDelete onClick={() => deleteHandler(user.id)} />
      </td>
    </tr>
  );
}
