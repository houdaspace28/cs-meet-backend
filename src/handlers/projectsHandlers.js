import prisma from "../db.js";

// Get all projects (public browsing)
export const getAllProjects = async (req, res) => {
    try {
        const projects = await prisma.project.findMany();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects" });
    }
};

export const getProjectsBySearch = async (req, res) => {
    const { searchquery } = req.params;
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { title: { contains: searchquery, mode: 'insensitive' } },
          { description: { contains: searchquery, mode: 'insensitive' } }
        ]
      }
    });
    res.json(projects); // <-- Add this line!
}

export const getProjectsByField = async (req, res) => {
    const { field } = req.params;
    const projects = await prisma.project.findMany({
        where: { field }
    });
    res.json(projects);
}

export const getProjectById = async (req, res) => {
    try {
        const project = await prisma.project.findUnique({
            where: { id: req.params.id },
            include: {
                belongsTo: {
                    select: {
                        username: true,
                        profilePic: true
                    }
                }
            }
        });
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: "Error fetching project" });
    }
};

// Get user's own projects (protected)
export const getUserProjects = async (req, res) => {
    try {
        const projects = await prisma.project.findMany({
            where: {
                userId: req.user.id
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user projects" });
    }
};

// Create project (protected)
export const createProject = async (req, res) => {
    try {
        const { title, field, stack, picture } = req.body;
        const project = await prisma.project.create({
            data: {
                title,
                field,
                stack,
                picture,
                userId: req.user.id
            }
        });
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: "Error creating project" });
    }
};

// Delete project (protected)
export const deleteProject = async (req, res) => {
    try {
        const project = await prisma.project.delete({
            where: {
                id: req.params.id,
                userId: req.user.id // Ensures user can only delete their own projects
            }
        });
        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting project" });
    }
};
