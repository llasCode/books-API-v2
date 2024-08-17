import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/:author/books', async (req, res) => {
    const { author } = req.params;

    const books = await prisma.book
        .findMany({
            where: {
                author
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message,
                error
            });
        });
    res.json(books);
});

export = router;
