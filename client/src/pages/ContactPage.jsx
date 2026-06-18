import { useState } from "react";
import { toast } from "react-hot-toast";
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiClock } from "react-icons/fi";
import Logo from "../assets/carton.png";
import apiService from "../api/apiService";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MAX = 1000;

const validate = (data) => {
  const errors = {};
  if (!data.name.trim()) {
    errors.name = "Name is required.";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!data.message.trim()) {
    errors.message = "Message is required.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }
  return errors;
};

const CONTACT_DETAILS = [
  { icon: FiMail, label: "Email", value: "support@ecomx.store", href: "mailto:support@ecomx.store" },
  { icon: FiPhone, label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
  { icon: FiMapPin, label: "Address", value: "123 Commerce St, San Francisco, CA" },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      await apiService.post("/email/send", formData);
      setSent(true);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      toast.success("Message sent!");
    } catch (err) {
      const serverErrors = err.response?.data?.errors;
      if (serverErrors) {
        setErrors(serverErrors);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-2.5 bg-white border rounded-lg text-ink placeholder-ink-soft/50 focus:outline-none focus:ring-2 transition ${
      errors[field] ? "border-red-400 bg-red-50 focus:ring-red-300" : "border-clay-soft focus:ring-clay/40 focus:border-clay"
    }`;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide uppercase text-clay-dark bg-clay-soft rounded-full">
          Contact
        </span>
        <h1 className="text-4xl font-extrabold text-ink tracking-tight mb-2">Get in touch</h1>
        <p className="text-ink-soft max-w-lg mx-auto">
          Have a question about an order, a product, or anything else? Send us a message and we&apos;ll get back to you soon.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* info panel */}
        <div className="relative lg:col-span-2 rounded-2xl bg-ink text-cream p-8 flex flex-col overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-clay/25 blur-3xl" aria-hidden />
          <img src={Logo} alt="Logo" className="relative h-14 w-14 mb-6" />
          <h2 className="relative text-xl font-bold mb-2">Contact information</h2>
          <p className="relative text-cream/60 text-sm mb-8">Reach us through any of the channels below.</p>

          <div className="relative space-y-5">
            {CONTACT_DETAILS.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-clay/20 text-clay flex items-center justify-center shrink-0">
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wide text-cream/40">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm font-medium hover:text-clay transition-colors break-all">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="relative mt-auto pt-8 flex items-center gap-3 text-cream/60 text-sm">
            <FiClock size={16} className="text-clay" />
            <span>Mon&ndash;Fri, 9:00&ndash;17:00</span>
          </div>
        </div>

        {/* form */}
        <div className="lg:col-span-3 bg-white border border-clay-soft rounded-2xl shadow-sm p-8">
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <FiCheckCircle className="text-green-500 mb-4" size={56} />
              <h2 className="text-2xl font-bold text-ink mb-2">Message sent!</h2>
              <p className="text-ink-soft mb-6 max-w-xs">
                Thanks for reaching out. We&apos;ve received your message and will reply by email shortly.
              </p>
              <button
                onClick={() => setSent(false)}
                className="px-6 py-2.5 bg-ink hover:bg-clay text-cream font-semibold rounded-full transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-bold text-ink mb-6">Send a message</h2>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass("name")}
                    placeholder="John Doe"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass("email")}
                    placeholder="you@email.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    maxLength={MESSAGE_MAX}
                    className={`${inputClass("message")} resize-none`}
                    placeholder="Write your message here..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : "message-hint"}
                  />
                  <div className="mt-1 flex items-center justify-between gap-2">
                    {errors.message ? (
                      <p id="message-error" role="alert" className="text-xs text-red-500">{errors.message}</p>
                    ) : (
                      <p id="message-hint" className="text-xs text-ink-soft/70">Minimum 10 characters.</p>
                    )}
                    <span className="text-xs text-ink-soft/70 shrink-0">
                      {formData.message.length}/{MESSAGE_MAX}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-ink hover:bg-clay disabled:opacity-60 text-cream font-semibold py-2.5 rounded-full transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-cream" />
                  ) : (
                    <>
                      <FiSend size={15} />
                      Send message
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
