import { Link } from "react-router";

export const Home = () => {
  return (
    <div className="h-full w-full min-h-screen bg-white bg-[url('/bg.png')] flex flex-col items-center justify-center">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-7xl flex items-center justify-center ">
          <span className="bg-white rounded-lg flex items-center justify-center">
        <img src="/logo.png" alt="DoodlAI Logo" className="h-20" />
        DoodlAI
        </span>
        </h1>
        <h1 className="text-4xl md:text-7xl font-bold mb-6">
          <span className="bg-white rounded-lg">Learn to Draw with AI</span>
        </h1>
        
        
        <p className="text-xl md:text-2xl mb-8">
        <span className="bg-white">
          Practice your drawing skills using just your mouse or touchpad. 
          <br />
          Our AI will analyze your drawings in real-time and help you improve!
          </span>
        </p>

        <div className="space-y-4">
          <Link 
            to="/drawing"
            className="inline-block px-8 py-4 rounded-lg font-semibold text-white text-lg md:text-2lg bg-blue-500 hover:bg-blue-100"
          >
            Start Drawing
          </Link>
          <div>
          <ul className="leading-none  inline-block mx-auto text-left text-lg md:text-xl">
              <li><span className="bg-white">✏️ Draw with your mouse/touchpad</span></li>
              <li><span className="bg-white">🤖 Real-time AI feedback</span></li>
              <li><span className="bg-white">🎯 Practice with random words</span></li>
              <li><span className="bg-white">📱 Works on desktop and mobile</span></li>
            </ul>
            </div>
        </div>
      </div>
      <footer className="absolute bottom-0 w-full py-4 text-center">
        <p className="text-sm">
          <span className="bg-white/80 px-2 py-1 rounded">
            Made with ❤️ by <a href="https://github.com/pikooli" className="underline hover:no-underline">Pikooli</a>
          </span>
        </p>
      </footer>
    </div>
  );
};
