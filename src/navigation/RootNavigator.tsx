import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignInScreen from '../screens/Identity/SignInScreen';
import DigitalIDScreen from '../screens/Identity/DigitalIDScreen';
import ConsentScreen from '../screens/Identity/ConsentScreen';
import HomeScreen from '../screens/HomeScreen';
import AppointmentListScreen from '../screens/KillClipboard/AppointmentListScreen';
import CheckInWizardScreen from '../screens/KillClipboard/CheckInWizardScreen';
import ArrivalScreen from '../screens/KillClipboard/ArrivalScreen';
import VisitSummaryScreen from '../screens/KillClipboard/VisitSummaryScreen';
import AIAssistantScreen from '../screens/AIAssistantScreen';
import DiabetesDashboardScreen from '../screens/DiabetesDashboardScreen';
import MedicareConnectivityScreen from '../screens/MedicareConnectivityScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { getCurrentUser } from '../services/mockAuthService';
import { Colors } from '../theme/tokens';
import CircleIcon from '../components/CircleIcon';

const AuthStack = createNativeStackNavigator();
const KillStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

const KillClipboardStack = () => (
  <KillStack.Navigator>
    <KillStack.Screen name="Appointments" component={AppointmentListScreen} />
    <KillStack.Screen name="CheckInWizard" component={CheckInWizardScreen} options={{ title: 'Digital Check-In' }} />
    <KillStack.Screen name="Arrival" component={ArrivalScreen} />
    <KillStack.Screen name="VisitSummary" component={VisitSummaryScreen} options={{ title: 'Visit Summary' }} />
  </KillStack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: Colors.accent,
      tabBarInactiveTintColor: Colors.textMuted,
      tabBarStyle: { paddingVertical: 6, height: 70 },
      tabBarIcon: ({ focused }) => {
        const labelMap: Record<string, string> = {
          Home: 'H',
          KillTheClipboard: 'C',
          CMS: 'M',
          Assistant: 'A',
          Diabetes: 'D',
          Settings: 'S',
        };
        return <CircleIcon label={labelMap[route.name] || '•'} active={focused} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="KillTheClipboard" component={KillClipboardStack} options={{ title: 'Check-In' }} />
    <Tab.Screen name="CMS" component={MedicareConnectivityScreen} />
    <Tab.Screen name="Assistant" component={AIAssistantScreen} />
    <Tab.Screen name="Diabetes" component={DiabetesDashboardScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

export default function RootNavigator() {
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    setIsAuthed(!!user);
  }, []);

  const AuthFlow = ({ onAuthed }: { onAuthed: () => void }) => (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" options={{ title: 'Sign In' }}>
        {(props) => <SignInScreen {...props} onContinue={() => props.navigation.navigate('DigitalID')} />}
      </AuthStack.Screen>
      <AuthStack.Screen name="DigitalID" options={{ title: 'Digital Credential' }}>
        {(props) => <DigitalIDScreen {...props} onContinue={() => props.navigation.navigate('Consent')} />}
      </AuthStack.Screen>
      <AuthStack.Screen name="Consent" options={{ title: 'Consent to Connect' }}>
        {(props) => <ConsentScreen {...props} onAuthed={onAuthed} />}
      </AuthStack.Screen>
    </AuthStack.Navigator>
  );

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthed ? (
        <RootStack.Screen name="Main" component={MainTabs} />
      ) : (
        <RootStack.Screen name="Auth">
          {() => <AuthFlow onAuthed={() => setIsAuthed(true)} />}
        </RootStack.Screen>
      )}
    </RootStack.Navigator>
  );
}
