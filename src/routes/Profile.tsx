import { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase";
import * as Style from "../styles/ProfileStyle";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { ITweet } from "../components/timeline";
import { Tweet } from "../components/tweet";

export const Profile = () => {
   const user = auth.currentUser;
   const [isEditing, setEditing] = useState(false);
   const [avatar, setAvatar] = useState(user?.photoURL);
   const [tweets, setTweets] = useState<ITweet[]>([]);
   const [name, setName] = useState(user?.displayName);

   const handleEditing = async () => {
      setEditing((prev) => !prev);
   };

   const onNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setName(event.target.value);
   };

   const onNameSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
         if (!user) return;

         await updateProfile(user, {
            displayName: name,
         });
      } catch (e) {
         console.log(e);
      } finally {
         setEditing((prev) => !prev);
      }
   };

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

   const fetchTweets = async () => {
      const tweetQuery = query(collection(db, "tweets"), where("userId", "==", user?.uid), orderBy("createdAt", "desc"), limit(25));
      const snapshot = await getDocs(tweetQuery);
      const tweets = snapshot.docs.map((doc) => {
         const { tweet, createAt, userId, username, photo } = doc.data();
         return {
            tweet,
            createAt,
            userId,
            username,
            photo,
            id: doc.id,
         };
      });
      setTweets(tweets);
   };

   useEffect(() => {
      fetchTweets();
   }, []);
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
         {isEditing ? (
            <Style.EditForm onSubmit={onNameSubmit}>
               <Style.EditTextArea onChange={onNameChange} placeholder="Change your name...">
                  {name}
               </Style.EditTextArea>
               <Style.EditSubmit id="editSubmit" type="submit"></Style.EditSubmit>
            </Style.EditForm>
         ) : (
            <Style.Name>{user?.displayName ?? "Anonymous"}</Style.Name>
         )}
         {user?.displayName ? (
            isEditing ? (
               <Style.DoneLabel htmlFor="editSubmit">Done</Style.DoneLabel>
            ) : (
               <Style.EditProfileName onClick={handleEditing}>Edit Name</Style.EditProfileName>
            )
         ) : null}
         <Style.Tweets>
            {tweets.map((tweet) => (
               <Tweet key={tweet.id} {...tweet} />
            ))}
         </Style.Tweets>
      </Style.Wrapper>
   );
};
