import styled from "styled-components";
import { PostTweetForm } from "../components/post-tweet-form";

const Wrapper = styled.div``;

const Home = () => {
   return (
      <Wrapper>
         <PostTweetForm />
      </Wrapper>
   );
};

export default Home;
