const Partnership = () => {
  return (
    <section id="partnership" className="bg-white py-20 px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-black">
          Partner With Us
        </h2>
        <p className="text-lg text-black">
          Are you a school or organization looking to streamline your capstone
          process? Let's work together to make file tracking and submission
          easier, faster, and more organized.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition">
            Become a Partner
          </button>
          <button className="bg-white border border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-100 transition">
            Contact Us
          </button>
        </div>
        <p className="text-sm text-blue-500">
          Together, we can support the next generation of innovators.
        </p>
      </div>
    </section>
  );
};

export default Partnership;
