export const getUserPic = async (setUserPic, navigate) => {
    try {
        // Fetch user picture
        const res = await fetch('http://localhost:10000/api/getuserpicture');
        if (res.ok) {
            const userPicData = await res.json();
            setUserPic(userPicData);
        } else {
            console.log("Failed to fetch user picture");
            navigate("/");
        }
    } catch (error) {
        console.error("Error fetching user picture:", error);
        navigate("/");
    }
}

export const checkAuth = async (setAuthenticated) => {
    try {
        const res = await fetch('http://localhost:10000/api/checkauth');
        if (res.ok) {
            console.log("authenticated")
            setAuthenticated(true)
        }
        else {
            console.log("not authenticated")
            setAuthenticated(false)
        }
    }
    catch(error) {
        console.log("Error in checkAuth(): " + error);
        setAuthenticated(false)
    }
}

export const checkStatus = async (navigate, setUser,setUserPic) => {
    try {
        const res = await fetch('http://localhost:10000/api/checkauth');
        if (res.ok) {
            console.log("authenticated")
            getUser(navigate, setUser,setUserPic);
        } else {
            console.log("not authenticated")
            navigate("/")
        }
    } catch (error) {
        console.log("status could not be fetched.", error)
        navigate("/")
    }
}

export const getUser = async (navigate, setUser, setUserPic) => {
    try {
        const res = await fetch('http://localhost:10000/api/getusername');
        const res2 = await fetch('http://localhost:10000/api/getuserpicture');
        if (res.ok && res2.ok) {
            const userData = await res.json();
            setUser(userData)
            setUserPic(await res2.json());
        } else {
            console.log("Failed to fetch user data");
            navigate("/")
        }
    } catch (error) {
        console.log("Error fetching user data:", error);
        navigate("/")
    }
}

