import { CheckCircle } from "lucide-react";

type Props = {
  type: string;
  message: string;
};

const ToastMessage = ({ type, message }: Props) => {
  return (
    <div className="toast toast-top toast-end">
      <div className={`alert ${type}`}>
        <span className="text-white font-black flex gap-2">
          <CheckCircle />
          {message}
        </span>
      </div>
    </div>
  );
};

export default ToastMessage;
