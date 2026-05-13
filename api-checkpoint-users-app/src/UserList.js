import axios from "axios";
import { useEffect, useState } from "react";

const USERS_API_URL = "https://jsonplaceholder.typicode.com/users";

function UserList() {
  const [listOfUser, setListOfUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get(USERS_API_URL)
      .then((response) => {
        setListOfUser(response.data);
        setErrorMessage("");
      })
      .catch(() => {
        setErrorMessage("Unable to load users. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p className={styles.status}>Loading users...</p>;
  }

  if (errorMessage) {
    return <p className={`${styles.status} ${styles.error}`}>{errorMessage}</p>;
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>User list</h2>
          <p className={styles.text}>
            Showing {listOfUser.length} users from JSONPlaceholder.
          </p>
        </div>
        <span className={styles.badge}>{listOfUser.length} users</span>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.tableHeader}>ID</th>
              <th className={styles.tableHeader}>Name</th>
              <th className={styles.tableHeader}>Username</th>
              <th className={styles.tableHeader}>Email</th>
              <th className={styles.tableHeader}>Phone</th>
              <th className={styles.tableHeader}>Website</th>
              <th className={styles.tableHeader}>Company</th>
              <th className={styles.tableHeader}>City</th>
            </tr>
          </thead>
          <tbody>
            {listOfUser.map((user) => (
              <tr className={styles.tableRow} key={user.id}>
                <td className={styles.idCell}>#{user.id}</td>
                <td className={styles.nameCell}>{user.name}</td>
                <td className={styles.tableCell}>@{user.username}</td>
                <td className={styles.tableCell}>{user.email}</td>
                <td className={styles.tableCell}>{user.phone}</td>
                <td className={styles.tableCell}>{user.website}</td>
                <td className={styles.tableCell}>{user.company.name}</td>
                <td className={styles.tableCell}>{user.address.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const styles = {
  wrapper: "rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200",
  header: "mb-5 flex flex-wrap items-start justify-between gap-4",
  title: "text-2xl font-bold text-slate-900",
  text: "mt-1 text-sm text-slate-600",
  badge:
    "inline-flex items-center rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-950",
  tableWrap:
    "overflow-x-auto rounded-3xl border border-slate-200 bg-slate-50",
  table: "min-w-[980px] w-full border-collapse text-left text-sm",
  tableHead: "bg-slate-900 text-white",
  tableHeader:
    "px-4 py-4 text-xs font-semibold uppercase tracking-[0.16em]",
  tableRow: "border-t border-slate-200 bg-white transition hover:bg-amber-50",
  tableCell: "px-4 py-4 align-top font-medium text-slate-700",
  idCell: "px-4 py-4 align-top",
  nameCell: "px-4 py-4 align-top font-bold text-slate-900",
  status:
    "rounded-3xl bg-white p-6 text-center text-sm font-semibold text-slate-700 shadow-lg ring-1 ring-slate-200",
  error: "text-rose-700",
};

export default UserList;
