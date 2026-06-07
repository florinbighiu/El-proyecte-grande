import { FaGoogle, FaGithub, FaApple } from "react-icons/fa";
import { API_BASE_URL } from "../api/apiRoute";

const PROVIDERS = [
  { id: "google", label: "Google", Icon: FaGoogle },
  { id: "github", label: "GitHub", Icon: FaGithub },
  { id: "apple", label: "Apple", Icon: FaApple },
];

const SocialLoginButtons = ({ actionLabel = "Continue" }) => {
  const handleProviderClick = (providerId) => {
    // Full-page navigation is required: this kicks off a redirect-based OAuth2 flow,
    // not an XHR the SPA could handle on its own.
    window.location.href = `${API_BASE_URL}/oauth2/authorization/${providerId}`;
  };

  return (
    <div className="space-y-2">
      {PROVIDERS.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => handleProviderClick(id)}
          aria-label={`${actionLabel} with ${label}`}
          className="w-full flex items-center justify-center gap-2.5 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700 text-sm font-medium py-2.5 rounded-lg shadow-sm transition duration-150">
          <Icon className="w-4 h-4" aria-hidden="true" />
          <span>{actionLabel} with {label}</span>
        </button>
      ))}
    </div>
  );
};

export default SocialLoginButtons;
