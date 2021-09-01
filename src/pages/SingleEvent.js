import { useMutation, useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router";
import { EVENT } from "../graphql/queries";
import { useMediaQuery } from "react-responsive";
import {
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
  DESKTOP_BREAKPOINT,
} from "../mediaQueries";
import LoaderSpinner from "../components/Loader/LoaderSpinner";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

//icons
import LocationOnRoundedIcon from "@material-ui/icons/LocationOn";
import EventRoundedIcon from "@material-ui/icons/EventRounded";
import PeopleRoundedIcon from "@material-ui/icons/PeopleRounded";
import AccessTimeRoundedIcon from "@material-ui/icons/AccessTimeRounded";
import FaceRoundedIcon from "@material-ui/icons/FaceRounded";

import "./singleevent.css";
import { SIGNUPTOEVENT } from "../graphql/mutations";
import { useUserContext } from "../contexts/UserProvider";
import { useState } from "react";
import AcknowledgementModal from "../components/AcknowledgementModal";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  // top header
  eventImg: {},
  eventButton: {
    marginTop: 20,
    backgroundColor: "#f36b7f",
    "&:hover": {
      backgroundColor: "#f68e9d",
      color: "#353535",
    },
  },
  eventName: {
    color: "#f0f0f0",
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
  },
  // info header
  infoHeader: {
    backgroundColor: "#f9d9eb",
    display: "flex",
    padding: 20,
    margin: "auto",
    justifyContent: "space-around",
  },
  infoDivs: {
    display: "flex",
  },
  secondaryGrid: {
    marginTop: 20,
    paddingBottom: 50,
  },
  eventDescription: {
    backgroundColor: "#eceae9",
    padding: 30,
  },
  eventSidebar: {
    backgroundColor: "#eceae9",
    padding: 20,
  },
  // grid

  // attendants
  attendTitle: {
    backgroundColor: "#82b5a5",
  },
  attendants: {
    backgroundColor: "#eceae9",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
  },
}));

