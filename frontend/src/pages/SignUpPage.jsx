import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Box, Button, Container, TextField } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "../utils/supabaseClient";
import useHandleSignUp from "../hooks/useHandleSignUp";

function SignUpPage() {
  const [signupData, setSignupData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    aadhaarNumber: "",
    createdAt: "",
    emailVerified: "",
  });
  const [token, setToken] = useState(
    localStorage.getItem("sb-qhxjxhiaadtlcgklvofq-auth-token"),
  );

  useEffect(() => {
    if (token) {
      toast.success("Login realizado com sucesso! Redirecionando para o painel....");
      setSuccessMessage("Entrando....");
      setTimeout(() => {
        window.location.href = "/cureit/user/dashboard";
      }, 500);
    }
  }, [token]);

  const { mutate, error, success } = useHandleSignUp();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const handleSignUp = async () => {
    const { email, password, name, phoneNumber } = signupData;
    const signUpData2 = { ...signupData };
    // console.log(signUpData2);
    const frontend_base_url = import.meta.env.VITE_frontend_base_url;

    // Supabase requires only email and password for authentication
    const url = `${frontend_base_url}/cureit/login/`;
    // console.log(url);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      phone: phoneNumber,
      options: {
        data: { display_name: name, phone: phoneNumber }, // Store display_name in metadata
        emailRedirectTo: `${frontend_base_url}/cureit/login`, // Redirect URL after confirmation
      },
    });

    if (error) {
      // console.log(error);
      setErrorMessage(error.message);
      setSuccessMessage("");
    } else {
      const userId = data?.user?.id; // Get the user ID from auth response
      // console.log("User ID:", userId);
      signUpData2.id = userId;
      // console.log(data?.user);
      // console.log(data?.user?.user_metadata?.email_confirmed_at);

      if (userId != null) {
        const sendUserInfoToBackend = async (signUpData2) => {
          // console.log(signupData);
          mutate.mutate(signUpData2, {
            onSuccess: (data) => {
              // console.log("User info successfully sent to backend:");
              setErrorMessage("");
              setSuccessMessage(
                "Cadastro realizado com sucesso! Verifique seu e-mail para confirmar sua conta.",
              );
              toast.success("Cadastro realizado com sucesso!");
              setTimeout(() => {
                navigate("/login"); // Ou envie direto para "/cureit/user/dashboard"
              }, 500);
            },
            onError: (error) => {
              console.log(error);
              setErrorMessage("E-mail já cadastrado");
              toast.error("E-mail já cadastrado.");
            },
          });
        };
        // console.log("Sending user data:", signUpData2);
        sendUserInfoToBackend(signUpData2);
      }
    }
  };

  const [validation, setValidation] = useState({
    email: null,
    aadhaarNumber: null,
    phoneNumber: null,
    password: null,
  });

  const validateField = (name, value) => {
    let isValid = false;

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
    } else if (name === "phoneNumber") {
      // Aceita telefones brasileiros com 10 ou 11 dígitos (Ex: 11987654321)
      const phoneRegex = /^\d{10,11}$/;
      isValid = phoneRegex.test(value);
    } else if (name === "aadhaarNumber") {
      // Aceita o CPF brasileiro com exatamente 11 dígitos (apenas números)
      const cpfRegex = /^\d{11}$/;
      isValid = cpfRegex.test(value);
    } else if (name === "password") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      isValid = passwordRegex.test(value);
    } else if (name === "name") {
      return;
    }
    setValidation((prev) => ({ ...prev, [name]: isValid }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    // console.log(name, " ", value);
    validateField(name, value);
  };

  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));

    // Clear previous timer
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timer for 2 seconds for validation
    const newTimeout = setTimeout(() => {
      validateField(name, value);
    }, 500);

    setTypingTimeout(newTimeout);
  };
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(Object.values(validation).every(Boolean));
    // console.log(validation);
  }, [validation]);

  return (
    <div className="dotted mt-0 flex min-h-screen flex-col items-center justify-center">
      <div className="relative my-24 flex w-11/12 flex-col gap-y-4 rounded-md border-2 bg-white p-8 font-inter text-sm font-medium text-[#5d5d5d] shadow-2xl shadow-indigo-300 sm:w-8/12 md:w-6/12 lg:w-4/12">
        <div className="absolute left-3 top-3 -z-10 h-full w-full animate-fade-up rounded-md bg-gradient-to-r from-violet-300 to-indigo-400"></div>
        <div className="mb-2 flex select-none text-center font-noto text-base font-semibold md:text-lg">
          Sua primeira consulta está a apenas um cadastro de distância.
        </div>
        <div className="flex flex-col gap-y-1">
          <span className="">Seu Nome</span>
          <TextField.Root
            placeholder="Nome Completo"
            onChange={handleChange}
            name="name"
            value={signupData.name}
          ></TextField.Root>
        </div>

        <div className="flex flex-col gap-y-1">
          <span className="">E-mail</span>
          <TextField.Root
            placeholder="E-mail"
            onChange={handleChange}
            name="email"
            value={signupData.email}
            onBlur={handleBlur}
          ></TextField.Root>
        </div>
        {/* <div> */}
        {validation.email === false && (
          <p className="mt-2 text-red-500">Formato de e-mail inválido</p>
        )}
        {/* {validation.email === true && (
            <p className="mt-2 text-green-500">Valid email format</p>
          )} */}
        {/* </div> */}

        <div className="flex flex-col gap-y-1">
          <span className="">Número do CPF</span>
          <TextField.Root
            placeholder="Número do CPF"
            onChange={handleChange}
            name="aadhaarNumber"
            value={signupData.aadhaarNumber}
            onBlur={handleBlur}
          ></TextField.Root>
        </div>
        {/* <div> */}
        {validation.aadhaarNumber === false && (
          <p className="mt-2 text-red-500">Formato de documento inválido</p>
        )}
        {/* {validation.aadhaar === true && (
            <p className="mt-2 text-green-500">Valid aadhaar format</p>
          )} */}
        {/* </div> */}

        <div className="flex flex-col gap-y-1">
          <span className="">Telefone</span>
          <TextField.Root
            placeholder="Número de Telefone"
            onChange={handleChange}
            onBlur={handleBlur}
            name="phoneNumber"
            value={signupData.phoneNumber}
          ></TextField.Root>
        </div>
        {/* <div> */}
        {validation.phoneNumber === false && (
          <p className="mt-2 text-red-500">Formato de telefone inválido</p>
        )}
        {/* {validation.phone === true && (
            <p className="mt-2 text-green-500">Valid Phone Number Format</p>
          )} */}
        {/* </div> */}

        <div className="flex flex-col gap-y-1">
          <span className="">Senha</span>
          <TextField.Root
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            onChange={handleChange}
            value={signupData.password}
            name="password"
          >
            <TextField.Slot className="relative">
              <Button
                variant="soft"
                color="gray"
                style={{
                  left: "0",
                  top: "0",
                  bottom: "0",
                  padding: "0 10px",
                  marginLeft: "-7px",
                  borderRadius: "4px 0 0 4px",
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </Button>
            </TextField.Slot>
          </TextField.Root>
        </div>
        {validation.password === false && (
          <p className="text-red-500">
            A senha deve ter pelo menos 8 caracteres, incluir uma letra maiúscula, uma letra minúscula, um número e um caractere especial.
          </p>
        )}
        <Button
          color="iris"
          size="3"
          name="button"
          onClick={handleSignUp}
          disabled={!isFormValid}
        >
          SignUp
        </Button>
        <div>{errorMessage}</div>
        <div>{successMessage}</div>
        <p
          className="w-fit cursor-pointer select-none border-b border-white text-indigo-700 transition-all duration-200 hover:border-b hover:border-indigo-700"
          onClick={() => navigate("/login")}
        >
          Já tem uma conta? Entrar
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
