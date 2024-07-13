import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  username: z.string().nonempty("Username required"),
  password: z.string().nonempty("Password required"),
});

type LoginSchema = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const { handleLogin, user } = useAuth();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data: LoginSchema) => {
    await handleLogin(data);
  });

  useEffect(() => {
    if (user !== null) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <main className="container px-4 py-44 my-auto flex flex-col justify-center items-center max-w-[400px]">
      <Form {...form}>
        <form onSubmit={onSubmit} className="w-full max-w-[400px]">
          <Card>
            <CardHeader>
              <CardTitle>Please Login!</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <FormField
                control={control}
                name="username"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          className={errors.username ? "border-red-500" : ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          className={errors.password ? "border-red-500" : ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </CardContent>
            <CardFooter>
              <div className="flex flex-col space-y-4 w-full">
                <Button type="submit">Login</Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
};

export default LoginForm;
