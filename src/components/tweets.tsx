import { ITweet } from "./timeline";
import * as Style from "../styles/TweetFieldStyle";

export const Tweets = ({ username, photo, tweet }: ITweet) => {
   return (
      <Style.Wrapper>
         <Style.Columns>
            <Style.Username>{username}</Style.Username>
            <Style.Payload>{tweet}</Style.Payload>
         </Style.Columns>
         {photo ? (
            <Style.Columns>
               <Style.Photo src={photo} />
            </Style.Columns>
         ) : null}
      </Style.Wrapper>
   );
};
