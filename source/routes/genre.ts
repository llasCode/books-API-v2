import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/:genre/books', async (req, res) => {
    const { genre } = req.params;

    const books = await prisma.book
        .findMany({
            where: {
                genre
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
