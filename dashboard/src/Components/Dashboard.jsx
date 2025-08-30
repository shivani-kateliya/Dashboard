import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell
} from "recharts";



 const  Dashboard =() => {
  const [users, setUsers] = useState([]);

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



  const totalUsers = users.length;

  

const perDay = users.reduce((acc, u) => {
  const d = new Date(u.createdAt).toISOString().slice(0, 10);
  acc[d] = (acc[d] || 0) + 1;
  return acc;
}, {});

const perDayData = Object.keys(perDay).map(date => ({
  date,
  count: perDay[date]
}));



  const withAvatar = users.filter((u) => u.avatar).length;
  const withoutAvatar = totalUsers - withAvatar;
  const avatarData = [
    { name: "With Avatar", value: withAvatar },
    { name: "Without Avatar", value: withoutAvatar },
  ];


  const recent = [...users].slice(-5);

  return (
    <div className="p-4 space-y-6">
    
      <div className="bg-black p-4 rounded text-center">
        <h2 className="text-gray-600">Total Users</h2>
        <p className="text-2xl font-bold">{totalUsers}</p>
      </div>

   
      <div className="bg-black p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Users Per Day</h3>
        <BarChart width={300} height={200} data={perDayData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" hide />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </div>

    
      <div className="bg-black p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Avatar Distribution</h3>
        <PieChart width={300} height={200}>
          <Pie
            data={avatarData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={70}
            label
          >
            <Cell fill="#3b82f6" />
            <Cell fill="#f97316" />
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

    
      <div className="bg-black p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Recent Users</h3>
        <ul>
          {recent.map((u) => (
            <li key={u.id} className="flex items-center gap-2 mb-2">
              <img
                src={u.avatar}
                alt={u.name}
                className="w-8 h-8 rounded-full"
              />
              <span>{u.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard
