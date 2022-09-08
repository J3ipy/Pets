import { Navigation } from "react-native-navigation";
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {

  Promise.all([
    Icon.getImageSource("md-home", 200),
    Icon.getImageSource("md-pizza", 50),
    Icon.getImageSource("md-calendar", 100),
    Icon.getImageSource("md-camera", 50),
    Icon.getImageSource("md-menu", 30),
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: "snapet.HomeScreen",
          label: "Home",
          title: "snaPet",          
          icon: sources[0],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[4],
                title: "menu",
                id: "sideDrawerToggle"
              }
            ]
          }
        },
        {
          screen: "snapet.FoodScreen",
          label: "Food Place",
          title: "Food Place",
          icon: sources[1],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[4],
                title: "menu",
                id: "sideDrawerToggle"
              }
            ]
          }
        },
        {
          screen: "snapet.CareScreen",
          label: "Care Place",
          title: "Care Place",
          icon: sources[2],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[4],
                title: "menu",
                id: "sideDrawerToggle"
              }
            ]
          }
        },
        {
          screen: "snapet.CameraScreen",
          label: "Camera Place",
          title: "Camera Place",
          icon: sources[3],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[4],
                title: "menu",
                id: "sideDrawerToggle"
              }
            ]
          }
        },
      ],
      drawer: {
        left: {
          screen: "snapet.SideDrawer",
          title: "Drawer",
        }
      }
    });
  })
}

export default startTabs;
