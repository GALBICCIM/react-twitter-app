import { addDoc, collection, deleteDoc, updateDoc } from "firebase/firestore";
import * as Style from "../styles/WriteTweetStyle";
import { useState } from "react";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const PostTweetForm = () => {
   const [isLoading, setLoading] = useState(false);
   const [tweet, setTweet] = useState("");
   const [file, setFile] = useState<File | null>(null);
   const [error, setError] = useState("");

   const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTweet(event.target.value);
   };

   const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;
      if (files && files.length === 1) {
         setFile(files[0]);
      }
   };

   const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const user = auth.currentUser; // 현재 로그인되고 있는 유저

      if (!user || isLoading || tweet === "" || tweet.length > 180) return;

      try {
         setLoading(true);

         // 어떤 db에 저장할지, 그 안에 무슨 인스턴스를 저장할지
         const doc = await addDoc(collection(db, "tweets"), {
            tweet,
            createdAt: Date.now(),
            username: user.displayName || "Anonymous",
            userId: user.uid,
         });

         if (file) {
            if (file.size > 1000000) {
               deleteDoc(doc);
               setError("The file is to large. (Less than 1MB)");
               setFile(null);

               return;
            } else {
               const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
               const result = await uploadBytes(locationRef, file);
               const url = await getDownloadURL(result.ref);

               await updateDoc(doc, {
                  photo: url,
               });
            }
         }
      } catch (e) {
         console.log(e);
      } finally {
         setTweet("");
         setFile(null);
         setLoading(false);
      }
   };

   return (
      <Style.Form onSubmit={onSubmit}>
         <Style.TextArea onChange={onChange} value={tweet} rows={5} maxLength={180} placeholder="What is happening?" required />
         <Style.AttachFileButton htmlFor="file">{file ? "Photo Added" : "Add photo"}</Style.AttachFileButton>
         <Style.AttachFileInput onChange={onFileChange} id="file" type="file" accept="image/*" />
         <Style.SubmitButton type="submit" value={isLoading ? "Posting..." : "Post Tweet"} />
         {error !== "" ? <Style.Error>{error}</Style.Error> : null}
      </Style.Form>
   );
};
