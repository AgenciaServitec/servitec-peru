import express, { Router } from 'express';

import { getUser, getUserByDni, postUser } from '../controllers';

// eslint-disable-next-line
const router: Router = express.Router();

router.get('/', getUser);
router.get('/:dni', getUserByDni);
router.post('/', postUser);

export default router;
