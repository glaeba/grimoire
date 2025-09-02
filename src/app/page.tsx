import { AuthButton } from "@/components/auth-button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to Grimoire</h1>
      <p className="text-xl text-gray-400 mb-8">
        Your AI Study Group Partner
      </p>
      <AuthButton />
    </main>
  );
}