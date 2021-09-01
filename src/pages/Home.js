import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from "react-responsive";
import {
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
  DESKTOP_BREAKPOINT,
} from "../mediaQueries";
import Typography from "@material-ui/core/Typography";
import CategoryCard from "../components/CategoryCard/CategoryCard";
import { eventCategories } from "../data";
import Typed from "react-typed";
import connect from "../assets/images/illustrations/whole-images/connect.png";

const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  intro: {
    width: 450,
    padding: 20,
    margin: 20,
    textAlign: "center",
  },
  introMobile: {
    width: 300,
    textAlign: "center",
  },
  eventHeader: {
    textAlign: "center",
  },
  textTyped: {
    fontWeight: 600,
    color: "#353535",
    textTransform: "uppercase",
  },
  categoryContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    padding: 20,
    justifyContent: "center",
    margin: "auto",
  },
}));

const Home = () => {
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);
  const isTablet = useMediaQuery(TABLET_BREAKPOINT);
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT);
  const classes = useStyles();
  return (
    <div>
      <div className={classes.main}>
        {isMobile && <img src={connect} width="200" alt="connect" />}
        {isTablet && <img src={connect} width="350" alt="connect" />}
        {isDesktop && <img src={connect} alt="connect" />}
        {isMobile ? (
          <Typography variant="h6">
            <Typed
              className={classes.textTyped}
              strings={[
                "We only have what we give",
                "Cha-Cha-Charity, where charity begins!",
                "Only a life lived for others is a life worthwhile",
                "No act of kindness, no matter how small, is ever wasted",
                "We can't help everyone, but everyone can help someone",
                "It is when you give of yourself that you truly give",
                "No one need wait a single moment to improve the world",
              ]}
              typeSpeed={60}
              backSpeed={30}
              loop
            />
          </Typography>
        ) : (
          <Typography variant="h3">
            <Typed
              className={classes.textTyped}
              strings={[
                "We only have what we give",
                "Cha-Cha-Charity, where charity begins!",
                "Only a life lived for others is a life worthwhile",
                "No act of kindness, no matter how small, is ever wasted",
                "We can't help everyone, but everyone can help someone",
                "It is when you give of yourself that you truly give",
                "No one need wait a single moment to improve the world",
              ]}
              typeSpeed={60}
              backSpeed={30}
              loop
            />
          </Typography>
        )}

        {isMobile ? (
          <section className={classes.introMobile}>
            <Typography>
              Engage with charitable events, or even host your own and support a
              worthy cause. Whether that might be as a Volunteer, Business or a
              Charity.
            </Typography>
            <Typography>
              Our main aim is to facilitate connections between those seeking to
              make a positive difference in the world.
            </Typography>
            <Typography variant="h6">Join us in making it happen!</Typography>
          </section>
        ) : (
          <section className={classes.intro}>
            <Typography>
              Engage with charitable events, or even host your own and support a
              worthy cause. Whether that might be as a Volunteer, Business or a
              Charity.
            </Typography>
            <Typography>
              Our main aim is to facilitate connections between those seeking to
              make a positive difference in the world.
            </Typography>
            <Typography variant="h6">Join us in making it happen!</Typography>
          </section>
        )}
      </div>
      <Typography className={classes.eventHeader} variant="h4">
        Explore some of our events!
      </Typography>

      <div className={classes.categoryContainer}>
        {eventCategories.map((eventCategory) => {
          return (
            <div>
              <Container>
                <CategoryCard {...eventCategory} />
              </Container>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Home;
