import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthButtonServer } from "@/components/AuthButtonsServer";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createServerComponentClient({
    cookies
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session === null) {
    redirect("/login")
  }

  const { data: posts } = await supabase.from("posts")
    .select("*, auth.users(email)");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hola Twitter
      <AuthButtonServer />
      <pre>{JSON.stringify(posts, null, 2)}</pre>
      {posts?.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </main>
  );
}
