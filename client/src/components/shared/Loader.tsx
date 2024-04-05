import { Card } from "../ui/card";

const Loader = ({
  message = "Loading, Please Wait...",
}: {
  message?: string;
}) => {
  return (
    <div>
      <div className="w-[30%] pt-20 mx-auto h-screen">
        <Card className="bg-[#1D1D1D] flex items-center justify-center flex-col gap-4 border-[#1D1D1D]/75 py-16 text-white">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-violet-500 motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          <div className="text-gray-300 ">{message}</div>
        </Card>
      </div>
    </div>
  );
};

export default Loader;
