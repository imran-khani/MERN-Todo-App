import { Link } from "react-router-dom";
import HomeIcon from "../components/Home/HomeIcon";
import { Button } from "../components/Button";

const Homepage = () => {
  return (
    <div className="container py-24">
      <h1 className="md:text-heading text-3xl leading-snug font-bold max-w-[400px] md:max-w-[600px] text-center mx-auto">
        Organizing your day activities with Todo Daily
      </h1>
      <Link to="/app/all">
       <Button>Get started</Button>
      </Link>
      <img
        src="/home.png"
        className="object-cover w-auto min-h-[900px]"
        alt="home image"
      />
      <div className="mt-[120px] max-w-screen-lg flex flex-col">
        <h2 className="font-bold text-subheading md:mb-[115px] mb-10 text-center">
          Don't Let Your Day doing nothing
        </h2>
        <div className="flex md:flex-row flex-col justify-between items-center">
          <HomeIcon />
        </div>
      </div>

      <div className="flex md:flex-row flex-col justify-between gap-10 py-24">
        <img src="/home2.webp " alt="img" />
        <div className="flex flex-col">
          <h3 className="text-heading font-bold leading-snug">
            Achieve your target and won your life
          </h3>
          <Link
            to="/app"
            className="bg-Primary text-white px-8 md:py-3 py-2 rounded-md mt-8 block max-w-[200px] text-center"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
