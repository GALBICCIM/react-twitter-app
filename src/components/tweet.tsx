import { ITweet } from "./timeline";
import * as Style from "../styles/TweetFieldStyle";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

export const Tweet = ({ username, photo, tweet, userId, id }: ITweet) => {
   const user = auth.currentUser;

   const onDelete = async () => {
      const ok = confirm("Are you sure you want to delete this tweet?");

      // 지우는 것에 동의하지 않으면, 로그인 된 유저와 트윗 작성자의 아이디가 다를 때 함수 종료
      if (!ok || user?.uid !== userId) return;

      try {
         await deleteDoc(doc(db, "tweets", id)); // 트윗 삭제

         // 만약 사진이 존재하면 사진도 같이 삭제
         if (photo) {
            const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
            await deleteObject(photoRef);
         }
      } catch (e) {
         console.log(e);
      } finally {
      }
   };

   return (
      <Style.Wrapper>
         <Style.Columns>
            <Style.Username>{username}</Style.Username>
            <Style.Payload>{tweet}</Style.Payload>
            {user?.uid === userId ? <Style.DeleteButton onClick={onDelete}>Delete</Style.DeleteButton> : null}
         </Style.Columns>
         {photo ? (
            <Style.Columns>
               <Style.Photo src={photo} />
            </Style.Columns>
         ) : null}
      </Style.Wrapper>
   );
};
