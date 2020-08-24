import { useEffect } from 'react';

const useScript = (url, onLoadScript) => {
  console.log("loading useScript")
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;
    script.onload = onLoadScript;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
};

export default useScript;