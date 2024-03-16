import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import * as Style from "../styles/GithubLogoStyle";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export const GithubButton = () => {
   const navigate = useNavigate();

   const onClick = async () => {
      try {
         const provieder = new GithubAuthProvider();
         await signInWithPopup(auth, provieder);
         navigate("/");
      } catch (e) {
         console.log(e);
      }
   };

   return (
      <Style.Button onClick={onClick}>
         <Style.Logo src="/github-logo.svg" />
         Continue with Github
      </Style.Button>
   );
};
