
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export function useLoadedResources() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadResources() {
      try {
        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
        });
      } catch (e) {
        // We might want to log this error somewhere
        console.warn(e);
      } finally {
        setIsLoading(false);
      }
    }

    loadResources();
  }, []);

  return isLoading;
}
