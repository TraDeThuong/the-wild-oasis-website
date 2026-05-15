import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const session = await auth();

  return (
    <div className="min-h-[70vh] px-8 py-12">
      <div className="max-w-4xl mx-auto space-y-10">
        
        <div className="bg-primary-900 border border-primary-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-accent-400">
            Welcome back, {session?.user?.name}
          </h2>
          <p className="text-primary-300 mt-2">
            Manage your reservations, update your profile, and review your stays.
          </p>
        </div>
      </div>
    </div>
  );
}