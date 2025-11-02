import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Home } from './pages/home';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, [])
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} />
      <Home />
    </SafeAreaProvider>
  );
}


export default App;
