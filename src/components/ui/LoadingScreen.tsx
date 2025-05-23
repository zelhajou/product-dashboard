import { Icons } from "@/components/icons";

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = "Loading..." }: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl mx-auto w-fit">
            <Icons.product className="w-12 h-12 text-white animate-pulse" />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Icons.loading className="w-6 h-6 text-blue-600 animate-spin" />
            <h2 className="text-xl font-semibold text-gray-900">ProductSync</h2>
          </div>
          <p className="text-gray-600">{message}</p>
        </div>

        {/* Loading Animation */}
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}