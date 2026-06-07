import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const token = searchParams.get("token");
    const userId = searchParams.get("userId");
    const role = searchParams.get("role");
    const error = searchParams.get("error");

    if (token && userId) {
      login(token, userId, role?.split(",")[0] ?? "USER");
      toast.success("Signed in successfully!");
      navigate("/", { replace: true });
    } else {
      toast.error(error || "Social sign-in failed. Please try again.");
      navigate("/login", { replace: true });
    }
  }, [searchParams, login, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="flex flex-col items-center gap-3">
        <span className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600" />
        <p className="text-gray-600 text-sm">Finishing sign-in...</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
