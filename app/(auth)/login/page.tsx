import Image from "next/image";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login, getUserByUserId } from "@/action/user";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import LoginForm from "@/components/form/LoginForm";

const Login = async () => {
  const session = await getSession()
  const user = session?.user


  if (user) {
    redirect('/')
  }

  return (
    <>
      <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center">
        <Card className="w-full mx-[10vw] max-w-[500px] rounded-xl bg-light-blue text-blue shadow-orange/50 shadow-2xl">
          <CardHeader>
            <CardTitle>Login!</CardTitle>
            <CardDescription>Please Login to Continue</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Login

function useForm(login: (formData: FormData) => Promise<unknown>, arg1: null): [any, any] {
  throw new Error("Function not implemented.");
}
