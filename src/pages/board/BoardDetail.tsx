import { useParams } from "react-router";
import { useState } from "react";
import type { PostType } from "./BoardPage.tsx";

function BoardDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState();

  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(res => res.json())
    .then((json: PostType[]) => {setDetail(json)})
    .catch(err => console.log(err));

  return <></>
}

export default BoardDetail;