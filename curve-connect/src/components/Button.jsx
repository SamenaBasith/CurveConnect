import Link from "next/link";

export default function Button({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl
                 font-semibold hover:bg-blue-700 transition-all duration-200
                 shadow-md hover:shadow-lg"
    >
      {children}
    </Link>
  );
}
