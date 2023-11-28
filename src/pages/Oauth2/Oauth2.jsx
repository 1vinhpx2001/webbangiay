import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { decodeToken } from "react-jwt";
import { addToLocalStorage } from "../../utils/tokenHandle";
import { Box, Typography } from "@mui/material";
import { addUserToLocalStorage } from "../../utils/userHandle";
import { getUserByID } from "../../api/UserApi";


export default function Oauth2() {
    const [findParams, setSearchParams] = useSearchParams();

    let navigate = useNavigate()
    if (findParams.get('success') === 'true') {

        let oauth2 = decodeToken(findParams.get('token'))
        let userId = oauth2.sub.split(',')[0]

        addToLocalStorage(findParams.get('token'))
        window.history.replaceState(null, null, window.location.pathname);
        let user = async () => {
            let res = await getUserByID(userId)
            return res
        }
        user().then((res) => {
            if (res.success) {
                let curUser = res.data
                addUserToLocalStorage(curUser.id, curUser.email, curUser.name, curUser.avatar, curUser.gender, curUser.role);
                navigate('/')
                window.location.reload();
            }
        })
    }
    else {
        window.history.replaceState(null, null, window.location.pathname);
        toast.error('Vui lòng đăng nhập với tài khoản đã có trong hệ thống', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }
    return (
        <div hidden={findParams.get('success') === 'true' ? true : false}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                <Typography variant="h4" color={'red'}>
                    ĐĂNG NHẬP THẤT BẠI !
                </Typography>
                <Typography variant="h6" color={'black'}>
                    Vui lòng đăng nhập với tài khoản đã có trong hệ thống
                </Typography>
                
                <Link to="/" className="mt-4 inline-block rounded bg-yellow-700 px-4 py-2 font-semibold text-white hover:bg-yellow-600"> Về Trang chủ </Link>
            </Box>
            <ToastContainer />
        </div>
    )
}
