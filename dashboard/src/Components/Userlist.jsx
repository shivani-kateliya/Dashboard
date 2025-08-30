import { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://6874ce63dd06792b9c954fc7.mockapi.io/api/v1/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);


  const sortedUsers = [...users].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "date") return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  });


  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User List</h2>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border px-3 py-2 rounded mb-4"
      >
        <option value="name">Sort by Name</option>
        <option value="date">Sort by Date</option>
      </select>

    
      <table className="min-w-full border border-gray-300">
        <thead className="bg-green-500">
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Gender</th>
            <th className="px-4 py-2 border">Location</th>
            <th className="px-4 py-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2 border">{user.name}</td>
              <td className="px-4 py-2 border">{user.gender}</td>
              <td className="px-4 py-2 border">{user.location}</td>
              <td className="px-4 py-2 border">{user.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

   
      <div className="flex items-center justify-center mt-4 space-x-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
