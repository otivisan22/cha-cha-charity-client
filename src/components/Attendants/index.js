/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import FaceRoundedIcon from "@material-ui/icons/FaceRounded";
import Avatar from "@material-ui/core/Avatar";

import { useHistory } from "react-router";
import { useUserContext } from "../../contexts/UserProvider";

const useStyles = makeStyles((theme) => ({
  userName: {
    width: 250,
    fontSize: "1rem",
    fontWeight: 600,
    padding: 5,
  },
  userAvatar: {
    alignSelf: "center",
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Attendants = ({ fullName, imageUrl }) => {
  const classes = useStyles();

  return (
    <>
      <Avatar alt={fullName} src={imageUrl} className={classes.userAvatar} />

      <Typography variant="button" className={classes.userName}>
        {fullName}
      </Typography>
    </>
  );
};

export default Attendants;
