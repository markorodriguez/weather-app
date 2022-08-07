import Head from "next/head";

import Spinner from "../components/Spinner";
import Body from "../components/Body";

import { useEffect, useState } from "react";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSpinner(false);
    }, 2000);
  }, []);


  return (
    <div>
      <Head>
        <title>Weather App</title>
      </Head>
      <ToastContainer />
      {showSpinner ? (
        <Spinner />
      ) : (
        <Body />
      )}
    </div>
  );
}
