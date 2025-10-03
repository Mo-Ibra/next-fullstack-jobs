import { signOut } from "next-auth/react";

export function SignOut() {
  return (
    <button
      className="text-sm text-gray-600 hover:text-gray-900"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign Out
    </button>
  );
}
