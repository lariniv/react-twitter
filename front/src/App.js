import React from "react";
import Page from "./component/page";
import PostList from "./container/post-list";

function App() {
  return (
    <div>
      <Page>
        <PostList />
      </Page>
    </div>
  );
}

export default App;
