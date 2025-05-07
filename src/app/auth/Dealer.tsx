import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/NavBar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/config/site";
import { words } from "@/config/text";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const DealerAuth = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const url =
      mode === "signin"
        ? siteConfig.links.authdealer + "signin"
        : siteConfig.links.authdealer + "signup";

    try {
      // Send POST request using axios
      const response = await axios.post(url, form, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // if you're dealing with cookies/session
      });

      const data = response.data;

      if (mode === "signin") {
        if (data.company)
          localStorage.setItem("org", JSON.stringify(data.company));
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/workshop");
      } else {
        window.location.reload();
      }
    } catch (err: any) {
      // Axios errors are slightly different from fetch
      if (err.response) {
        setError(err.response.data.message || "Server responded with error");
      } else if (err.request) {
        setError("No response from server");
      } else {
        setError(err.message || "Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex justify-center items-center py-12 mb-24">
        <div className="w-full max-w-md">
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}

          <Card className="shadow-md items-center">
            <Tabs
              value={mode}
              onValueChange={(val) => setMode(val as "signin" | "signup")}
              className="w-full"
            >
              <TabsList className="flex flex-row w-10/12 mx-auto justify-center">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signup">
                <CardHeader>
                  <CardTitle className="text-center">
                    Create Dealer Account
                  </CardTitle>
                  <CardDescription className="text-center">
                    Fill your details to register
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4 ">
                    <div>
                      <Label htmlFor="firstname">First Name</Label>
                      <Input
                        name="firstname"
                        value={form.firstname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastname">Last Name</Label>
                      <Input
                        name="lastname"
                        value={form.lastname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="relative">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        name="password"
                        type={isVisible ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        className="absolute top-4 right-2"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeClosed size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </Button>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        words.signup
                      )}
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>

              <TabsContent value="signin">
                <CardHeader>
                  <CardTitle className="text-center">Welcome Back</CardTitle>
                  <CardDescription className="text-center">
                    Login to your dealer account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="relative">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        name="password"
                        type={isVisible ? "text" : "password"}
                        value={form.password}
                        onChange={handleChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        className="absolute top-8 right-2"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeClosed size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </Button>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DealerAuth;
