import SearchPage from "@/Components/SearchPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChurch,
  faChildReaching,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React from "react";

const Page: React.FC = () => {
  return (
    <div>
      <main className="flex flex-col items-center align-middle justify-center  min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Wähle deine Organisation
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mt-12">
          <Link className="group" href="/gemeinde">
            <div className="flex flex-col items-center justify-center p-5 sm:p-6 bg-white rounded-lg shadow-md transition-transform transform group-hover:scale-105">
              <FontAwesomeIcon
                icon={faChurch}
                className="h-8 md:h-10 text-gray-900 group-hover:text-indigo-600"
              />
              <h2 className="mt-4 text-base font-semibold text-gray-900 group-hover:text-indigo-600">
                Gemeinde
              </h2>
            </div>
          </Link>
          <Link className="group" href="/kita">
            <div className="flex flex-col items-center justify-center p-5 sm:p-6 bg-white rounded-lg shadow-md transition-transform transform group-hover:scale-105">
              <FontAwesomeIcon
                icon={faChildReaching}
                className="h-8 md:h-10 text-gray-900 group-hover:text-indigo-600"
              />
              <h2 className="mt-4 text-base font-semibold text-gray-900 group-hover:text-indigo-600">
                Kita
              </h2>
            </div>
          </Link>
          <Link className="group" href="/grundschule">
            <div className="flex flex-col items-center justify-center p-5 sm:p-6 bg-white rounded-lg shadow-md transition-transform transform group-hover:scale-105">
              <FontAwesomeIcon
                icon={faSchool}
                className="h-8 md:h-10 text-gray-900 group-hover:text-indigo-600"
              />
              <h2 className="mt-4 text-base font-semibold text-gray-900 group-hover:text-indigo-600">
                Grundschule
              </h2>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Page;
