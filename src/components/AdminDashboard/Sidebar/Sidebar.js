import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleSidebar } from "../../../store/sidebarSlice";
// for icons
import { MdArrowForwardIos } from "react-icons/md";

import { ImUsers } from "react-icons/im";

// .......

export default function Sidebar() {
  const router = useLocation();
  const route = router.pathname.split("/admin/dashboard/")[1];
  const { expandSidebar: sidebar } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  const handleExpand = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className={`${styles.sidebar} ${sidebar ? styles.opened : ""}`}>
      <div className={styles.sidebar__toggle} onClick={() => handleExpand()}>
        <div
          style={{
            transform: `${sidebar ? "rotate(180deg)" : ""}`,
            transition: "all 0.2s",
          }}
        >
          <MdArrowForwardIos />
        </div>
      </div>
      <div className={styles.sidebar__container}>
        <div className={styles.sidebar__header}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={styles.sidebar__user}>
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_RlT-ytB9A_TQFLKMqVYpdJiiRbckTCThmw&usqp=CAU"
            }
            alt=""
          />
          <div className={styles.show}>
            <span>Welcome back 👋</span>
            <span>Admin</span>
          </div>
        </div>
        <ul className={styles.sidebar__list}>
          <li className={route === "users" ? styles.active : ""}>
            <Link to="/admin/dashboard/users">
              <ImUsers />
              <span className={sidebar ? styles.show : ""}>Users</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
