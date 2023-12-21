import PropTypes from "prop-types";
import Link from "next/link"; // Import Link from 'next/link' for client-side navigation
import { Box, List, ListItemText } from "@mui/material";
import { StyledNavItem, StyledNavItemIcon } from "./styles";

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={Link} // Use Link for client-side navigation
      href={path} // Use href instead of to
      passHref // Ensure that the href is passed to the underlying DOM element
      sx={{
        "&.active": {
          color: "text.primary",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
      }}
    >
      <>
        <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
        <ListItemText disableTypography primary={title} />
        {info && info}
      </>
    </StyledNavItem>
  );
}
