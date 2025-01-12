import Categories from "./Categories";
import Itenaries from "./Itenaries";

const Home = () => {
  return (
    <>
      {/* Center Container for Categories */}
      <div className="flex flex-col items-center justify-center bg-[#E2D2B8] p-6">
        <Categories />
      </div>

      {/* Container for Itenaries */}
      <div className="bg-[#E2D2B8] p-6">
        <Itenaries />
      </div>
    </>
  );
};

export default Home;
