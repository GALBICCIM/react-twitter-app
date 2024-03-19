import styled from "styled-components";
import { PostTweetForm } from "../components/post-tweet-form";
import { Timeline } from "../components/timeline";

const Wrapper = styled.div`
   display: grid;
   gap: 50px;
   overflow-y: auto;
   grid-template-rows: 1fr 5fr;
`;

const Home = () => {
   return (
      <Wrapper>
         <PostTweetForm />
         <Timeline />
      </Wrapper>
   );
};

export default Home;
