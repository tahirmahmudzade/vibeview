import { login } from "@/app/actions";

export default function ButtonActions() {
  return (
    <form action={login}>
      <button
        type="submit"
        className="rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600"
      >
        Explore Stats
      </button>
    </form>
  );
}
