import { useState,useEffect,useContext,useRef } from "react";
import AppCtx from "../../appContext";
import { Skeleton } from "@mui/material";
import CommentItem from "./CommentItem";
import CommentIcon from '@mui/icons-material/Comment';
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import {COMMON} from "../Common";

const CommentList = (props) => {
  const appCtx = useContext(AppCtx);
  const token = sessionStorage.getItem("token") || localStorage.getItem("token");
  const [commentList,setCommentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [isError, setIsError] = useState(false);
  const [disableSend, setDisableSend] = useState(true);
  const comVal = useRef(null);
  
  useEffect(() => {
    fetch(`${COMMON.DOMAIN}comments?postId=${props.postId}`)
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.message === "success") {
          setIsLoading(false);
          setCommentList(resJson.data);
        }
      });
  },[props.postId]);

  const handleTextFieldChange = (event) => {
    if (event.target.value) {
      setIsError(false);
      setDisableSend(false);
    } else {
      setDisableSend(true);
    }
      
    setComment(event.target.value);
  }

  const handleSendComment = () => {
    
    if (token) {
      setDisableSend(true);
      if (comment) {
        const bodyJson = {
          "postId":props.postId,
          "content":comment
        }

        fetch(`${COMMON.DOMAIN}comments/create`,{
          method: "POST",
          headers: {
            'Content-type':'application/json',
            'Authorization':"Bearer "+token
          },
          body: JSON.stringify(bodyJson)
        })
        .then(res => res.json())
        .then(resJson => {
          if (resJson.message === "success") {
            const userName = appCtx.userInfo?.nameDisplay;
            resJson.data.nameDisplay = userName;
            setComment(null);
            comVal.current.value = "";
            setCommentList(prev => [...prev,resJson.data]);
          }
          setDisableSend(false);
        });
      } else {
        setIsError(true);
      }
    } else {
      appCtx.setOpenLoginNotify(true);
    }
  }

  return <>
    <div className="mt-4 mb-2 d-flex align-items-center">
      <CommentIcon style={{color:"#3e9294"}} fontSize="large"/>
      <div className="fs-4 ms-2">Bình luận</div>
    </div>
    <div className="d-flex align-items-top">
      <TextareaAutosize
        placeholder="Ý kiến của bạn..."
        aria-label="minimum height"
        minRows={3}
        ref={comVal}
        defaultValue={comment ? comment : ""}
        className={"w-75 border rounded " + (isError ? " border-danger" : "border-secondary")}
        onChange={handleTextFieldChange}
      />
      <div className="ms-3">
        <Button
          disabled = {disableSend}
          variant="contained"
          endIcon={<SendIcon />}
          className="bg-3e9294"
          onClick={handleSendComment}
        >
          Send
        </Button>
      </div>
    </div>
    <div className="mt-4">
      <div>
        {
          commentList && commentList.map((item,index) => {
            return <CommentItem key={index} data={item}/>
          })
        }
      </div>
      {
        isLoading ? <SkeletonComList/> : null
      }
    </div>
  </>
}

const SkeletonCom = () => {
  return <div className="mb-3 w-75">
    <div className="d-flex align-items-top">
      <Skeleton variant="circular" className="me-3" width={40} height={40} />
      <Skeleton width="30%"/>
    </div>
    <Skeleton />
    <Skeleton />
  </div>
}

const SkeletonComList = () => {
  return <>
    <SkeletonCom />
    <SkeletonCom />
    <SkeletonCom />
  </>
}

export default CommentList;