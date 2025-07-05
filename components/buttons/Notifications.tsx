"use client";

import { useRouter } from "next/navigation";
import { FC, useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";

interface Notification {
  _id?: string;
  message?: string;
  messageId?: string;
  status?: "approved" | "not_approved" | "viewed" | "request-edit";
}

interface Props {}

const Notifications: FC<Notification> = (): JSX.Element => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/notifications", {
        cache: "no-store",
        next: { revalidate: 0 },
      });
      const data = await response.json();
      // console.log("Fetched notifications:", data.notifications);
      setNotifications(data.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    const { _id, messageId } = notification;

    // console.log("Handling notification click for ID:", _id);
    if (!_id) {
      console.error("Notification ID is missing");
      return;
    }

    try {
      // Optionally mark the notification as viewed before deletion
      // await markNotificationAsViewed(id);

      // Delete the notification
      // console.log("Deleting notification with ID:", _id);

      const response = await fetch("/api/notifications/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(_id),
      });

      // console.log(response.body);

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Failed to delete notification:", errorDetails);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // If successful, remove the notification from the state
      setNotifications((prev) => prev.filter((notif) => notif._id !== _id));

      // Route to the message page

      router.push(`/messages/${messageId}`);
    } catch (error) {
      console.error("Error handling notification click", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    fetchNotifications();

    // const interval = setInterval(fetchNotifications, 60000); // Fetch every 60 seconds

    // return () => clearInterval(interval); // Cleanup on unmount
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
    <div>
      <button
        id="notification-button"
        onClick={toggleModal}
        className="relative items-center"
        title="notification-button"
      >
        {/* Desktop View */}
        <div className="relative hidden md:block">
          <FaBell className="text-xxl" />
          {unreadNotifications.length > 0 && (
            <span
              id="notification-indicator"
              className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"
            />
          )}
        </div>

        {/* Mobile View */}
        <span className="md:hidden text-primary-light flex items-center">
          Notifications
          {unreadNotifications.length > 0 && (
            <span className="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
              {unreadNotifications.length}
            </span>
          )}
        </span>
      </button>
      {isModalOpen && (
        <div
          id="notification-modal"
          className="text-black absolute top-12 right-0 w-72 bg-gray-400 dark:bg-primary-light shadow-lg rounded-lg z-50 p-4"
        >
          <h4 className="text-lg font-semibold mb-2">Notifications</h4>
          <ul id="notification-list" className="space-y-2">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <li
                  onClick={() => handleNotificationClick(notification)}
                  id="notification"
                  key={notification._id}
                  className="text-sm cursor-pointer"
                >
                  {notification.message} -{" "}
                  <strong className="capitalize">
                    {notification.status?.replace("_", " ")}
                  </strong>
                </li>
              ))
            ) : (
              <p className="text-sm">No notifications</p>
            )}
          </ul>
          <button
            id="notification-close"
            onClick={toggleModal}
            className="mt-4 text-blue-500 hover:text-blue-600"
            title="Close Notifications"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
