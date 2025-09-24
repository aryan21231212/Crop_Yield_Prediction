import React from 'react';
import { Users, Target, Globe, Heart, Sparkles, Award, Calendar } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: "Aryan Pratap Singh",
      role: "Full Stack Developer",
      bio: "Passionate about building scalable applications and solving complex problems with clean code.",
      image: "me.jpg" // Replace with actual image path
    },
    {
      name: "Abhishek",
      role: "Frontend Developer",
      bio: "Transforming agricultural data into actionable insights for sustainable farming practices.",
      image: "abhishek.jpg"
    },
    {
      name: "Sandeep Kumar",
      role: "UI/UX Designer",
      bio: "Creating intuitive interfaces that bridge the gap between technology and farmers.",
      image: "sandeep.jpg"
    },
    {
      name: "Pranav Patil",
      role: "AI/ML",
      bio: "I specialize in developing innovative solutions that drive [mention outcomes like automation",
      image: "pranav.jpg"
    }
  ];


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              About FasalAI
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Empowering Farmers with Intelligent Agriculture
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We are a dedicated team of four professionals committed to revolutionizing farming through 
              data-driven insights and cutting-edge technology.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl font-bold text-slate-900">Meet Our Team</h2>
            </div>
            <p className="text-slate-600">The passionate individuals behind AgriPredict's success</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group text-center">
                {/* Image Placeholder - Replace with actual images */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center text-gray-400 overflow-hidden">

                    <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                 
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-green-300 transition-all duration-300" />
                </div>
                
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{member.name}</h3>
                <p className="text-green-600 font-medium mb-3">{member.role}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

    

     


      {/* Contact CTA */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Know More?</h2>
          <p className="text-slate-300 mb-8">
            We're always happy to share more about our work and collaborate with like-minded individuals.
          </p>
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;