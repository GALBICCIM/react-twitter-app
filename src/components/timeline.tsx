import { useState, useEffect } from "react";
import { Wrapper } from "../styles/TimelineStyle";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { Tweets } from "./tweets";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
   id: string;
   photo?: string;
   tweet: string;
   userId: string;
   username: string;
   createAt: number;
}

export const Timeline = () => {
   const [tweets, setTweets] = useState<ITweet[]>([]);

   useEffect(() => {
      let unsubscribe: Unsubscribe | null = null;
      // 트윗 불러오기
      const fetchTweets = async () => {
         const tweetsQuery = query(collection(db, "tweets"), orderBy("createdAt", "desc"), limit(15)); // 쿼리 생성

         // 이벤트 리스너 삽입
         unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
            const tweets = snapshot.docs.map((doc) => {
               const { photo, tweet, userId, username, createAt } = doc.data();
               return {
                  id: doc.id,
                  photo,
                  tweet,
                  userId,
                  username,
                  createAt,
               };
            });
            setTweets(tweets);
         });
      };
      fetchTweets();

      return () => {
         unsubscribe && unsubscribe();
      };
   }, []);
   return (
      <Wrapper>
         {tweets.map((tweet) => (
            <Tweets key={tweet.id} {...tweet} />
         ))}
      </Wrapper>
   );
};
