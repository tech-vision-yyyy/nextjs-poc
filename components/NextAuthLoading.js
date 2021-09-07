import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function NextAuthLoading() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <FontAwesomeIcon
        icon={faSpinner}
        size="6x"
        className="animate-spin align-middle"
      ></FontAwesomeIcon>
    </div>
  );
}
