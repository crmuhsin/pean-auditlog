import express from 'express';
import Auth from '../middleware/Auth';
import Sites from '../controller/Sites';
var router = express.Router()

router.post('/save', Auth.verifyToken, Sites.saveSite);
router.post('/get-by-id', Auth.verifyToken, Sites.getOne);
router.post('/get-list', Auth.verifyToken, Sites.getAll);
router.post('/get-total-count', Auth.verifyToken, Sites.getTotalCount);
router.post('/update', Auth.verifyToken, Sites.update);

export default router;