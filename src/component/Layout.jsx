import { IS_MOBILE } from '../constant';

export const Layout = ({ children }) => {
  return (
    <div className="h-full w-full min-h-screen text-black bg-white flex flex-col items-center justify-center font-cabin">
      {children}
      {!IS_MOBILE && (
        <footer className="absolute bottom-0 w-full py-4 text-center">
          <p className="text-sm">
            <span className="bg-white/80 px-2 py-1 rounded">
              Made with ❤️ by{' '}
              <a
                href="https://github.com/pikooli"
                className="underline hover:no-underline"
              >
                Pikooli
              </a>
            </span>
          </p>
        </footer>
      )}
    </div>
  );
};
