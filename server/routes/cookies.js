import express from 'express';
const router = express.Router();

router.get('/initialize', (req, res) => {
  if (req.user !== undefined) {
    console.log('=====REQ USER FOUND======', req.session)
    // res.send the user info to APP
    res.status(200).json({
      success: true,
      message: req.user,
    });
  } else {
    console.log('=====REQ USER NOT FOUND======', req.session)
    // res.send the user info to APP
    res.status(500).json({
      success: false,
    });
  }
})





export default router;
