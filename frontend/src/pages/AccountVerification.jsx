import { Button, Code } from "@radix-ui/themes";
// import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
// import { toast } from "react-toastify";
import { toast } from "sonner";
// import "react-toastify/dist/ReactToastify.css";

function AccountVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email || "undefined email";
  // add 1.5min timer to resend email

  const [timer, setTimer] = useState(90); // Initial timer value in seconds
  const [isTimerActive, setIsTimerActive] = useState(true);
  const {
    isLoading: isLoadingUser,
    data: dataUser,
    error: errorUser,
    refetch: refetchUser,
    isFetching: isFetchingUser,
  } = useGetCurrentUser();

  useEffect(() => {
    let interval = null;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval); // Cleanup interval
  }, [timer, isTimerActive]);

  // const handleResend = () => {
  //   // Trigger email resend logic here
  //   // console.log("Resend email triggered!");

  //   // Start timer
  //   setTimer(90);
  //   setIsTimerActive(true);
  // };

  // const email = location.state.email || "undefined email";
  const [message, setMessage] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const handleResend = async () => {
    // console.log("sending resend email:");
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/users/resend-verification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );
      setTimer(90);
      setIsTimerActive(true);
      const data = await response.json();
      setMessage(data.message || "Falha ao reenviar e-mail");
    } catch (error) {
      setMessage("Erro ao enviar e-mail");
    }
  };
  const tokenString = localStorage.getItem(
    "sb-qhxjxhiaadtlcgklvofq-auth-token",
  );
  const [token, setToken] = useState(() => {
    const tokenString = localStorage.getItem(
      "sb-qhxjxhiaadtlcgklvofq-auth-token",
    );
    return JSON.parse(tokenString);
  });

  const updateToken = () => {
    const tokenString = localStorage.getItem(
      "sb-qhxjxhiaadtlcgklvofq-auth-token",
    );
    setToken(JSON.parse(tokenString));
  };

  const [userEmailStatus, setUserEmailStatus] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setToken(session);
          // Optionally, re-fetch user data if needed
          refetchUser();
        }
      },
    );
  }, [dataUser]);

  useEffect(() => {
    // console.log("in useeffect:", dataUser);
    if (dataUser?.user) {
      if (token?.user?.email === email) {
        toast.success("E-mail verificado! Prossiga para Entrar");
        setTimeout(() => {
          // navigate("/verification", { state: { email } });
          navigate("/verified");
        }, 500);
      }
    }
  }, [dataUser, token, email, navigate]);

  return (
    <div className="flex h-[100svh] w-full items-center justify-center bg-[#f7f8fa] font-noto font-medium">
      <div className="m-4 flex flex-col items-center justify-center gap-y-4 rounded-lg bg-white p-8 drop-shadow-lg">
        <div className="mb-4 rounded-sm border border-green-400 bg-green-200 px-3 py-1 text-center text-lg font-semibold text-green-900">
          Por favor, verifique seu e-mail
        </div>
        <div>Você está quase lá! Enviamos um e-mail para</div>
        <Code>{email}</Code>
        <div className="mt-4 text-sm">
          Basta clicar no link do e-mail para concluir seu cadastro.
          <br />
          Se não o encontrar, verifique sua caixa de spam.
        </div>

        <div className="flex flex-col items-center text-sm">
          <div>Ainda não encontrou o e-mail?</div>
          <div className="my-1">
            <Button
              color="iris"
              disabled={isTimerActive}
              onClick={handleResend}
            >
              {isTimerActive ? `Reenviar e-mail em ${timer}s` : `Reenviar e-mail`}
            </Button>
          </div>
        </div>

        <div className="flex gap-x-1 text-sm">
          <div>Precisa de ajuda?</div>
          <div
            className="cursor-pointer text-indigo-800 underline"
            onClick={() => console.log("Fale Conosco")}
          >
            Fale Conosco
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountVerification;
