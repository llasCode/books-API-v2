import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/get/books', async (req, res) => {
    const books = await prisma.book.findMany();
    res.json(books);
});

router.post('/create/book', async (req, res) => {
    const { title, author, genre } = req.body;
    await prisma.book.create({
        data: {
            title,
            author,
            genre
        }
    });
    res.status(200).json({});
});

router.put('/edit/book', async (req, res) => {
    const { id } = req.query;
    const { author, title, genre } = req.body;

    if (typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing book' });
    }

    const numericId = Number(id);
    await prisma.book
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
    res.status(200).json({});
});

router.delete('/delete/book', async (req, res) => {
    const { id } = req.query;

    if (typeof id !== 'string') {
        res.status(400).json({ error: 'Invalid or missing book' });
    }
    const numericId = Number(id);

    await prisma.book
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
    res.status(200).json({});
});

router.get('/get/infoBook', async (req, res) => {
    const { id } = req.query;

    if (typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing id' });
    }
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

router.get('/get/getAuthorBooks', async (req, res) => {
    const { author } = req.query;
    if (typeof author !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing author' });
    }

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

router.get('/get/getGenreBooks', async (req, res) => {
    const { genre } = req.query;
    if (typeof genre !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing genre' });
    }

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