const SingleEvent = () => {
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);
  const isTablet = useMediaQuery(TABLET_BREAKPOINT);
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT);
  const classes = useStyles();
  let history = useHistory();
  const { eventId } = useParams();
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
  };

  const { data, loading, error } = useQuery(EVENT, {
    variables: { eventId },
  });

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    console.log(error);
    return <div>error!!</div>;
  }
  // const attendants = data.event.participants;
  // console.log(attendants);

  const userSignedUp = data.event.participants.find((participant) => {
    return participant.id === state.user.id;
  });

  return (
    <div className={classes.root}>
      <section className="header-container">
        <header
          className="header-img"
          style={{
            backgroundImage: `url(${data.event.imageUrl})`,
          }}
        ></header>
        <div className={classes.eventName}>
          <div>
            {isMobile ? (
              <Typography variant="h5">{data.event.name}</Typography>
            ) : (
              <Typography variant="h2">{data.event.name}</Typography>
            )}
          </div>

          {!userSignedUp && (
            <Button
              onClick={handleSignUpToEvent}
              className={classes.eventButton}
              variant="contained"
              id={eventId}
            >
              Sign Up
            </Button>
          )}
        </div>
      </section>
      <AcknowledgementModal
        open={open}
        onClose={onClose}
        title="Thank you for your participation"
        subTitle="See you around"
      />
      <Container>
        <div>
          <Grid>
            <Paper className={classes.infoHeader}>
              <div className={classes.infoDivs}>
                {isMobile ? (
                  <LocationOnRoundedIcon
                    fontSize="large"
                    style={{ color: "#f36b7f" }}
                  />
                ) : (
                  <>
                    <LocationOnRoundedIcon
                      fontSize="large"
                      style={{ color: "#f36b7f" }}
                    />
                    <Typography variant="h6">{data.event.city}</Typography>
                  </>
                )}
              </div>
              <div className={classes.infoDivs}>
                {isMobile ? (
                  <AccessTimeRoundedIcon
                    fontSize="large"
                    style={{ color: "#9fbfff" }}
                  />
                ) : (
                  <>
                    <AccessTimeRoundedIcon
                      fontSize="large"
                      style={{ color: "#9fbfff" }}
                    />
                    <Typography variant="h6">{data.event.time}</Typography>
                  </>
                )}
              </div>
              <div className={classes.infoDivs}>
                {isMobile ? (
                  <EventRoundedIcon
                    fontSize="large"
                    style={{ color: "#f36b7f" }}
                  />
                ) : (
                  <>
                    <EventRoundedIcon
                      fontSize="large"
                      style={{ color: "#f36b7f" }}
                    />
                    <Typography variant="h6">{data.event.day}</Typography>
                  </>
                )}
              </div>
              <div className={classes.infoDivs}>
                {isMobile ? (
                  <PeopleRoundedIcon
                    fontSize="large"
                    style={{ color: "#82b5a5" }}
                  />
                ) : (
                  <>
                    <PeopleRoundedIcon
                      fontSize="large"
                      style={{ color: "#82b5a5" }}
                    />
                    <Typography variant="h6">
                      {data.event.participants.length} participating
                    </Typography>
                  </>
                )}
              </div>
            </Paper>
          </Grid>
          {isMobile ? (
            <>
              <Grid
                container
                spacing={2}
                className={classes.secondaryGrid}
                style={{ flexDirection: "column" }}
              >
                <Grid item xs={12}>
                  <Paper className={classes.eventDescription}>
                    <Typography>{data.event.description}</Typography>
                  </Paper>
                  <Paper>
                    <article className={classes.attendTitle}>
                      <Typography variant="h6">
                        See who's already participating!
                      </Typography>
                    </article>
                    <article className={classes.attendants}>
                      <div>
                        <FaceRoundedIcon
                          fontSize="large"
                          style={{ color: "#82b5a5" }}
                        />
                      </div>
                      <div>
                        <FaceRoundedIcon
                          fontSize="large"
                          style={{ color: "#82b5a5" }}
                        />
                      </div>
                      <div>
                        <FaceRoundedIcon
                          fontSize="large"
                          style={{ color: "#82b5a5" }}
                        />
                      </div>
                    </article>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.eventSidebar}>
                    <div>
                      <Typography variant="h5">Hosted by</Typography>
                      <Typography variant="h6">
                        {data.event.organizer}
                      </Typography>
                      <Typography variant="h6">_______</Typography>
                      <Typography variant="subtitle1">
                        {data.event.street}
                      </Typography>
                      <Typography variant="h6">{data.event.city}</Typography>
                      <Typography variant="h5">
                        {" "}
                        {data.event.postcode}
                      </Typography>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Grid container spacing={2} className={classes.secondaryGrid}>
                <Grid item xs={9}>
                  <Paper className={classes.eventDescription}>
                    <Typography>{data.event.description}</Typography>
                  </Paper>
                  <Paper>
                    <article className={classes.attendTitle}>
                      <Typography variant="h6">
                        See who's already participating!
                      </Typography>
                    </article>
                    <article className={classes.attendants}>
                      <div>
                        <FaceRoundedIcon
                          fontSize="large"
                          style={{ color: "#82b5a5" }}
                        />
                      </div>
                      <div>
                        <FaceRoundedIcon
                          fontSize="large"
                          style={{ color: "#82b5a5" }}
                        />
                      </div>
                      <div>
                        <FaceRoundedIcon
                          fontSize="large"
                          style={{ color: "#82b5a5" }}
                        />
                      </div>
                    </article>
                  </Paper>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={classes.eventSidebar}>
                    <div>
                      <Typography variant="h5">Hosted by</Typography>
                      <Typography variant="h6">
                        {data.event.organizer}
                      </Typography>
                      <Typography variant="h6">_______</Typography>
                      <Typography variant="subtitle1">
                        {data.event.street}
                      </Typography>
                      <Typography variant="h6">{data.event.city}</Typography>
                      <Typography variant="h5">
                        {" "}
                        {data.event.postcode}
                      </Typography>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default SingleEvent;
