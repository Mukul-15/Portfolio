import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-6">Oops! Page not found</p>
        <a href="/" className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm hover:text-primary">
          Go home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
