/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import FaceRoundedIcon from "@material-ui/icons/FaceRounded";
import Avatar from "@material-ui/core/Avatar";

import { useHistory } from "react-router";
import { useUserContext } from "../../contexts/UserProvider";

const useStyles = makeStyles({
  userName: {
    width: 250,
  },
  userAvatar: {
    alignSelf: "center",
  },
});

const Attendants = ({ fullName, imageUrl }) => {
  const classes = useStyles();

  return (
    <>
      <Avatar alt={fullName} src={imageUrl} className={classes.userAvatar} />

      <Typography className={classes.userName}>{fullName}</Typography>
    </>
  );
};

export default Attendants;
