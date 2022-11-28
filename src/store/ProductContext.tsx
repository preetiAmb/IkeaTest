import * as React from 'react';
import { useEffect, useState, useContext } from 'react';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;  
    category: string;
    children?: React.ReactNode | React.ReactNode[];
}

interface ProductProviderProps{
    children: React.ReactNode
  }

const ApiContext = React.createContext<any | null>(null);
const useApiContext = () => useContext(ApiContext);

const ApiContextProvider = ({ children }: ProductProviderProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedProductData, setLoadedProductData] = useState<Product[]>([]);

    useEffect(() => {
      setIsLoading(true);
      fetch(
        'https://ikeatest-15e09-default-rtdb.europe-west1.firebasedatabase.app/Products.json'
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const productData = [];
  
          for (const key in data) {
            const productD = {
              id: key,
              ...data[key]
            };
  
            productData.push(productD);
          }
  
          setIsLoading(false);
          setLoadedProductData(productData);
        });
    }, []);
  
    if (isLoading) {
      return (
        <section>
          <p>Loading...</p>
        </section>
      );
    }

  return (
    <ApiContext.Provider value={{loadedProductData}}>{children}</ApiContext.Provider>
  );
};

export function useAPI() {
    const context = useContext(ApiContext);
    if(context === undefined){
        throw new Error("Context must be used within a Provider");
    }
    return context;
}

export default ApiContextProvider;