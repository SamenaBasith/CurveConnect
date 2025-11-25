export default function AboutUs() {
  return (
    <section className="w-full py-16 px-6 ">
      <div className="w-full mx-auto text-center">
        <h2 className="text-3xl font-bold">What is CurveConnect?</h2>

        <p className="mt-4">
          An app to send a card to show your appreciation, share positive praise
          and spread joy. This well help to reinforce relationships within the
          team and celebrate eachothers achievements.
        </p>

        <div className="mt-12 grid md:grid-cols-4 gap-7">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-blue-700">
              {" "}
              Select a template
            </h3>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-purple-700">
              {" "}
              Write a personal message{" "}
            </h3>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-blue-700">
              {" "}
              Fill in the recipients details
            </h3>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-purple-700">
              {" "}
              Sign it and send!
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
