import AccessAlarmsOutlinedIcon from "@mui/icons-material/AccessAlarmsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { useState,useContext,useEffect } from "react";
import AppCtx from "../../appContext";
import { Tooltip } from "@mui/material";
import CommentList from "../comments/CommentList";
import { COMMON,transferDate } from "../Common";

const PostContent = (props) => {
  const appCtx = useContext(AppCtx);
  const userId = appCtx.userInfo?._id;
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const data = props.postContent.data;
  const postId = data._id;
  const userLikeArr = data.usersLike;
  const bookmark = appCtx.userInfo?.listBookmark;
  const [listBk, setListBK] = useState([]);
  const [countLike,setCountLike] = useState(userLikeArr.length ? userLikeArr.length : 0);
  const [isLove, setIsLove] = useState(false);
  const [justLiked, setJustLiked] = useState(false);
  const [justSave, setJustSave] = useState(false);
  const [justUnsave, setJustUnsave] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (userLikeArr.indexOf(userId) > -1) 
      setIsLove(true);
  },[userId])

  useEffect(() => {
    if (bookmark)
      if (bookmark.indexOf(postId) > -1) {
        setIsSaved(true);
        setListBK(bookmark);
      }
  },[bookmark])

  const handleLike = () => {
    
    if (token) {
      setJustLiked(true);

      const bodyData = {
        "_id":data._id,
        "userLike":[...userLikeArr,userId]
      }

      fetch(`${COMMON.DOMAIN}posts/like`,{
        method: "PATCH",
        headers: {
          'Content-type':'application/json',
          'Authorization':"Bearer "+token
        },
        body: JSON.stringify(bodyData)
      })
      .then(res => res.json())
      .then(resJson => {
        if (resJson.message === "success") {
          setCountLike(prev => prev + 1);
          setIsLove(true);
        }
      });
    } else {
      appCtx.setOpenLoginNotify(true);
    }
  };

  const handleUnsave = () => {
    if (token) {
      setJustUnsave(true);
      listBk.splice(listBk.indexOf(postId,1))
      console.log(listBk,"bỏ lưu");

      let bodyData = {
        "listBookmark":[...listBk]
      }

      fetch(`${COMMON.DOMAIN}user/update`,{
        method: "PATCH",
        headers: {
          'Content-type':'application/json',
          'Authorization':"Bearer "+token
        },
        body: JSON.stringify(bodyData)
      })
      .then(res => res.json())
      .then(resJson => {
        if (resJson.message === "success") {
          setJustUnsave(false);
          setIsSaved(false);
          setListBK(resJson.data.listBookmark);
        }
      });
    } else {
      appCtx.setOpenLoginNotify(true);
    }
  }

  console.log(listBk);

  const handleSave = () => {
    if (token) {
      setJustSave(true);
     
      let bodyData = {
        "listBookmark":[...listBk,"622ce6f975faa48f08c2c35f"]
      }
      console.log(listBk,"lưu");

      fetch(`${COMMON.DOMAIN}user/update`,{
        method: "PATCH",
        headers: {
          'Content-type':'application/json',
          'Authorization':"Bearer "+token
        },
        body: JSON.stringify(bodyData)
      })
      .then(res => res.json())
      .then(resJson => {
        if (resJson.message === "success") {
          setJustSave(false);
          setIsSaved(true);
          setListBK(resJson.data.listBookmark);
        }
      });
    } else {
      appCtx.setOpenLoginNotify(true);
    }
  }

  useEffect(() => {
    document.getElementById("html-content").innerHTML = data.content;
  },[]);

  return (
    <>
      <div className="post-content">
        <h1>{data.title}</h1>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="d-flex align-items-center flex-start">
            <AccessAlarmsOutlinedIcon
              style={{ color: "#6c757d" }}
              fontSize="sm"
            />
            <div className="ms-2 text-secondary fs-6">{transferDate(data.createdAt)}</div>
          </div>
          <div className="me-md-4 me-0 border rounded-circle p-1">
            <Tooltip title="Lưu bài viết">
              {
                isSaved
                 ? <BookmarkIcon onClick={!justUnsave ? handleUnsave : null} style={{color:"#1373b7"}}/>
                 : <BookmarkAddIcon onClick={!justSave ? handleSave : null}/>
              }
            </Tooltip>
          </div>
        </div>
        {data.description && (
          <div className="mt-4 mb-3 fs-4">{data.description}</div>
        )}
        {data.type === 1 && (
          <div className="mt-4">
            <h4>Chuẩn bị nguyên liệu cho món ăn</h4>
            <ul className="dishes-ingredients mt-4">
              {data.ingredients.map((item,index) => {
                return (
                  <li key={index}>
                    <div className="">
                      <div className="h5 me-2">
                        <span>{item.nameIngredient}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <div className="mt-4 fs-4" id="html-content"></div>
        <div className="fs-5 mt-3 fw-bold">{data.authorName}</div>
      </div>
      <div className="mt-4">
        <div className="mb-3"> 
          {
            isLove 
            ? 
              <FavoriteIcon
                className="d-inline-block"
                style={{ color: "#d83737" }}
              />
            : 
              <FavoriteBorderOutlinedIcon
                className="d-inline-block"
                onClick={!justLiked ? handleLike : null}
              />
            }
          <div className="ms-2 d-inline-block h6 mb-0">
            {countLike} Lượt thích
          </div>
        </div>
        <CommentList postId={data._id}/>
      </div>
    </>
  );
};

export default PostContent;
