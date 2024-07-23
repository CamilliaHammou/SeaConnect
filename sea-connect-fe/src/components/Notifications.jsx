import React, { useState, useMemo } from 'react';
import { Bell, Search } from 'lucide-react';

const Notifications = ({ readNotifications, unReadNotifications, markAsRead }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUnReadNotifications = useMemo(() => {
    return unReadNotifications.filter(notification =>
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [unReadNotifications, searchTerm]);

  const filteredReadNotifications = useMemo(() => {
    return readNotifications.filter(notification =>
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [readNotifications, searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <Bell className="mr-2" />
        Notifications
      </h2>
      
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search for notifications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>

      <div className="space-y-4">
        {filteredUnReadNotifications.map(notification => (
          <div key={notification.id} className="bg-blue-50 p-4 rounded-lg shadow-md border-l-4 border-blue-500 transition duration-300 hover:shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-blue-800">{notification.title}</h3>
                <p className="text-gray-600 mt-1">{notification.description}</p>
              </div>
              <button
                onClick={() => markAsRead(notification.id)}
                className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Mark as read
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Notifications read</h3>
        {filteredReadNotifications.map(notification => (
          <div key={notification.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 transition duration-300 hover:shadow">
            <h3 className="text-lg font-semibold text-gray-700">{notification.title}</h3>
            <p className="text-gray-500 mt-1">{notification.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;