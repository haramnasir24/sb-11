const RegistrationPage = () => {
  return (
    <main className="mx-auto min-h-screen bg-gradient-to-br from-[#03071E] via-[#2F114A] to-[#9D4EDD] px-4 pb-16 pt-32">
      <div className="rounded-2xl bg-white bg-opacity-10 p-6 text-center shadow-lg backdrop-blur-md">
        <h1 className="mb-4 text-3xl font-bold text-white">
          Registrations Closed
        </h1>
        <p className="text-lg text-gray-200">
          Thank you for your interest! Stay tuned for future events.
        </p>
      </div>
      {/* <Suspense fallback={<LoadingIndicator />}>
        <RegistrationForm />
      </Suspense> */}
    </main>
  );
};

export default RegistrationPage;
