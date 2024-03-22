import { Link } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

const Home = () => {
  const Avatars = [
    {
      id: 1,
      img: "https://github.com/shadcn.png",
    },
    {
      id: 2,
      img: "https://github.com/shadcn.png",
    },
    {
      id: 3,
      img: "https://github.com/shadcn.png",
    },
    {
      id: 4,
      img: "https://github.com/shadcn.png",
    },
    {
      id: 5,
      img: "https://github.com/shadcn.png",
    },
  ];

  return (
    <section className="backgroundCheck text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-[85vh] lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-purple-500 to-purple-600 bg-clip-text lg:text-6xl text-4xl font-extrabold text-transparent sm:text-5xl">
            EMPOWER YOUR VOICE,
            <span className="sm:block"> BUILD COMMUNITY </span>
          </h1>

          <p className="mx-auto mt-4 text-gray-400 max-w-xl sm:text-xl/relaxed">
            Social Speak: Your digital hub for vibrant conversations and
            meaningful connections. Join us to engage, explore, and empower your
            voice in a dynamic online community.
          </p>
          <div className="flex ">
            <div className="flex items-center justify-center w-[75%] pt-2 ">
              <div className="relative h-[5vh]">
                {Avatars.map((avatar, i) => (
                  <Avatar
                    style={{ left: `${i * 30}px` }}
                    className={`absolute border-2  border-green-500  z-${avatar.id} `}
                    key={avatar.id}
                  >
                    <AvatarImage src={avatar.img} />
                    <AvatarFallback>PP</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded border border-purple-600 bg-purple-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              to="/register"
            >
              Get Started
            </Link>

            <Link
              className="block w-full rounded border border-purple-600 px-12 py-3 text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:ring active:bg-purple-500 sm:w-auto"
              to="/how-it-works"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
