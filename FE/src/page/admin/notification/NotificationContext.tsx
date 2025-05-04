// src/context/NotificationContext.tsx
import React, { createContext, useState, useContext } from "react";
import { NotificationRowProps, mockNotifications } from "./mockNotifications";

interface NotificationContextType {
  notifications: NotificationRowProps[];
  markAsRead: (index: number) => void;
  setAllNotifications: React.Dispatch<
    React.SetStateAction<NotificationRowProps[]>
  >;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] =
    useState<NotificationRowProps[]>(mockNotifications);

  const markAsRead = (index: number) => {
    setNotifications((prev) =>
      prev.map((n, i) => (i === index ? { ...n, isNew: false } : n))
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        markAsRead,
        setAllNotifications: setNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error("useNotification must be used within NotificationProvider");
  return context;
};
