import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res) => {
    const books = await prisma.book.findMany();
    res.json(books);
});

router.post('/', async (req, res) => {
    const { title, author, genre } = req.body;
    const book = await prisma.book.create({
        data: {
            title,
            author,
            genre
        }
    });
    res.status(201).json(book);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { author, title, genre } = req.body;

    const numericId = Number(id);
    const book = await prisma.book
        .update({
            where: {
                id: numericId
            },
            data: {
                author,
                title,
                genre
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message,
                error
            });
        });
    res.status(200).json(book);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const numericId = Number(id);

    const book = await prisma.book
        .delete({
            where: {
                id: numericId
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message,
                error
            });
        });
    res.status(200).json(book);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const numericId = Number(id);

    const books = await prisma.book
        .findMany({
            where: {
                id: numericId
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



router.get('/:genre', async (req, res) => {
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
