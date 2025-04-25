const Hero = () => {
  return (
    <section className="bg-white py-20 px-4 text-center">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center min-h-[60vh] gap-10">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Capstone Tracker
          </h1>
          <p className="text-lg text-gray-600">
            Stay on top of your capstone journey. Upload, track, and manage your
            submissions — all in one place.
          </p>
          <div className="space-x-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
              Get Started
            </button>
            <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
