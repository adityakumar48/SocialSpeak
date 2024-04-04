import { setAuth } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hook";
import axios from "axios";
import { useEffect, useState } from "react";

const useLoadingWithRefresh = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/refresh`,
          {
            withCredentials: true,
          }
        );

        dispatch(setAuth(data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);

  return { loading };
};

export default useLoadingWithRefresh;
