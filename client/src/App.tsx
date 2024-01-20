import { useState, useEffect } from "react";

import { ChatBody } from "./components/ChatBody";
import { ChatInput } from "./components/ChatInput";
import { useMutation } from "@tanstack/react-query";
import { fetchResponse } from "./api";
import "./index.css";
import { FaRobot } from "react-icons/fa";
import Typist from "react-typist";
import Lottie from "react-lottie";
import animationData from "./gpt-boot-lottie.json";

const App = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [chat, setChat] = useState<any>([]);

  const mutation = useMutation({
    mutationFn: () => {
      return fetchResponse(chat);
    },

    onSuccess: (data) => {
      if (data && data.message) {
        setChat((prev: any) => [
          ...prev,
          { sender: "ai", message: data.message.replace(/^\n\n/, "") },
        ]);
      }
    },
  });

  const sendMessage = async (message: any) => {
    await Promise.resolve(setChat((prev: any) => [...prev, message]));
    mutation.mutate();
  };

  useEffect(() => {
    const handleUnSupportedRoute = () => {
      window.location.href = "/";
    };

    window.addEventListener("popstate", handleUnSupportedRoute);
    return () => {
      window.removeEventListener("popstate", handleUnSupportedRoute);
    };
  }, []);

  return (
    <div className=" bg-gradient-to-r from-[#3a2d52] to-[#2b8a6f] h-screen relative py-2 px-12 sm:px-16   overflow-hidden flex flex-col align-middle ">
      <div className="gradient-01 gradient-03 z-0 absolute"></div>
      <div className="gradient-02 gradient-04  z-0 absolute"></div>
      <div className="absolute top-0 left-0 ml-1 bg-transparent w-[100px] h-[100px] md:h-[200px] md:w-[200px]">
        <Lottie options={defaultOptions} ></Lottie>
      </div>
      {/* header */}
      <div className=" font-bold text-2xl text-center    w-40 self-center ">
        <p className="self-start bg-clip-text  bg-gradient-to-r from-[#7c64b9] to-[#60c9bc] ">
          Cezi Chat GPT{" "}
        </p>
      </div>
      <p className="self-center text-xs bg-clip-text text-transparent bg-gradient-to-r from-[#eddcee] to-[#379789] ">
        {" "}
        gpt-3.5-turbo"{" "}
      </p>

      {/* body */}
      <div className="h-full overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center scrollbar-thumb-slate-400 scrollbar-thin scrollbar-track-gray-transparent scrollbar-thumb-rounded-md">
        <ChatBody chat={chat} />
      </div>

      <div className="w-full max-w-4xl min-w-[20rem] self-center  ">
        <ChatInput sendMessage={sendMessage} loading={mutation.isLoading} />
      </div>
    </div>
  );
};

export default App;
