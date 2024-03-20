import { useState } from "react";
import { auth, storage } from "../firebase";
import * as Style from "../styles/ProfileStyle";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";

export const Profile = () => {
   const user = auth.currentUser;
   const [avatar, setAvatar] = useState(user?.photoURL);

   const onAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!user) return;
      const { files } = event.target;

      if (files && files.length === 1) {
         const file = files[0];
         const locationRef = ref(storage, `avatars/${user?.uid}`);
         const result = await uploadBytes(locationRef, file);
         const avatarUrl = await getDownloadURL(result.ref);

         setAvatar(avatarUrl);

         await updateProfile(user, {
            photoURL: avatarUrl,
         });
      }
   };

   return (
      <Style.Wrapper>
         <Style.AvatarUpload htmlFor="avatar">
            {avatar ? (
               <Style.AvatarImg src={avatar} />
            ) : (
               <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path
                     clipRule="evenodd"
                     fillRule="evenodd"
                     d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
                  />
               </svg>
            )}
         </Style.AvatarUpload>
         <Style.AvatarInput onChange={onAvatarChange} id="avatar" type="file" accept="image/*" />
         <Style.Name>{user?.displayName ?? "Anonymous"}</Style.Name>
      </Style.Wrapper>
   );
};
