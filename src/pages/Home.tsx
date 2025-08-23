import { type Step } from "react-joyride";
import Tour from "../components/resources/Tour";

const Home = () => {
  const tourSteps: Step[] = [
    {
      content: <h2>Empecemos nuestro recorrido!</h2>,
      locale: { skip: "Saltar", nextLabelWithProgress: "Siguiente" },
      placement: "center",
      target: "body",
    },
    {
      content: <h2>Dirigete a Productos!</h2>,
      locale: {
        skip: "Saltar",
        nextLabelWithProgress: "Siguiente",
        back: "Anterior",
        last: "OK",
      },
      placement: "bottom",
      target: "#li_productos",
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center">
      <Tour tourSteps={tourSteps} path="home" />
      <h1 className="text-4xl mb-2 font-black capitalize">Aprende a utilizar nuestra demo!</h1>
      <video width={"80%"} controls>
        <source src="/videos/tutorial.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default Home;
