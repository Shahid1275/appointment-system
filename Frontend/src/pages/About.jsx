import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* About Us Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          About <span className="text-blue-600">Us</span>
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Connecting you with trusted healthcare professionals
        </p>
        <div className="mt-4 h-1 w-20 bg-blue-600 mx-auto rounded"></div>
      </div>

      <div className="mt-12 flex flex-col lg:flex-row gap-8">
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full md:max-w-[360px]"
          src={assets.about_image || assets.default_image}
          alt="Healthcare professional assisting a patient"
          onError={(e) => (e.target.src = assets.default_image)}
        />
        <div className="flex flex-col justify-center gap-6 lg:w-2/3 text-base text-gray-700">
          <p>
            Our doctor appointment platform offers a seamless experience for
            booking consultations with trusted healthcare professionals. Whether
            you're seeking a general check-up, specialized treatment, or expert
            medical advice, our system ensures you can connect with certified
            doctors quickly and efficiently. Designed to prioritize convenience,
            the platform allows you to explore doctor profiles, view their
            qualifications, and book slots at your preferred time.
          </p>
          <p>
            Committed to quality healthcare access, we bridge the gap between
            patients and professionals with a secure and reliable interface. All
            interactions are safeguarded to protect your personal information
            while enhancing your overall experience. From consultation booking
            to follow-up, we’re dedicated to simplifying your healthcare
            journey.
          </p>
          <h3 className="text-xl font-semibold text-gray-800">Our Vision</h3>
          <p>
            Our vision is to revolutionize healthcare accessibility by creating
            a trusted, seamless, and user-friendly platform that connects
            patients with the best medical professionals. We aim to empower
            individuals to take charge of their health by providing quick and
            reliable access to quality care, anytime and anywhere.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Why <span className="text-blue-600">Choose Us</span>
        </h2>
        <div className="mt-4 h-1 w-20 bg-blue-600 mx-auto rounded"></div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Efficiency",
            description:
              "Streamlined appointment scheduling that fits into your busy lifestyle.",
            icon: assets.efficiency_icon || "🚀",
          },
          {
            title: "Convenience",
            description:
              "Access to a network of trusted healthcare professionals in your area.",
            icon: assets.convenience_icon || "📍",
          },
          {
            title: "Personalization",
            description:
              "Tailored recommendations and reminders to help you stay on top of your health.",
            icon: assets.personalization_icon || "🩺",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg shadow-md 
                       hover:shadow-lg hover:bg-blue-50 transition-all duration-300 cursor-pointer"
            role="button"
            aria-label={`Learn more about ${item.title}`}
          >
            <div className="text-3xl mb-4">
              {typeof item.icon === "string" ? (
                item.icon
              ) : (
                <img
                  src={item.icon}
                  alt={`${item.title} icon`}
                  className="w-10 h-10"
                />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h3>
            <p className="mt-2 text-base text-gray-700 text-center">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;
