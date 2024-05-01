
const { Router } = require('express');
const axios = require('axios');

const router = Router();

const CLIENT = "1961466497648581804"
const AUTH_ENDPOINT = "https://apis.roblox.com/oauth/v1/authorize";
const TOKEN_ENDPOINT = "https://apis.roblox.com/oauth/v1/token";
const PROFILE_ENDPOINT = "https://apis.roblox.com/oauth/v1/userinfo"
const REDIRECT_URI = "http://localhost:10000/api/callback";
const SCOPE = "openid%20profile"
const RESPONSE = "code"

const HOME = "http://localhost:3000/home"

var data;

// API to send users to the ROBLOX page
router.get('/api/authenticate', (req,res) => {
    const redirect = `${AUTH_ENDPOINT}?client_id=${CLIENT}&scope=${SCOPE}&response_type=${RESPONSE}&redirect_uri=${REDIRECT_URI}`
    res.json({redirect});
});

// Callback API that performs a post request with the authCode in exchange for the token
router.get('/api/callback', async (req,res) => {
    try {
        const authCode = req.query.code;
        const resp = await axios.post(TOKEN_ENDPOINT, {
            code: authCode,
            grant_type: 'authorization_code',
            client_id: CLIENT,
            client_secret: process.env.SECRET
        },
        {
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            }
        })
        data = resp.data;
        res.redirect(HOME);
    }
    catch(error) {
        console.error("Error in API Callback ", error);
        res.status(500).send("Internal Server Error");
    }
})

router.get('/api/checkauth', async(req,res) => {
    try {
        if (data) {
            res.status(200).send("Data found");
            
        } else {
            res.status(400).send("No data found");
        }
    } catch (error) {
        console.error("Error checking authentication: ", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/api/getusername', async(req,res) => {
    try {
        const accessToken = data.access_token;
        const resp = await axios.get(PROFILE_ENDPOINT,
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        res.json(resp.data.name);
    }
    catch(error) {
        console.log("Error in /api/getusername", error);
        res.status(500).send("internal server error")
    }

})

router.get('/api/getuserpicture', async(req,res) => {
    try {
        const accessToken = data.access_token;
        const resp = await axios.get(PROFILE_ENDPOINT,
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        res.json(resp.data.picture);
    }
    catch(error) {
        console.log("Error in /api/getusername", error);
        res.status(500).send("internal server error")
    }

})



module.exports = router;