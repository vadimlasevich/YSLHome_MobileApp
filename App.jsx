import 'react-native-gesture-handler';
import { useEffect, useCallback, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
//import AuthorizationContextProvider from './context/AuthorizationContext';
//import AppNav from './navigation/AppNav';
//import { COLORS } from './constants';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [infoUser, setInfoUser] = useState(null);

  useEffect(() => {
    const prepare = async () => {
      try {
        NavigationBar.setBackgroundColorAsync(COLORS.black);

        // await Font.loadAsync({
        //   PetraSans: require('./assets/fonts/petrasansregular.ttf'),
        // });

        //const access_token = JSON.parse(await SecureStore.getItemAsync('access_token'));

        // if (access_token) {
        //   const account = await accountService(access_token);
        // }
      } catch (error) {
        console.log(error);
        Alert.alert('Ошибка', 'Возможно у Вас проблемы с интернетом. \n Попробуйте позже');
      } finally {
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) await SplashScreen.hideAsync();
  }, [appIsReady]);

  onLayoutRootView();

  if (!appIsReady) return null;

  return (
    <AuthorizationContextProvider account={infoUser}>
      <AppNav />
    </AuthorizationContextProvider>
  );
}
