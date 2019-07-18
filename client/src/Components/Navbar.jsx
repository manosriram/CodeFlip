import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Link, BrowserRouter } from "react-router-dom";
import SvgIcon from "@material-ui/core/SvgIcon";

const Cookie = require("js-cookie");
const drawerWidth = 240;

const loggedIcons = [
  {
    label: "home",
    src: "https://img.icons8.com/ios-filled/50/000000/home-page.png"
  },
  {
    label: "addCard",
    src: "https://img.icons8.com/ios-filled/50/000000/add-column.png"
  },
  {
    label: "showCards",
    src: "https://img.icons8.com/ios-filled/50/000000/tv-show.png"
  },
  {
    label: "logout",
    src: "https://img.icons8.com/ios-filled/50/000000/logout-rounded-left.png"
  },
  {
    label: "about",
    src: "https://img.icons8.com/ios-filled/50/000000/about.png"
  }
];

const nonLoggedIcons = [
  {
    label: "home",
    src: "https://img.icons8.com/ios-filled/50/000000/home-page.png"
  },
  {
    label: "login",
    src: "https://img.icons8.com/pastel-glyph/50/000000/login-rounded-right.png"
  },
  {
    label: "register",
    src: "https://img.icons8.com/ios-filled/50/000000/edit-user-male.png"
  },
  {
    label: "about",
    src: "https://img.icons8.com/ios-filled/50/000000/about.png"
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    background: "black"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  icon: {
    marginRight: "25px"
  }
}));

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Navbar = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [logStat, setLogStat] = React.useState(false);

  React.useEffect(() => {
    if (Cookie.get("scTk")) {
      setLogStat(true);
    }
  }, []);

  const Logout = () => {
    Cookie.remove("scTk");
    window.location = "/";
  };

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {logStat && (
          <List>
            {["Home", "Add Card", "Show Cards", "Logout", "About"].map(
              (text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon
                    id="icn"
                    onClick={() => {
                      text = text.trim().toLowerCase();
                      if (text === "add card") text = "addCard";
                      else if (text === "show cards") text = "showCards";
                      else if (text === "home") text = "";
                      if (text !== "logout") {
                        props.history.push(`/${text}`);
                        handleDrawerClose();
                      }
                      if (text === "logout") Logout();
                    }}
                  >
                    <img
                      src={loggedIcons[index].src}
                      alt={loggedIcons[index].label}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id="icnTxt"
                    primary={text}
                    onClick={() => {
                      text = text.trim().toLowerCase();
                      if (text === "add card") text = "addCard";
                      else if (text === "show cards") text = "showCards";
                      else if (text === "home") text = "";
                      if (text !== "logout") {
                        props.history.push(`/${text}`);
                        handleDrawerClose();
                      }
                      if (text === "logout") Logout();
                    }}
                  />
                </ListItem>
              )
            )}
          </List>
        )}
        {!logStat && (
          <List>
            {["Home", "Login", "Register", "About"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon
                  id="icn"
                  onClick={() => {
                    let fv = text.toLowerCase();
                    if (fv === "home") fv = "";
                    props.history.push(`/${fv}`);
                    handleDrawerClose();
                  }}
                >
                  <img
                    src={nonLoggedIcons[index].src}
                    alt={nonLoggedIcons[index].label}
                  />
                </ListItemIcon>
                <ListItemText
                  id="icnTxt"
                  primary={text}
                  onClick={() => {
                    let fv = text.toLowerCase();
                    if (fv === "home") fv = "";
                    props.history.push(`/${fv}`);
                    handleDrawerClose();
                  }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
};
export default Navbar;
