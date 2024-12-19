import { login } from "@/app/actions/auth";

export default function ButtonActions() {
  return (
    <form action={login}>
      <button
        type="submit"
        className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-black hover:text-white shadow-md transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
      >
        Explore Stats
      </button>
    </form>
  );
}
