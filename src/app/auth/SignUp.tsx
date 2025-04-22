import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import { siteConfig } from "@/config/site";
import { words } from "@/config/text";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";

interface FormData {
  username: string;
  password: string;
  email: string;
  firstname?: string;
  lastname?: string;
}

const SignUp = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  // ✅ Input changes update state
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // clear error on typing
  };

  // 🚀 Sign-up request
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(siteConfig.links.signup, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      navigate("/auth/signin");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex justify-center items-center px-4 py-10">
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
                Create Account
              </CardTitle>
              <CardDescription className="text-center">
                Fill in your details to register
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-2">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder={words.firstname}
                    value={formData.firstname}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder={words.lastname}
                    value={formData.lastname}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder={words.username}
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder={words.email}
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid gap-2 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type={isVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder={words.password}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute right-3 top-8"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? <EyeClosed /> : <Eye />}
                  </Button>
                </div>

                <Button type="submit" className="w-full bg-blue-600 text-white">
                  {words.signup}
                </Button>

                <div className="text-center text-sm mt-2">
                  Already have an account?{" "}
                  <a
                    href="/auth/signin"
                    className="underline underline-offset-4 text-blue-600"
                  >
                    Sign in
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

export default SignUp;
