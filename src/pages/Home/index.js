import React from "react";
import AdminDashboard from "../../components/AdminDashboard";
import styles from "./styles.module.scss";
export default function Home() {
  return (
    <AdminDashboard>
      <div className={styles.head}>
        <div>
          <h1>Admin Dashboard</h1>
        </div>
      </div>
    </AdminDashboard>
  );
}
