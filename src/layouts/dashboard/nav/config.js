// component

import SvgColor from "components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "home",
    path: "/blog",
    icon: icon("ic_dashboard"),
  },
  {
    title: "chat",
    path: "/chat",
    icon: icon("ic_chat"),
  },
  {
    title: "education",
    path: "/education",
    icon: icon("ic_education"),
  },
  {
    title: "setting",
    path: "/setting",
    icon: icon("ic_setting"),
  },
];

export default navConfig;
