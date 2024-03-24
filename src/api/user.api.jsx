export const userApi = {
  allUser: "/user/all/",
  allActiveUser: "/user/",
  userById: "/user/:id",
  blockUser: "/user/restore/:id",
  likeAndDislikeThink: "/like/post/",
  likeComment: "/like/comment/",
  userSavedPosts: "/think/save/",
  addImage: "/user/image?id=",
  changeUserPass: "/auth/change-password",
  verifyMail: "/verify/activated?gmail=:params",
  forgotPassVerify: "/auth/forgot-password?email=:params",
};
