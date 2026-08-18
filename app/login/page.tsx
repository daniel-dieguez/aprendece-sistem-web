"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { OptionsToast } from "../component/toastys";
// import aprendece from "../../System/img/log.png";
import aprendece from "../../app/img/log.png";
import { login } from "../Services/authService";
import Style from "./login.module.css";
import { Input, Label } from 'reactstrap';
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { ProgressCircle, Modal, Spinner } from "@heroui/react";

// import { Button } from "@heroui/react";


// import { useRouter } from "next/navigation";
// import login


export default function Login() {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [isLogin, setIsLogin] = useState(false);


  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLogin(true);

    try {
      const data = await login({
        username: userName,
        password: password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));




      toast.success("Login exitoso", OptionsToast);

      setIsLogin(false);

      router.push("/dashboard");

    } catch (err: any) {
      if (err.response?.status === 401) {
        toast.error("Usuario o contraseña incorrectos", OptionsToast);
              setIsLogin(false);
      } else {
        toast.error("Error al conectar con servidor", OptionsToast);
              setIsLogin(false);
      }
    }
  };


  return (
    <div className={Style.wrapper}>

      {isLogin && (
        <Modal isOpen>
          <Modal.Backdrop>
            <Modal.Container size={"xs"}>
              <Modal.Dialog className="sm:max-w-[360px]">
                <Modal.Header>
              

                  {/* <div className="flex justify-center">
                    <ProgressCircle aria-label="Loading" isIndeterminate>
                      <ProgressCircle.Track>
                        <ProgressCircle.TrackCircle />
                        <ProgressCircle.FillCircle />
                      </ProgressCircle.Track>
                    </ProgressCircle>
                  </div> */}
                  <div className="flex flex-col items-center gap-2">
                    <Spinner size="xl" />
                    <span className="text-xs text-muted">Iniciando sesión...</span>
                  </div>

                 
                </Modal.Header>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      )}

      <div className={Style.loginBox}>
        <Image
          src={aprendece}
          alt="Logo"
          className={Style.logo}
        />

        <h2 className={Style.title}>Iniciar Sesión</h2>

        <div className={Style.form}>
          <Label htmlFor="username" className={Style.label}>Usuario</Label>
          <Input
            type="text"
            id="username"
            placeholder="Usuario"
            className={Style.input}
            onChange={(e) => {
              const value = e.target.value;
              setUserName(value);
            }}
          />

          <Label htmlFor="password" className={Style.label}>Contraseña</Label>
          <Input
            type="password"
            id="password"
            placeholder="Contraseña"
            className={Style.input}
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);
            }}
          />


          <button onClick={handleLogin} className={Style.button}>
            Ingresar
          </button>

        </div>


        <Link href="#" className={Style.forgotLink}>¿Olvidaste tu contraseña?</Link>
      </div>
    </div>
  );
}