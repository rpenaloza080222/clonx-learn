"use client";
import {
  type Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Button } from "../Button";
import { GitHubIcon } from "../Icons";
import { useRouter } from "next/navigation";

export const AuthButtons = ({ session }: { session: Session | null }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
      <div className="flex flex-row gap-4">
        {!session && (
          <Button onClick={handleSignIn}>
            <>
              <GitHubIcon></GitHubIcon>
              Iniciar sesión con GitHub
            </>
          </Button>
        )}
        {session && (
          <Button
            onClick={handleSignOut}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
          >
            <>Cerrar sesión</>
          </Button>
        )}
      </div>
    </>
  );
};
