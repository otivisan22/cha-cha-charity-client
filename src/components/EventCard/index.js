import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOn";
import EventRoundedIcon from "@material-ui/icons/EventRounded";

import { SIGNUPTOEVENT } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import { useUserContext } from "../../contexts/UserProvider";

import AcknowledgementModal from "../AcknowledgementModal";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    maxHeight: 500,
    textAlign: "center",
    margin: 20,
  },
  header: {
    backgroundColor: "#f9d9eb",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    height: 60,
  },
  iconinfo: {
    margin: "auto",
  },
  links: {
    justifyContent: "center",
    color: "red",
  },
  description: {
    display: "inline-block",
    overflow: "hidden",
    height: "3.6em",
    lineHeight: "1.2em",
  },
});

const EventCard = ({
  id,
  name,
  description,
  day,
  city,
  organizer,
  imageUrl,
}) => {
  const classes = useStyles();
  let history = useHistory();
  const { state } = useUserContext();

  const [signUpToEvent] = useMutation(SIGNUPTOEVENT, {
    onCompleted: (data) => {
      setOpen(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSignUpToEvent = async (event) => {
    await signUpToEvent({
      variables: {
        signUpToEventUserId: state.user.id,
        signUpToEventEventId: event.currentTarget.id,
      },
    });
  };

  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
    history.push(`/event/${id}`);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardMedia
          component="img"
          alt="event-image"
          height="180"
          image={imageUrl}
          title="event-image"
        />
        <CardContent className={classes.header}>
          <Typography
            className={classes.iconinfo}
            gutterBottom
            variant="subtitle1"
            component="h2"
          >
            <LocationOnRoundedIcon
              style={{ color: "#f36b7f", verticalAlign: "middle" }}
            />
            {city}
          </Typography>
          <Typography
            className={classes.iconinfo}
            gutterBottom
            variant="subtitle1"
            component="h2"
          >
            <EventRoundedIcon
              style={{ color: "#9fbfff", verticalAlign: "middle" }}
            />
            {day}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h6"
            component="h2"
          >
            {name}
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="h4">
            by {organizer}
          </Typography>
          <Typography
            className={classes.description}
            variant="subtitle1"
            color="textSecondary"
            component="p"
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions className={classes.links}>
          <Link style={{ textDecoration: "none" }}>
            <Button
              id={id}
              size="small"
              onClick={handleSignUpToEvent}
              style={{ color: "#f36b7f" }}
            >
              Sign Up
            </Button>
          </Link>
          <Link href={`/event/${id}`} style={{ textDecoration: "none" }}>
            <Button size="small" style={{ color: "#f36b7f" }}>
              See More
            </Button>
          </Link>
        </CardActions>
      </Card>
      <AcknowledgementModal
        open={open}
        onClose={onClose}
        title="Thank you for your participation"
        subTitle="See you around"
      />
    </>
  );
};

export default EventCard;
