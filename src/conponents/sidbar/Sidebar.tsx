import React from "react";
import "./sidebar.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import SidebarChannel from "./SidebarChannel";
import MicIcon from "@mui/icons-material/Mic";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import SettingsIcon from "@mui/icons-material/Settings";
import { auth, db } from "../../firebase";
import { useAppSelector } from "../../app/hooks";
import useCollection from "../../hooks/useCollection";
import { addDoc, collection } from "firebase/firestore";

const Sidebar = () => {
  const user = useAppSelector((state) => state.user.user);

  const { documents: channels } = useCollection("channels");

  const addChannel = async () => {
    let channelName: string | null = prompt("新しいチャンネルを作成します");

    if (channelName) {
      await addDoc(collection(db, "channels"), {
        channelName: channelName,
      });
    } else {
      alert("チャンネル名は必須です");
    }
  };
  return (
    <div className="sidebar">
      {/* sidebarLeft */}
      <div className="sidebarLeft">
        <div className="serverIcon">
          <img src="./logo192.png" alt="" />
        </div>
        <div className="serverIcon">
          <img src="./logo192.png" alt="" />
        </div>
      </div>

      {/* sidebarLight */}
      <div className="sidebarRight">
        <div className="sidebarTop">
          <h3>Discode</h3>
          <ExpandMoreIcon />
        </div>
        {/* sidebarChannels */}
        <div className="sidebarChannels">
          <div className="sidebarChannelsHeader">
            <div className="sidebarHeader">
              <ExpandMoreIcon />
              <h4>プログラミングチャンネル</h4>
            </div>
            <AddIcon
              className="sidebarAddChannel"
              onClick={() => addChannel()}
            />
          </div>
          <div className="sodebarChannelsList">
            {channels.map((channel) => (
              <SidebarChannel
                channel={channel}
                id={channel.id}
                key={channel.id}
              />
            ))}
          </div>
          <div className="sidebarSettings">
            <div className="sidebarAccount">
              <img src={user?.photo} alt="" onClick={() => auth.signOut()} />
              <div className="accountName">
                <h4>{user?.displayName}</h4>
                <span>#{user?.uid.substring(0, 4)}</span>
              </div>
            </div>
            <div className="sidebarVoice">
              <MicIcon />
              <HeadphonesIcon />
              <SettingsIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
