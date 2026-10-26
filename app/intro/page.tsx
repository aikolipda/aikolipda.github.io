import IntroScreen from "../components/introScreen";
import HomePage from "../home/page";

export default function IntroPage() {
  return <IntroScreen home={<HomePage />} />;
}
