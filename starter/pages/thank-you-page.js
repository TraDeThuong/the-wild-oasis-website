export default function Page() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-xl w-full bg-primary-900 shadow-2xl rounded-2xl p-10 text-center space-y-8 border border-primary-800">
        
        {/* Icon */}
        <div className="flex justify-center">
          <div className="bg-accent-500/20 text-accent-500 rounded-full p-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-primary-100 tracking-tight">
          Reservation Confirmed!
        </h1>

        {/* Subtitle */}
        <p className="text-primary-300 text-lg leading-relaxed">
          Thank you for your reservation. We’ve received your booking and it’s
          now being processed. You can manage or review it anytime in your
          account.
        </p>

        {/* CTA */}
        <a
          href="/account/reservations"
          className="inline-block bg-accent-500 hover:bg-accent-600
                     text-primary-900 font-semibold px-8 py-4
                     rounded-lg transition-all shadow-lg"
        >
          Manage your reservations →
        </a>
      </div>
    </div>
  );
}