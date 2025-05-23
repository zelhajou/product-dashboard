// src/pages/NotFound.tsx - Updated for new layout
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui";
import { Icons } from "@/components/icons";

export function NotFound() {
  return (
    <Layout
      breadcrumbs={[{ label: "404 Error" }]}
    >
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-8xl sm:text-9xl font-bold text-gray-200 mb-4 select-none">
              404
            </div>
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 text-gray-300">
              <Icons.search className="w-full h-full" />
            </div>
          </div>

          {/* Error Content */}
          <div className="mb-8 space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Oops! Page not found
            </h1>
            <div className="space-y-2">
              <p className="text-base sm:text-lg text-gray-600">
                The page you're looking for doesn't exist or has been moved.
              </p>
              <p className="text-sm text-gray-500">
                Don't worry, let's get you back on track!
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">

              <Button variant="outline" asChild leftIcon="product" className="flex-1 sm:flex-none">
                <Link to="/products">View Products</Link>
              </Button>
            </div>

            <Button variant="secondary" asChild leftIcon="add" className="w-full sm:w-auto">
              <Link to="/add-product">Add New Product</Link>
            </Button>
          </div>

          {/* Help Section */}
          <div className="mt-12 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Icons.info className="w-4 h-4 text-gray-500" />
              <p className="text-sm font-medium text-gray-700">Need help?</p>
            </div>
            <p className="text-sm text-gray-600">
              Try checking the URL or use the navigation menu to find what you're looking for.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NotFound;