import express, { Router } from 'express';

import { getUser, getUsers, postUser, putUser } from '../controllers';

// eslint-disable-next-line
const router: Router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', postUser);
router.put('/:userId', putUser);

export default router;
