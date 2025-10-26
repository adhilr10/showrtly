import { Router } from 'express';
import authRoute from '@/routes/auth'

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello world', status: 'ok' });
});



// Auth Routes
router.use('/auth', authRoute)

export default router;
