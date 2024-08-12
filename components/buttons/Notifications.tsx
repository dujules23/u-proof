"use client";

import { FC, useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";

interface Notification {
  id: string;
  message: string;
  status: "approved" | "not_approved" | "viewed"; // or any other statuses you need
}

interface Props {}

const Notifications: FC<Props> = (): JSX.Element => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/notifications");
      const data = await response.json();
      setNotifications(data.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadNotifications = notifications.filter(
    (notification) => notification.status !== "viewed"
  );

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    markNotificationsAsViewed(); // Optionally mark notifications as viewed when the modal opens
  };

  const markNotificationsAsViewed = () => {
    // Mark all notifications as viewed in your backend
    // Then update the notifications state
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        status: "viewed",
      }))
    );
  };

  return (
    <div className="relative">
      <button onClick={toggleModal} className="relative">
        <FaBell className="text-xxl" />
        {unreadNotifications.length > 0 && (
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full" />
        )}
      </button>
      {isModalOpen && (
        <div className="text-black absolute top-12 right-0 w-72 bg-gray-400 dark:bg-primary-light shadow-lg rounded-lg z-50 p-4">
          <h4 className="text-lg font-semibold mb-2">Notifications</h4>
          <ul className="space-y-2">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <li key={notification.id} className="text-sm">
                  {notification.message} -{" "}
                  <strong className="capitalize">{notification.status}</strong>
                </li>
              ))
            ) : (
              <p className="text-sm">No notifications</p>
            )}
          </ul>
          <button
            onClick={toggleModal}
            className="mt-4 text-blue-500 hover:text-blue-600"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
