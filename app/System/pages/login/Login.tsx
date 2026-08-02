"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { OptionsToast } from "../../Globales/toastys";
import aprendece from "../../../img/log.png";
import { login } from "../../Services/authService";
import Style from "./login.module.css";
import { Input, Label } from 'reactstrap';
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function Login() {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');


  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // try {
    //   const data = await login({
    //     username: userName,
    //     password: password,
    //   });

    //   localStorage.setItem("token", data.token);
    //   localStorage.setItem("user", JSON.stringify(data));

      toast.success("Login exitoso", OptionsToast);

      router.push("/dashboard");

    // } catch (err: any) {
    //   if (err.response?.status === 401) {
    //     toast.error("Usuario o contraseña incorrectos", OptionsToast);
    //   } else {
    //     toast.error("Error al conectar con servidor", OptionsToast);
    //   }
    // }
  };


  return (
    <div >
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