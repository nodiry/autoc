import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import { siteConfig } from "@/config/site";
import { words } from "@/config/text";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";

interface FormData {
  password: string;
  email: string;
}

const SignIn = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    password: "",
    email: "",
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  // ✅ Handle Input Change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // clear error when typing
  };

  // 🚀 Handle Sign-In Submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(siteConfig.links.signin, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/cars");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex justify-center items-center px-4 py-10 mt-24 mb-40">
        <div className="w-full max-w-md">
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}

          <Card className="w-full shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                <img
                  src="/logo.png"
                  className="mx-auto mb-2"
                  alt="Logo"
                  width={100}
                  height={100}
                />
                Dream Auto
              </CardTitle>
              <CardDescription className="text-center">
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>

                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={isVisible ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder={words.password}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? <EyeClosed /> : <Eye />}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="default"
                    className="w-full bg-blue-600"
                  >
                    Login
                  </Button>
                </div>

                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a
                    href="/auth/signup"
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignIn;
