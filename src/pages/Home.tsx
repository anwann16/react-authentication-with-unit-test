import { useAuth } from "@/context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const name = user?.firstName + " " + user?.lastName;

  return (
    <section className="container flex justify-center mt-10">
      <h1 className="text-2xl font-bold">Welcome back, {name}!</h1>
    </section>
  );
};

export default Home;
