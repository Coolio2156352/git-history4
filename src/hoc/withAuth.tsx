"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import PageLoader from "@/components/PageLoader";

interface WithAuthProps {
  [key: string]: any;
}

const withAuth = <P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  // eslint-disable-next-line react/display-name
  return (props: P) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !isAuthenticated()) {
        router.push("/login");
      }
    }, [loading, isAuthenticated, router]);

    if (loading) {
      return <PageLoader />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
