import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-neutral-100 w-full mt-auto">
      <div className="mx-auto px-4 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:max-w-4xl xl:max-w-5xl ">
        <div>
          <div className="text-lg font-semibold text-neutral-800 mb-2">
            QuackPolls
          </div>
          <p className="text-sm text-neutral-700">
            &copy; {new Date().getFullYear()} QuackPolls. All rights reserved.
          </p>
        </div>

        <div className="flex gap-4">
          <Link
            href="https://github.com/sahilyadav10"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-700"
          >
            Github
          </Link>
          <Link
            href="https://www.linkedin.com/in/sahilyadav10"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-700"
          >
            LinkedIn
          </Link>
        </div>

        <div>
          <span>Made with </span>
          <Link
            href="https://sahilten.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium"
          >
            ♥️ Sahil Yadav
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
