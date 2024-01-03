import { useEffect } from "react";
import "./HeroMore.css";

const HeroMore = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="hero-more">
      <div className="container">
        <div className="more-header">
          <h2>More</h2>
          <p>Additional content from me</p>
          <br /> <br />
          <p className="coming-soon">COMING SOON (when I have time)</p> {/*TODO*/}
        </div>
        <div className="more-content">
          <h3>Section 1</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem quae ut labore, quod, repellendus eos
            cupiditate blanditiis optio fugit sint voluptatem accusantium quia consectetur iure molestiae. Incidunt
            atque explicabo ad pariatur illo cum deleniti voluptatum facere nam. Suscipit veniam distinctio officia esse
            reprehenderit temporibus culpa, optio numquam, dolorum nihil tenetur? Atque quos, deleniti quis recusandae
            obcaecati iusto quas est neque. Perspiciatis eveniet vero consectetur nemo ut quia explicabo voluptates
            consequatur repellendus quae doloremque quis, vel assumenda, exercitationem in iusto aperiam mollitia optio
            ex. Quisquam accusamus nam labore fugit at. Sint eius ea rem rerum debitis accusamus odio veniam dolor
            voluptatibus?
          </p>
          <h3>Section 2</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam autem cupiditate itaque aliquid quae vitae
            explicabo numquam accusantium pariatur, quas nulla officia fugiat impedit modi quam sapiente delectus,
            recusandae unde provident dolor error corporis sint deleniti asperiores. Error fuga unde, voluptates
            cupiditate tempore itaque harum sequi ullam nam necessitatibus, laboriosam iusto voluptatibus nobis aperiam!
            Veniam consectetur quo minus corporis a nisi id excepturi eos quod? Nam, reiciendis ipsum dolorem, incidunt
            eligendi ut voluptates enim eius nisi commodi beatae ad doloremque maxime. Ea voluptates blanditiis quas
            numquam architecto, labore, sequi fuga reiciendis autem voluptatem pariatur, cupiditate officia nesciunt
            animi aperiam repellat?
          </p>
          <h3>Section 3</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, fugiat sequi? Corporis magnam ullam
            eveniet ea! Repellat aliquid cum veniam commodi officia ut officiis incidunt ex saepe culpa, maxime quisquam
            similique, dolorum sint deserunt quo dignissimos quia omnis reiciendis dolores tempore magnam alias. Error
            cumque accusantium alias obcaecati, voluptates velit rerum officia, similique aperiam culpa repudiandae
            molestiae explicabo ratione blanditiis doloribus architecto quos possimus animi tempore nesciunt, tempora
            nobis at modi iure. Modi sapiente eius repudiandae, quo eveniet vero accusantium nihil, possimus suscipit
            ipsum, eligendi cumque rem reiciendis officiis asperiores blanditiis velit tenetur ipsa! Modi fugit
            blanditiis debitis dolorem! A.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroMore;
