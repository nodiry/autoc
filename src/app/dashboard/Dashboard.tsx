import Footer from "@/components/shared/Footer";
import NavBar from "@/components/shared/NavBar";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center w-screen">
      <NavBar />
      <div className=" flex flex-col items-center h-screen">
      <h1 className="mt-24 text-2xl font-semibold">This is a dashboard!</h1>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
