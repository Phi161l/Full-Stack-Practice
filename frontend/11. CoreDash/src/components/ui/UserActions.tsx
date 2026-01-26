"use client";

import { useState } from "react";
import { changeRole, deleteUser } from "@/app/dashboard/users/actions";
import ConfirmModal from "./ConfirmModal";

export default function UserActions({ user }) {
  const [modelOpen, setModelOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  function handleDelete(id: string) {
    setModelOpen(true);
    setSelectedUser(id);
  }

  async function confirmDelete() {
    if (selectedUser) {
      await deleteUser(selectedUser);
    }

    setModelOpen(false)
    setSelectedUser(null)
  }

  return (
    <>
      {user.role === "user" && (
        <>
          <button onClick={() => changeRole(user.id, "admin")}>
            Make Admin
          </button>

          <button onClick={() => handleDelete(user.id)}> Delete </button>
        </>
      )}

      <ConfirmModal
        open={modelOpen}
        message="Are you sure you want to delete this user?"
        onConfirm={confirmDelete}
        onCancel={() => setModelOpen(false)}
      />
    </>
  );
}
