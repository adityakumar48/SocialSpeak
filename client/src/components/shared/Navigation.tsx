import { Link } from "react-router-dom";

const Navigation = () => {
  const navItems = [
    {
      label: "About",
      path: "/about",
    },
    {
      label: "Features",
      path: "/features",
    },
    {
      label: "How it works?",
      path: "/how-it-works",
    },
    {
      label: "Privacy",
      path: "/privacy",
    },

    {
      label: "Blogs",
      path: "/blogs",
    },
  ];

  return (
    <div>
      <header className="sticky top-0 bg-[#1D1D1D]/65 dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link
                to="/"
                className="block text-violet-600 font-semibold text-xl tracking-wide dark:text-violet-600"
              >
                <span className="sr-only">Home</span>
                Social Speak
              </Link>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-4 text-sm">
                  {navItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.path}
                        className="text-gray-400 transition hover:bg-gray-700 hover:text-white/75 px-2 py-1 rounded-md ease-in-out duration-300 "
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <Link
                  className="rounded-md bg-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow "
                  to="/login"
                >
                  Login
                </Link>

                <div className="hidden sm:flex">
                  <Link
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-violet-600 "
                    to="/register"
                  >
                    Register
                  </Link>
                </div>
              </div>

              <div className="block md:hidden">
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navigation;
