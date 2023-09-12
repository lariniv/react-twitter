import { useState, Fragment } from "react";
import Box from "../../component/box";
import Flex from "../../component/flex";
import PostContent from "../../component/post-content";
import PostCreate from "../post-create";

import { LOAD_STATUS, Alert, Skeleton } from "../../component/load";
import getDate from "../../util/getDate";

function PostItem({ id, userName, text, date }) {
  const [data, setData] = useState({
    id,
    userName,
    text,
    date,
    reply: null,
  });

  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const getData = async () => {
    setStatus(LOAD_STATUS.PROGRESS);

    try {
      const res = await fetch(`http://localhost:4000/post-item?id=${data.id}`);

      const resData = await res.json();

      if (res.ok) {
        setData(convertData(resData));
        setStatus(LOAD_STATUS.SUCCESS);
      } else {
        setMessage(resData.message);
        setStatus(LOAD_STATUS.ERROR);
      }
    } catch (err) {
      setMessage(err.message);
      setStatus(LOAD_STATUS.ERROR);
    }
  };

  const convertData = ({ post }) => ({
    id: post.id,
    userName: post.userName,
    text: post.text,
    date: getDate(post.date),

    reply: post.reply.reverse().map((post) => ({
      id: post.id,
      userName: post.userName,
      text: post.text,
      date: getDate(post.date),
    })),

    isEmpty: post.reply.length === 0,
  });
  const [isOpen, setOpen] = useState(null);

  const handleOpen = () => {
    if (status === null) {
      getData();
    }

    setOpen(!isOpen);
  };
  return (
    <Box style={{ padding: "0px" }}>
      <div style={{ padding: "20px", cursor: "pointer" }} onClick={handleOpen}>
        <PostContent
          userName={data.userName}
          date={data.date}
          text={data.text}
        />
      </div>

      {isOpen && (
        <div style={{ padding: "0px 20px 20px 20px" }}>
          <Flex>
            <Box>
              <PostCreate
                placeholder="Post yout reply"
                button="Reply"
                id={data.id}
                onCreate={getData}
              />

              {status === LOAD_STATUS.PROGRESS && (
                <Fragment>
                  <Box>
                    <Skeleton />
                  </Box>

                  <Box>
                    <Skeleton />
                  </Box>
                </Fragment>
              )}

              {status === LOAD_STATUS.ERROR && (
                <Alert status={status} message={message} />
              )}

              {status === LOAD_STATUS.SUCCESS &&
                data.isEmpty === false &&
                data.reply.map((item) => (
                  <Fragment key={item.id}>
                    <Box>
                      <PostItem {...item} />
                    </Box>
                  </Fragment>
                ))}
            </Box>
          </Flex>
        </div>
      )}
    </Box>
  );
}

export default PostItem;
