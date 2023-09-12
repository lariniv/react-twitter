import Title from "../../component/title";
import Box from "../../component/box";
import Flex from "../../component/flex";
import PostCreate from "../post-create";
import { Skeleton, Alert } from "../../component/load";

import { useState, Fragment } from "react";
import { LOAD_STATUS } from "../../component/load";
import getDate from "../../util/getDate";
import PostItem from "../post-item";

function PostList() {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);

  const getData = async () => {
    setStatus(LOAD_STATUS.PROGRESS);

    try {
      const res = await fetch("http://localhost:4000/post-list");

      const data = await res.json();

      if (res.ok) {
        setData(convertData(data));
        setStatus(LOAD_STATUS.SUCCESS);
      } else {
        setStatus(LOAD_STATUS.ERROR);
        setMessage(data.message);
      }
    } catch (err) {
      setMessage(err.message);
      setStatus(LOAD_STATUS.ERROR);
    }
  };

  const convertData = (raw) => ({
    list: raw.list.reverse().map(({ id, userName, text, date }) => ({
      id,
      userName,
      text,
      date: getDate(date),
    })),

    isEmpty: raw.list.length === 0,
  });

  if (status === null) {
    getData();
  }
  return (
    <div>
      <Flex>
        <Box>
          <Flex>
            <Title>Carta</Title>
            <PostCreate
              onCreate={getData}
              placeholder="What's happening"
              button="Post"
            />
          </Flex>
        </Box>

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

        {status === LOAD_STATUS.SUCCESS && (
          <Fragment>
            {data.isEmpty ? (
              <Alert message={"List is empty"} />
            ) : (
              <Flex>
                {data.list.map((item) => (
                  <div key={item.id}>
                    <PostItem {...item} />
                  </div>
                ))}
              </Flex>
            )}
          </Fragment>
        )}
      </Flex>
    </div>
  );
}

export default PostList;
