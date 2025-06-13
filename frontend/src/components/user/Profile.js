import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import { Stack } from "@mui/system";
import { Avatar, Button, useTheme } from "@mui/material";
import { LocalMallOutlined, LockResetOutlined } from "@mui/icons-material";
export default function Profile() {
  const { user } = useSelector((state) => state.authState);
  const { palette } = useTheme();

  return user ? (
    <>
      <MetaData title={"My Profile"} />
      <div className="mt-5 profile">
        <div className="profile__image">
          <Avatar
            alt="user image"
            src={user.avatar ?? "./images/default_avatar.png"}
            sx={{ width: 240, height: 240 }}
          />
        </div>

        <div className="mt-5">
          <ProfileInfo
            name={user.name}
            email={user.email}
            createdAt={user.createdAt}
          />
          <ProfileButtons
            bg1={palette.bg1}
            bg2={palette.bg2}
            bg4={palette.bg4}
          />
        </div>
      </div>
    </>
  ) : null;
}

function ProfileInfo({ name, email, createdAt }) {
  return (
    <>
      <h4>Full Name</h4>
      <p>{name}</p>
      <h4>Email Address</h4>
      <p>{email}</p>
      <h4>Joined On</h4>
      <p>{String(createdAt).substring(0, 10)}</p>
    </>
  );
}

function ProfileButtons({ bg1, bg2, bg4 }) {
  return (
    <>
      <Stack direction="row" justifyContent="space-evenly" className={`mb-2`}>
        <Link to="/myprofile/update" className="mt-8 ">
          <Button variant="contained" sx={{ bgcolor: bg4 }}>
            Edit Profile
          </Button>
        </Link>
        <Link to="/orders" className="mt-8">
          <Button
            variant="contained"
            sx={{ bgcolor: bg4 }}
            endIcon={<LocalMallOutlined />}
          >
            My Orders
          </Button>
        </Link>
      </Stack>
      <Link to="/myprofile/update/password" className="mt-8">
        <Button
          variant="outlined"
          sx={{ bgcolor: bg2, color: bg1 }}
          startIcon={<LockResetOutlined />}
        >
          Change Password
        </Button>
      </Link>
    </>
  );
}
