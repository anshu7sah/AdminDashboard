import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import Sidebar from "./Sidebar/Sidebar";
export default function Layout({ children }) {
  const { expandSidebar: sidebar } = useSelector((state) => state.sidebar);

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div
        className={styles.layout__main}
        style={{ marginLeft: `${sidebar ? "280px" : "80px"}` }}
      >
        {children}
      </div>
    </div>
  );
}
