import React from "react";
import { useMediaQuery } from "react-responsive";
import { MOBILE_BREAKPOINT } from "../../mediaQueries";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { flexbox } from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
  footerDiv: {
    padding: 20,
    backgroundColor: "#353535",
    color: "white",
    textAlign: "center",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
  },
  footer: { margin: "0 10px 0" },
}));

export default function Footer() {
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);
  const classes = useStyles();

  return (
    <div>
      <BottomNavigation className={classes.footerDiv}>
        {isMobile ? (
          <>
            <Typography variant="body1" className={classes.footer}>
              Copyright &copy; 2021 All Rights Reserved by Cha-Cha-Charity
            </Typography>
            <Typography variant="body2" className={classes.footer}>
              <Link href="https://icons8.com/illustrations" color="inherit">
                Art via icons8
              </Link>
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h6" className={classes.footer}>
              Copyright &copy; 2021 All Rights Reserved by Cha-Cha-Charity
            </Typography>
            <Typography variant="subtitle1" className={classes.footer}>
              <Link href="https://icons8.com/illustrations" color="inherit">
                Art via icons8
              </Link>
            </Typography>
          </>
        )}
      </BottomNavigation>
    </div>
  );
}
