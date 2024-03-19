import { useState, useEffect } from "react";
import styled from "styled-components";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { Tweet } from "./tweet";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
   id: string;
   photo?: string; // 사진은 선택사항
   tweet: string;
   userId: string;
   username: string;
   createAt: number;
}

const Wrapper = styled.div``;

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
         unsubscribe && unsubscribe(); // 구독이 취소되었을 때 실행
      };
   }, []);
   return (
      <Wrapper>
         {tweets.map((tweet) => (
            <Tweet key={tweet.id} {...tweet} />
         ))}
      </Wrapper>
   );
};
