"use client";

import { FC, useState } from "react";
import { FaBell } from "react-icons/fa";

interface Props {}

const Notifications: FC<Props> = (props): JSX.Element => {
  return (
    <button>
      <FaBell />
    </button>
  );
};

export default Notifications;
