import { ExitToApp } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";

export default function ChatSidebar(props) {
  const { user } = props;

  return (
    <div className="chat-sidebar">
      <div className="chat__header">
        <div className="chat__header--left">
          <Avatar src={user.avatar} alt={user.name} />
          <h4>{user.name}</h4>
        </div>
        <div className="chat__header--right">
          <IconButton>
            <ExitToApp />
          </IconButton>
        </div>
      </div>

      <div className="chat-sidebar__search"></div>

      <div className="chat-sidebar__search"></div>
    </div>
  );
}
