import prisma from "../db.js";


export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await prisma.blog.findMany();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects" });
    }
};

export const getBlogsBySearch = async (req, res) => {
    const { searchquery } = req.params;
    const blogs = await prisma.blog.findMany({
      where: {
        OR: [
          { title: { contains: searchquery, mode: 'insensitive' } },
          { excerpt: { contains: searchquery, mode: 'insensitive' } },
          { content: { contains: searchquery, mode: 'insensitive' } }
        ]
      }
    });
    res.json(blogs); // <-- Add this line!
}

export const getBlogsByField = async (req, res) => {
    const { field } = req.params;
    const blogs = await prisma.blog.findMany({
        where: { field }
    });
    res.json(blogs);
}

export const getBlogById = async (req, res) => {
    try {
        const blog = await prisma.blog.findUnique({
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
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blog" });
    }
};

// Get user's own projects (protected)
export const getUserBlogs = async (req, res) => {
    try {
        const blogs = await prisma.blog.findMany({
            where: {
                userId: req.user.id
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user blogs" });
    }
};

// Create project (protected)
export const createBlog = async (req, res) => {
    console.log(req.body);
    try {
        const { title, field, excerpt, readTime, tags, picture, content, userId } = req.body;
        const blog = await prisma.blog.create({
            data: {
                title,
                field,
                excerpt,
                readTime,
                tags,
                picture,
                content,
                userId
            }
        });
        res.status(201).json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating blog" });
    }
};

// Delete project (protected)
export const deleteBlog = async (req, res) => {
    try {
        const blog = await prisma.blog.delete({
            where: {
                id: req.params.id,
                userId: req.user.id // Ensures user can only delete their own projects
            }
        });
        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting blog" });
    }
};
