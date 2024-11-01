"use client";
import { isAuthenticated } from "@/utils/authentication";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function isAuth(Component:any) {
  return function IsAuth(props:any) {
    const [auth, setAuth] = useState<boolean>(false); 
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const result = await isAuthenticated(); 
        if (!result) {
          router.push("/auth"); 
        } else {
          setAuth(true); 
        }
      };

      checkAuth();
    }, [router]);

    
    if (auth === null) {
      return null;
    }

    
    return <Component {...props} />;
  };
}
