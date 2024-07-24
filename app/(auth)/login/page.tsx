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
import NavBar from "@/components/auth/NavBar";

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
            <form action={login}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-2">

                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-x-4 sm:space-y-0">
                    <Label htmlFor="username">Username:</Label>
                    <Input id="username" name="username" placeholder="your_username" className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50" type="text" />
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-x-4 sm:space-y-0">
                    <Label htmlFor="password">Password:</Label>
                    <Input id="password" name="password" placeholder="*********" className="rounded-xl focus:border-2 focus:border-orange placeholder:text-black/50" type="password" />
                  </div>

                  <div className="w-full flex items-center justify-center">
                    <Button className="bg-orange hover:bg-orange/80 text-white rounded-full w-fit px-4 sm:px-8" type="submit">Login &rarr;</Button>
                  </div>
                  
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Login