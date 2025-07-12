import { Link } from "react-router-dom";
import { House } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-surface-50">
      <div className="text-center">
        <div className="h-20 w-20 rounded-full bg-surface-200 flex items-center justify-center mx-auto mb-6">
          <div className="text-3xl font-bold text-accent-600">404</div>
        </div>
        
        <h1 className="text-2xl font-bold text-primary-800 mb-2">Page Not Found</h1>
        <p className="text-surface-600 mb-8 max-w-xs mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link
          to="/"
          className="py-3 px-6 bg-primary-800 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors inline-flex items-center"
        >
          <House className="mr-2 h-5 w-5" />
          Back to House
        </Link>
      </div>
    </div>
  );
}
