import { Navigation } from "react-native-navigation";

import AuthScreen from "./src/screens/Auth/Auth";
import HomeScreen from "./src/screens/Home/Home";
import FoodScreen from "./src/screens/Food/Food";
import CareScreen from "./src/screens/Care/Care";
import CameraScreen from "./src/screens/Camera/Camera";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";

import PetShopScreen from "./src/screens/Care/PetShop";
import VeterinarioScreen from "./src/screens/Care/Veterinario";
import VacinasScreen from "./src/screens/Care/Vacinas";

import DadosPetScreen from "./src/screens/SideDrawer/DadosPet";
import DadosUserScreen from "./src/screens/SideDrawer/DadosUser";

Navigation.registerComponent("snapet.AuthScreen", () => AuthScreen)
Navigation.registerComponent("snapet.HomeScreen", () => HomeScreen)
Navigation.registerComponent("snapet.FoodScreen", () => FoodScreen)
Navigation.registerComponent("snapet.CareScreen", () => CareScreen)
Navigation.registerComponent("snapet.CameraScreen", () => CameraScreen)
Navigation.registerComponent("snapet.SideDrawer", () => SideDrawer)

Navigation.registerComponent("snapet.PetShopScreen", () => PetShopScreen)
Navigation.registerComponent("snapet.VeterinarioScreen", () => VeterinarioScreen)
Navigation.registerComponent("snapet.VacinasScreen", () => VacinasScreen)

Navigation.registerComponent("snapet.DadosPetScreen", () => DadosPetScreen)
Navigation.registerComponent("snapet.DadosUserScreen", () => DadosUserScreen)

export default () =>  Navigation.startSingleScreenApp({
  screen: {
    screen: "snapet.AuthScreen",
    title: "Login"
  }
});
