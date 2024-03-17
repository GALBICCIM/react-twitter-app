import { useState, useEffect } from "react";
import { Wrapper } from "../styles/TimelineStyle";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export interface ITweet {
   photo: string;
   tweet: string;
   userId: string;
   username: string;
   createAt: number;
}

export const Timeline = () => {
   const [tweets, setTweets] = useState<ITweet[]>([]);

   // 트윗 불러오기
   const fetchTweets = async () => {
      const tweetsQuery = query(collection(db, "tweets"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(tweetsQuery);
      snapshot.docs.forEach((doc) => console.log(doc.data()));
   };

   useEffect(() => {
      fetchTweets();
   }, []);
   return <Wrapper>{JSON.stringify(tweets)}</Wrapper>;
};
