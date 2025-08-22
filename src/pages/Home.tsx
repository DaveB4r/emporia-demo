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
    <div>
      <Tour tourSteps={tourSteps} path="home"/>
    </div>
  );
};

export default Home;
