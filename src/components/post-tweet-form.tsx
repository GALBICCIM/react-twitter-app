import * as Style from "../styles/TweetStyle";
import { useState } from "react";

export const PostTweetForm = () => {
   const [isLoading, setLoading] = useState(false);
   const [tweet, setTweet] = useState("");
   const [file, setFile] = useState<File | null>(null);

   const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTweet(event.target.value);
   };

   const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;
      if (files && files.length === 1) {
         setFile(files[0]);
      }
   };

   return (
      <Style.Form>
         <Style.TextArea onChange={onChange} rows={5} maxLength={180} placeholder="What is happening?" />
         <Style.AttachFileButton htmlFor="file">{file ? "Photo Added" : "Add photo"}</Style.AttachFileButton>
         <Style.AttachFileInput onChange={onFileChange} id="file" type="file" accept="image/*" />
         <Style.SubmitButton type="submit" value={isLoading ? "Posting..." : "Post Tweet"} />
      </Style.Form>
   );
};
