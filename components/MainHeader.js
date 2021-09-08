import { signOut } from "next-auth/client";

export default function MainHeader({ email }) {
  return (
    <div className="flex justify-between py-3 bg-gray-300">
      <span className="p-3">
        Logged in as <b>{email}</b>
      </span>

      <button
        className="underline hover:text-blue-600 p-3"
        onClick={() => signOut({ callbackUrl: `/` })}
      >
        Sign out
      </button>
    </div>
  );
}
