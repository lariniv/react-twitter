import "./index.css";

import Flex from "../flex";

function PostContent({ userName, date, text }) {
  return (
    <Flex>
      <div className="post-content">
        <span className="post-content__username">@{userName}</span>
        <span className="post-content__date">{date}</span>
      </div>

      <p className="post-content__text">{text}</p>
    </Flex>
  );
}

export default PostContent;
