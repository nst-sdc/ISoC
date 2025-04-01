import { ChevronRight, Calendar, Users, Code2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

interface HomeProps {
  onStudentClick: () => void;
  onOrgClick: () => void;
}

export default function Home({ onStudentClick, onOrgClick }: HomeProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStudentClick = () => {
    if (user) {
      navigate('/student/apply');
    } else {
      onStudentClick();
    }
  };

  const handleOrgClick = () => {
    if (user) {
      navigate('/organization/register');
    } else {
      onOrgClick();
    }
  };

  return (
    <>
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="inset-0 bg-[url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Indian Summer of Code
              <span className="block text-orange-600">2025</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Empowering the next generation of Indian developers through meaningful open-source contributions
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleStudentClick}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center"
              >
                Apply as Student <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={handleOrgClick}
                className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors flex items-center"
              >
                Register Organization <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Vision & Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Vision & Mission</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our vision is to empower students across India to become active contributors to the open-source community,
              fostering innovation and collaboration while building valuable skills for their future careers.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Calendar className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">2-Month Program</h3>
              <p className="text-gray-600">Intensive coding period with expert mentorship and real-world project experience</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Users className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Mentorship</h3>
              <p className="text-gray-600">Learn from industry professionals and experienced open-source contributors</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Code2 className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Impact Projects</h3>
              <p className="text-gray-600">Work on meaningful projects that benefit the developer community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Program Timeline</h2>
          <div className="space-y-8">
            {[
              { date: 'March', title: 'Program Announcement', desc: 'Organization applications open' },
              { date: 'Early April', title: 'Organization Selection', desc: 'Project listing begins' },
              { date: 'Mid April', title: 'Student Applications', desc: 'Proposal workshops start' },
              { date: 'June - July', title: 'Coding Period', desc: 'Main development phase with evaluations' },
              { date: 'August', title: 'Final Submissions', desc: 'Project completion and evaluations' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-24 flex-shrink-0 text-orange-600 font-semibold">{item.date}</div>
                <div className="flex-grow bg-gray-50 p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
