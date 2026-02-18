import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import '../admin-bg.css';

function AdminDashboard() {
  //State to store bookings data
  const [bookings, setBookings] = useState([]);
  //State to track loading status
  const [loading, setLoading] = useState(true);
  //State to store total website visits
  const [visits, setVisits] = useState(0);
  //State to store the selected date from the calendar
  const [selectedDate, setSelectedDate] = useState(null);
  //State to store submitted reviews
  const [reviews, setReviews] = useState([]);

  //Change tab title for page
  useEffect(() => {
    document.title = "Wash&WaxWorks | Admin"
  }, []);

  //Fetch bookings data from the API when the component mounts
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/bookings`)
      .then(res => res.json())
      .then(data => {
        setBookings(data); //Update bookings state
        setLoading(false); //Set loading to false
      })
      .catch(err => {
        console.error('Error fetching bookings:', err);
        setLoading(false);
      });
  }, []);

  //Track website visits and fetch visit count
  useEffect(() => {
    if (!localStorage.getItem("visitedWashWax")) {
      //If the user hasn't visited before, track the visit
      fetch(`${process.env.REACT_APP_API_URL}/api/visit`, { method: "POST" })
        .then(res => res.json())
        .then(() => {
          localStorage.setItem("visitedWashWax", "true"); //Mark as visited
          fetch(`${process.env.REACT_APP_API_URL}/api/visit`)
            .then(res => res.json())
            .then(data => setVisits(data.count)) //Update visit count
            .catch(err => console.error("Failed to fetch visit count", err));
        })
        .catch(err => console.error("Failed to track visit", err));
    }
    else {
      //Fetch visit count if already visited
      fetch(`${process.env.REACT_APP_API_URL}/api/visit`)
        .then(res => res.json())
        .then(data => setVisits(data.count)) //Update visit count
        .catch(err => console.error("Failed to track visit", err));
    }
  }, []);

  //Fetch reviews data from the API when the component mounts
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/reviews`)
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error('Error fetching reviews:', err));
  }, []);

  return (
    //Main section container with gradient background and padding
    <section className="dashboard-gradient min-h-screen text-white p-8">
      {/* Dashboard title */}
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Total website visits display */}
      <div className="bg-zinc-800 text-center p-4 rounded-lg shadow mb-6 max-w-xs mx-auto border border-purple-700">
        <p className="text-purple-400 text-sm">Total Website Visits</p>
        <p className="text-3xl font-bold text-white">{visits}</p>
      </div>

      {/* Bookings table */}
      {loading ? (
        <p className="text-center text-gray-400">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-400">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-xl">
          <table className="w-full table-auto border-collapse bg-zinc-900 text-sm rounded-xl overflow-hidden">
            <thead className="bg-purple-800 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Service</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr
                  key={i} //Unique key for each booking
                  className="hover:bg-purple-900/20 hover:scale-[1.01] transition-all duration-300 even:bg-zinc-900 odd:bg-zinc-950"
                >
                  <td className="p-3">{b.name}</td>
                  <td className="p-3">{b.email}</td>
                  <td className="p-3">{b.phone}</td>
                  <td className="p-3">{b.service}</td>
                  <td className="p-3">{b.date}</td>
                  <td className="p-3">{b.time}</td>
                  <td className="p-3">{b.location}</td>
                  <td className="p-3">{b.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Booking calendar */}
      <div className="max-w-md mx-auto mt-10 p-6 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-400">Booking Calendar</h2>
        <Calendar
          onClickDay={(value) => setSelectedDate(format(value, 'yyyy-MM-dd'))} //Handle date selection
          tileContent={({ date }) => {
            const formatted = format(date, 'yyyy-MM-dd');
            const count = bookings.filter((b) => b.date === formatted).length;
            return count > 0 ? (
              <span className="text-xs text-purple-500 block text-center mt-1">📌 {count}</span>
            ) : null;
          }}
          tileClassName={({ date }) => {
            const formatted = format(date, 'yyyy-MM-dd');
            return bookings.some((b) => b.date === formatted)
              ? 'bg-purple-800 text-purple-900 rounded-xl'
              : 'hover:bg-zinc-200 hover:scale-105 transition-all';
          }}
          className="rounded-lg p-4 bg-white text-black"
        />

        {/* Display bookings for the selected date */}
        {selectedDate && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">
              Bookings on {selectedDate}
            </h3>
            <ul className="space-y-2">
              {bookings
                .filter((b) => b.date === selectedDate)
                .map((b, i) => (
                  <li
                    key={i} //Unique key for each booking
                    className="bg-zinc-800 p-4 rounded-lg shadow hover:bg-purple-800/20 transition-all duration-300"
                  >
                    <p><strong>Name:</strong> {b.name}</p>
                    <p><strong>Time:</strong> {b.time}</p>
                    <p><strong>Service:</strong> {b.service}</p>
                    <p><strong>Location:</strong> {b.location}</p>
                    <p><strong>Phone:</strong> {b.phone}</p>
                  </li>
                ))}
              {bookings.filter((b) => b.date === selectedDate).length === 0 && (
                <p className="text-gray-400">No bookings for this day.</p>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Submitted reviews section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-purple-400 text-center">Submitted Reviews</h2>
        <ul className="space-y-3">
          {reviews.map((r, i) => (
            <li key={i} className="bg-zinc-800 p-4 rounded-lg shadow">
              <p><strong>{r.name}:</strong> {r.review}</p>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                {/*Feature Button */}
                {!r.featured ? (
                  <button
                    className="mt-2 bg-purple-700 hover:bg-purple-900 px-4 py-1 rounded-md text-sm transition"
                    onClick={() => {
                      fetch(`${process.env.REACT_APP_API_URL}/api/reviews/${r.id}/feature`, {
                        method: 'PUT',
                      })
                        .then(res => res.json())
                        .then((updated) => {
                          setReviews(prev =>
                            prev.map(rv => rv.id === updated.id ? updated : rv)
                          );
                        })
                        .catch(() => alert("Failed to feature review"));
                    }}
                  >
                    ➕ Add to Homepage
                  </button>
                ) : (
                  <p className="text-green-400 mt-2 text-sm">✅ Featured</p>
                )}
                {/* Delete Button */}
                <button
                  className="mt-2 bg-red-600 hover:bg-red-800 px-4 py-1 rounded-md text-sm transition"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this review?')) {
                      fetch(`${process.env.REACT_APP_API_URL}/api/review/${r.id}`, {
                        method: 'DELETE',
                      })
                        .then(res => res.json())
                        .then(() => {
                          setReviews(prev => prev.filter(rv => rv.id !== r.id));
                        })
                        .catch(() => alert('Failed to delete review'));
                    }
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default AdminDashboard;