import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui";

export function NotFound() {
  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          {/* 404 illustration */}
          <div className="mb-8">
            <div className="text-9xl font-bold text-gray-300 mb-4">404</div>
            <div className="w-24 h-24 mx-auto mb-6 text-gray-400">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="w-full h-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.529-1.007-6.071-2.625M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>

          {/* Error messaging */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Oops! Page not found
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <p className="text-sm text-gray-500">
              Don't worry, let's get you back on track!
            </p>
          </div>

          {/* Ation buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/products">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 5a2 2 0 012-2h2a2 2 0 012 2v0H8v0z"
                  />
                </svg>
                View All Products
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link to="/add-product">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add New Product
              </Link>
            </Button>
          </div>

          {/* Modern help text */}
          <div className="mt-12 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Need help? Try checking the URL or use the navigation menu above.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NotFound;
