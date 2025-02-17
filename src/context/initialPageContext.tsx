import { initialPageShow } from "@/api/initialPage";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface InitialContextType {
  initialShowPageStatus: InitialPageShowType;
}

type InitialPageShowType = {
  [key: string]: boolean;
};

const InitialPageContext = createContext<InitialContextType>({
  initialShowPageStatus: {
    net_sentiment_page: false,
    retail_sentiment_page: false,
    weight_oi_page: false,
  },
});

const InitialPageProvider = ({ children }: { children: ReactNode }) => {
  const [initialShowPageStatus, setInitialShowPageStatus] =
    useState<InitialPageShowType>({
      net_sentiment_page: false,
      retail_sentiment_page: false,
      weight_oi_page: false,
    });

  const fetchInitialShowPage = async () => {
    try {
      const response = await initialPageShow();
      const data = response.data;
      setInitialShowPageStatus((prev) => ({
        ...prev,
        net_sentiment_page: data.net_sentiment_page,
        retail_sentiment_page: data.retail_sentiment_page,
        weight_oi_page: data.weight_oi_page,
      }));
    } catch (error) {
      console.error("Error fetching initial show page:", error);
    }
  };

  useEffect(() => {
    fetchInitialShowPage();
  }, []);

  return (
    <InitialPageContext.Provider value={{ initialShowPageStatus }}>
      {children}
    </InitialPageContext.Provider>
  );
};

// Create a custom hook to use the context
const useInitialPageContext = () => {
  const context = useContext(InitialPageContext);
  if (context === undefined) {
    throw new Error(
      "useInitialPage Context must be used within an InitialProvider"
    );
  }
  return context;
};

export { InitialPageProvider, useInitialPageContext };
