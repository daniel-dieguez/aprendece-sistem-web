import Image from "next/image";
// import { Loging } from "../app/System/pages/Login";
import Page from './login/page';




export default function Home() {
  return (
     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-cyan-50">
      
     <Page/>
 

    </div>
  );
}
