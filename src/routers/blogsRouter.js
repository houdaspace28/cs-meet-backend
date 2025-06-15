import { Router } from "express";
import { protect } from "../modules/auth.js";
import { 
    getAllBlogs,
    getBlogsBySearch,
    getBlogsByField,
    getBlogsByUserId,
    getUserBlogs,
    createBlog,
    deleteBlog
} from "../handlers/blogsHandlers.js";

const blogsRouter = Router();


blogsRouter.get("/", getAllBlogs);  
blogsRouter.get("/search/:searchquery", getBlogsBySearch);
blogsRouter.get("/field/:field", getBlogsByField);
blogsRouter.get("/:id", getBlogsByUserId);  
blogsRouter.delete("/:blogId", deleteBlog);
blogsRouter.post("/", createBlog);


blogsRouter.delete("/:id", protect, deleteBlog);  

export default blogsRouter;