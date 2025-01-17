import BookmarkSharpIcon from "@mui/icons-material/BookmarkSharp";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { useState, useEffect, useContext } from "react";
import { http } from "../profile/config";
import { spliceString} from "../Common";
import AppCtx from "../../appContext";
import { NavLink } from "react-router-dom";
const SavedPost = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [bookmarkPosts, setBookmarkPosts] = useState(null);
    const [postLength, setPostLength] = useState(3);
    const {userInfo, setUserInfo} = useContext(AppCtx)
    useEffect(() => {
        if (userInfo) {
            setIsLoading(true);
            http.post(`posts/bookmark`, {
                bk: userInfo.listBookmark,
                p: "1",
                s: `${postLength}`,
            }).then((res) => {
                const bookmarks = res.data.data;

                if (!bookmarkPosts) {
                    setBookmarkPosts(bookmarks.map((bookmark) => ({ ...bookmark, isSaved: true })));
                    setIsLoading(false);
                    return;
                }

                const bookmarkPostsNew = bookmarkPosts.map((bookmarkPost) => {

                    const isSaved = bookmarks.findIndex((bookmark) => bookmark._id === bookmarkPost._id) > -1;

                    if (isSaved) bookmarkPost.isSaved = true;
                    else bookmarkPost.isSaved = false;

                    return bookmarkPost;
                });

                setBookmarkPosts(bookmarkPostsNew);
                setIsLoading(false);
            });
        }
    }, [userInfo, postLength]);
    
    const handleUnsavePost = (idPost) => {
        const bookmarkIndex = userInfo.listBookmark.indexOf(idPost);
        const data = {
            listBookmark: [
                ...userInfo.listBookmark.slice(0, bookmarkIndex),
                ...userInfo.listBookmark.slice(bookmarkIndex + 1),
            ],
            
        };
        
        http.patch("user/update", data).then((res) => {
            if (res.data.message === "success") {
                setUserInfo(res.data.data);
            }
        });

    };

    const handleSavePost = (idPost) => {
        const data = {

            listBookmark: [...userInfo.listBookmark, idPost],
        };

        http.patch("user/update", data).then((res) => {
            if (res.data.message === "success") {
                setUserInfo(res.data.data);
            }
        });
    };
    const loadMorePosts = () => {
        setPostLength((prev) => prev + 5);
    };

    return (
        <div className="saved-post col-md-8 border ml-2 mt-4 mt-md-0 pt-3">
            {!isLoading &&
                bookmarkPosts &&
                bookmarkPosts.map((bookmark, index) => {
                    return (
                        <div className="row mb-3 mb-md-0" index={index} key={bookmark._id}>
                            <div className="col-12 m-2">
                                <div className="row align-items-stretch">
                                    <div className="col-3">
                                        <NavLink to={"/chi-tiet/" + bookmark._id}>
                                            <div
                                                className="ratio ratio-1x1 border rounded image-background new-recipes-try"
                                                style={{ backgroundImage: `url(${bookmark.avatar})` }}
                                            ></div>
                                        </NavLink>
                                    </div>
                                    <div className="col-8 ps-0">
                                        <NavLink to={"/chi-tiet/" + bookmark._id}>
                                            <h5 className="text-dark text-06a682-hover">
                                                {bookmark.title}
                                            </h5>
                                        </NavLink>
                                        
                                        <div className="d-none d-md-block">{spliceString(bookmark.description)}</div>
                                    </div>
                                    <div className="col-1">
                                        <div className="d-flex me-5 h-100 justify-content-center align-items-center">
                                            {bookmark.isSaved ? (
                                                <BookmarkSharpIcon
                                                    sx={{ fontSize: 30, cursor: "pointer" }}
                                                    color={"primary"}
                                                    onClick={() => {
                                                        handleUnsavePost(bookmark._id);
                                                    }}
                                                />
                                            ) : (
                                                <BookmarkAddIcon
                                                    sx={{ fontSize: 40, cursor: "pointer" }}
                                                    onClick={() => {
                                                        handleSavePost(bookmark._id);
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            {isLoading && (
                <div className="row">
                    <div className="col-12 m-2">
                        <div className="row">
                            <div className="col-md-3 col-4">
                                <div className="skeleton h-100"></div>
                            </div>
                            <div className="col-md-9 col-8 px-4">
                                <div className="d-flex flex-column h-100">
                                    <div className="pb-3 skeleton mt-2 " />
                                    <div className="pb-3 skeleton mt-2 " />
                                    <div className="pb-3 skeleton mt-2 " />
                                    <div className="pb-3 skeleton mt-2 flex-grow-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 m-2">
                        <div className="row">
                            <div className="col-md-3 col-4">
                                <div className="skeleton h-100"></div>
                            </div>
                            <div className="col-md-9 col-8 px-4">
                                <div className="d-flex flex-column h-100">
                                    <div className="pb-3 skeleton mt-2 " />
                                    <div className="pb-3 skeleton mt-2 " />
                                    <div className="pb-3 skeleton mt-2 " />
                                    <div className="pb-3 skeleton mt-2 flex-grow-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 m-2">
                        <div className="row">
                            <div className="col-md-3 col-4">
                                <div className="skeleton h-100"></div>
                            </div>
                            <div className="col-md-9 col-8 px-4">
                                <div className="d-flex flex-column h-100">
                                    <div className="pb-3 skeleton mt-2 " />
                                    <div className="pb-3 skeleton mt-2 " />
                                    <div className="pb-3 skeleton mt-2 " />
                                    <div className="pb-3 skeleton mt-2 flex-grow-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 m-2">
                        <div className="row">
                            <div className="col-md-3 col-4">
                                <div className="skeleton h-100"></div>
                            </div>
                            <div className="col-md-9 col-8 px-4">
                                <div className="d-flex flex-column h-100">
                                    <div className="pb-3 skeleton mt-2 " />
                                    <div className="pb-3 skeleton mt-2 " />
                                    <div className="pb-3 skeleton mt-2 " />
                                    <div className="pb-3 skeleton mt-2 flex-grow-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 m-2">
                        <div className="row">
                            <div className="col-md-3 col-4">
                                <div className="skeleton h-100"></div>
                            </div>
                            <div className="col-md-9 col-8 px-4">
                                <div className="d-flex flex-column h-100">
                                    <div className="pb-3 skeleton mt-2 " />
                                    <div className="pb-3 skeleton mt-2 " />
                                    <div className="pb-3 skeleton mt-2 " />
                                    <div className="pb-3 skeleton mt-2 flex-grow-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 m-2">
                        <div className="row">
                            <div className="col-md-3 col-4">
                                <div className="skeleton h-100"></div>
                            </div>
                            <div className="col-md-9 col-8 px-4">
                                <div className="d-flex flex-column h-100">
                                    <div className="pb-3 skeleton mt-2 " />
                                    <div className="pb-3 skeleton mt-2 " />
                                    <div className="pb-3 skeleton mt-2 " />
                                    <div className="pb-3 skeleton mt-2 flex-grow-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="row justify-content-center">
                {bookmarkPosts && bookmarkPosts.length === postLength && (
                    <div
                        className="col-auto border border-dark rounded-pill lh-lg mt-4"
                        onClick={() => {
                            loadMorePosts();
                        }}
                    >
                        Xem thêm
                    </div>
                )}
            </div>
        </div>
    );
};
export default SavedPost;
