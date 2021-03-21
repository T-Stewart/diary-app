const express = require('express');
const router = express.Router();

const PostContoller = require('../Controllers/Post');

router.get('/', PostContoller.Index);
router.post('/', PostContoller.Create);
router.get('/new', PostContoller.New);
router.post('/delete', PostContoller.Delete);
router.post('/update', PostContoller.Update);
router.post('/retrieve', PostContoller.findOne);
router.get('/update', PostContoller.Index);

module.exports = router;