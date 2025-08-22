import { useState } from "react";
import Joyride, { STATUS, type CallBackProps, type Step } from "react-joyride";
import type { IState } from "../../interfaces/IState";
import { useAppContext } from "../../context/AppContext";

type Props = {
  tourSteps: Step[];
  path: string;
};

const Tour = ({ tourSteps, path }: Props) => {
  const { state, dispatch } = useAppContext();
  const running =
    path === "home"
      ? state.tours.homeTour
      : path === "productos"
      ? state.tours.productosTour
      : state.tours.facturarTour;

  const [{ run, steps }, setState] = useState<IState>({
    run: running,
    steps: tourSteps,
  });
  const handleCallback = (data: CallBackProps) => {
    const { status } = data;
    if (
      [STATUS.FINISHED, STATUS.SKIPPED].includes(
        status as typeof STATUS.FINISHED | typeof STATUS.SKIPPED
      )
    ) {
      setState((prev) => ({ ...prev, run: false }));
      switch (path) {
        case "home":
          return dispatch({type: "FINISH_TOUR", tours: {...state.tours, homeTour: false}});
        case "productos":
          return dispatch({type: "FINISH_TOUR", tours: {...state.tours, productosTour: false}});
        case "facturar":
          return dispatch({type: "FINISH_TOUR", tours: {...state.tours, facturarTour: false}});
      }
      
    }
  };
  return (
    <Joyride
      continuous
      callback={handleCallback}
      run={run}
      steps={steps}
      scrollToFirstStep
      showSkipButton
      showProgress
    />
  );
};

export default Tour;
