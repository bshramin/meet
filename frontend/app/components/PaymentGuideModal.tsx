import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";

interface PaymentGuide {
  title: string;
  steps: string[];
}

interface PaymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const countries = [
  { code: "US", name: "United States" },
  { code: "UK", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "DE", name: "Germany" },
  { code: "IR", name: "Iran" },
  { code: "other", name: "Other" },
];

export default function PaymentGuideModal({
  isOpen,
  onClose,
}: PaymentGuideModalProps) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [guide, setGuide] = useState<PaymentGuide | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCountry) {
      fetchGuide(selectedCountry);
    }
  }, [selectedCountry]);

  const fetchGuide = async (country: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/payment-guides?country=${country}`);
      const data = await response.json();
      setGuide(data);
    } catch (error) {
      console.error("Failed to fetch payment guide:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl rounded-lg bg-white p-6">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Payment Guide
          </Dialog.Title>

          {!guide ? (
            <div className="space-y-4">
              <p className="text-gray-600">
                Please select your country to view the payment guide:
              </p>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-lg font-medium">{guide.title}</h2>
              <ol className="list-decimal list-inside space-y-2">
                {guide.steps.map((step, index) => (
                  <li key={index} className="text-gray-700">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {loading && (
            <div className="mt-4 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
