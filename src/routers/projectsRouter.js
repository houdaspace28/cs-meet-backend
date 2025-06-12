import { Router } from "express";
import { protect } from "../modules/auth.js";
import { 
    createProject, 
    getUserProjects, 
    deleteProject,
    getAllProjects,
    getProjectById,
    getProjectsBySearch,
    getProjectsByField
} from "../handlers/projectsHandlers.js";

const projectsRouter = Router();

projectsRouter.get("/", getAllProjects);  
projectsRouter.get("/search/:searchquery", getProjectsBySearch);
projectsRouter.get("/field/:field", getProjectsByField);
projectsRouter.get("/:id", getProjectById);        


projectsRouter.get("/me", protect, getUserProjects);    
projectsRouter.post("/", protect, createProject);       
projectsRouter.delete("/:id", protect, deleteProject);  

export default projectsRouter;
