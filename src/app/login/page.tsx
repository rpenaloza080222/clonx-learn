import { AuthButtonServer } from "@/components/AuthButtonsServer";

export default function Login() {
  return <>
    <section className="grid place-content-center min-h-screen">
        <h1 className="text-3xl font-bold">RotterInicia sesión en Rotter</h1>
        <AuthButtonServer />
    </section>
  </>;
}
