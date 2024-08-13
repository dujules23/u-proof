"use client";

import { FC, useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";

interface Notification {
  id: string;
  message: string;
  status: "approved" | "not_approved" | "viewed"; // or any other statuses you need
}

interface Props {}

const Notifications: FC<Notification> = ({ id }): JSX.Element => {
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

  console.log(id);

  const handleNotificationClick = async (id: string) => {
    // Route to the message page
    // router.push(`/message/${id}`);

    // Optionally mark the notification as viewed before deletion
    // await markNotificationAsViewed(id);

    // Delete the notification
    try {
      console.log(id);
      await deleteNotification(id);
    } catch (error) {
      console.error("Error handling notification click", error);
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

  const deleteNotification = async (id: string) => {
    try {
      console.log("Deleting notification with ID:", id);

      // Delete the notification in the backend
      const response = await fetch("/api/notifications/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }), // Make sure this `id` is correctly passed
      });

      // Log the response for debugging
      const responseData = await response.json();
      console.log("Response data:", responseData);

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to delete notification");
      }

      // Update the state immediately for better UX
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );

      fetchNotifications();
    } catch (error) {
      console.error("Error deleting notification:", error);

      fetchNotifications();
    }
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
                <li
                  onClick={() => handleNotificationClick(notification.id)}
                  key={notification.id}
                  className="text-sm cursor-pointer"
                >
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
