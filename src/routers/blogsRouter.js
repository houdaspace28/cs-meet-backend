import { Router } from "express";
import { protect } from "../modules/auth.js";
import { 
    getAllBlogs,
    getBlogsBySearch,
    getBlogsByField,
    getBlogById,
    getUserBlogs,
    createBlog,
    deleteBlog
} from "../handlers/blogsHandlers.js";

const blogsRouter = Router();


blogsRouter.get("/", getAllBlogs);  
blogsRouter.get("/search/:searchquery", getBlogsBySearch);
blogsRouter.get("/field/:field", getBlogsByField);
blogsRouter.get("/:id", getBlogById);        


   
blogsRouter.delete("/:id", protect, deleteBlog);  

export default blogsRouter;