"use client";

import { useEffect, useState } from "react";
import axios from "axios";

// Custom Table Component
const Table = ({ children }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
      {children}
    </table>
  </div>
);

export default function UserList() {
  const [district, setDistrict] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const tamilNaduDistricts = [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri",
    "Dindigul", "Erode", "Kallakurichi", "Kancheepuram", "Karur", "Krishnagiri",
    "Madurai", "Mayiladuthurai", "Nagapattinam", "Kanniyakumari", "Namakkal", "Nilgiris",
    "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivagangai",
    "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli",
    "Tirupattur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore",
    "Viluppuram", "Virudhunagar"
  ];

  useEffect(() => {
    if (!district) return;
    setLoading(true);

    axios
      .get(`http://localhost:5000/api/users?district=${district}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [district]);

  // Function to Download Excel Sheet
  const handleDownloadExcel = async () => {
    if (!district) {
      alert("Please select a district before downloading.");
      return;
    }

    if (users.length === 0) {
      alert(`No registered users found for ${district}.`);
      return;
    }

    try {
      const response = await fetch(`/admin/export?password=ydp2021&district=${district}`);
      if (!response.ok) throw new Error("Failed to download");

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `users_${district}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert("Error downloading file: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Registered Users</h1>

      {/* District Dropdown */}
      <select
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
        className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
      >
        <option value="">Select District</option>
        {tamilNaduDistricts.map((dist, index) => (
          <option key={index} value={dist}>
            {dist}
          </option>
        ))}
      </select>

      {/* Loading Indicator */}
      {loading && <p className="mt-4 text-green-700">Loading users...</p>}

      {/* User Table */}
      {!loading && users.length > 0 && (
        <Table>
          <thead>
            <tr className="bg-green-700 text-white">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Membership ID</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b border-gray-300 hover:bg-gray-100">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.userId}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* No Users Message */}
      {!loading && users.length === 0 && district && (
        <p className="mt-4 text-red-600">No users found for this district.</p>
      )}

      {/* Download Excel Button (Always Visible) */}
          <button
              onClick={() => (window.location.href = "/admin/export")}
              className="mt-6 bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition"
          >
              Download Excel
          </button>

    </div>
  );
}
