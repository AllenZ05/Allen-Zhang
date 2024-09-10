import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
