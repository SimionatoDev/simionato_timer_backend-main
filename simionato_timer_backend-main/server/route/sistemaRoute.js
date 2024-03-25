const express = require('express');
const router = express.Router();

router.get('/api/sistema', async function(req, res) {
   res.status(200).json({msg:'SISTEMA NO AR !'});
})


module.exports = router;