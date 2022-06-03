import express from 'express';
import Auth from '../middleware/Auth';
import Auditlog from '../controller/Auditlog';
var router = express.Router()

router.post('/get-list', Auth.verifyToken, Auditlog.getAll);

export default router;