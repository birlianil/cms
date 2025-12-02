import React, { useMemo, useState, useEffect } from 'react';
import { View, StyleSheet, Switch, FlatList } from 'react-native';
import AppCard from '../components/AppCard';
import AppText from '../components/AppText';
import AppChip from '../components/AppChip';
import AppButton from '../components/AppButton';
import AppHeader from '../components/AppHeader';
import ScreenContainer from '../components/ScreenContainer';
import RiskBadge from '../components/RiskBadge';
import SectionHeader from '../components/SectionHeader';
import { getDiabetesMetrics, getTasksForChronicCare } from '../services/mockFHIRService';
import { getTrackers, setTrackers } from '../services/mockState';
import { useTheme } from '../theme';

export default function DiabetesDashboardScreen() {
  const { Colors, Spacing } = useTheme();
  const metrics = getDiabetesMetrics();
  const tasks = getTasksForChronicCare();
  const risk = useMemo(() => {
    if (metrics.hba1c >= 6.5) return 'diabetes';
    if (metrics.hba1c >= 5.7 || metrics.bmi >= 30) return 'prediabetes';
    return 'normal';
  }, [metrics]);

  const [walked, setWalked] = useState(getTrackers().walked);
  const [meals, setMeals] = useState(getTrackers().meals);

  useEffect(() => {
    setTrackers({ walked, meals });
  }, [walked, meals]);

  const coachingByRisk: Record<string, string[]> = {
    normal: ['Keep up balanced meals and activity.', 'Annual labs to monitor risk.'],
    prediabetes: ['Aim for 150 minutes activity/week.', 'Plate method for meals; reduce sugary drinks.', 'Lose 5-7% body weight over months.'],
    diabetes: ['Check A1c every 3 months.', 'Take meds as prescribed; never stop without clinician.', 'Monitor feet daily; BP and glucose as advised.'],
  };

  return (
    <ScreenContainer padded={false}>
      <View style={[styles.content, { paddingHorizontal: Spacing.md }]}>
        <AppHeader title="Diabetes & Obesity" subtitle="Powered by mock CMS Aligned Network data" />

        <View style={{ flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap' }}>
          <AppCard style={{ flex: 1, minWidth: 280 }}>
            <AppText variant="title" weight="bold" style={{ marginBottom: 6 }}>Clinical snapshot</AppText>
            <View style={styles.metricRow}>
              <AppText weight="bold">HbA1c: {metrics.hba1c}%</AppText>
              <AppChip label="US Core Observation" variant="neutral" />
            </View>
            <AppText weight="bold">BMI: {metrics.bmi}</AppText>
            <AppText>BP: {metrics.bp}</AppText>
            <AppText>Weight trend: {metrics.weightTrend.join(' → ')} lbs</AppText>
            <View style={{ marginTop: 8 }}>
              <RiskBadge level={risk as any} />
            </View>
          </AppCard>

          <AppCard style={{ flex: 1, minWidth: 280 }}>
            <SectionHeader title="Track today" />
            <View style={styles.toggleRow}>
              <AppText>Walked 30 min</AppText>
              <Switch value={walked} onValueChange={setWalked} />
            </View>
            <View style={styles.toggleRow}>
              <AppText>Logged meals</AppText>
              <Switch value={meals} onValueChange={setMeals} />
            </View>
            <AppButton title="Save today's progress" variant="secondary" onPress={() => { /* noop mock */ }} />
          </AppCard>
        </View>

        <SectionHeader title="Tasks" />
        <FlatList
          data={tasks}
          keyExtractor={(t) => t.id}
          contentContainerStyle={{ paddingBottom: 8 }}
          renderItem={({ item }) => (
            <AppCard>
              <AppText weight="bold" style={{ marginBottom: 4 }}>{item.title}</AppText>
              <AppText tone="secondary">Due: {item.due}</AppText>
              <AppChip label={`Status: ${item.status}`} variant="accent" style={{ marginTop: 6 }} />
            </AppCard>
          )}
        />

        <SectionHeader title="Coaching" />
        {coachingByRisk[risk].map((c) => (
          <AppCard key={c}>
            <AppText>{c}</AppText>
          </AppCard>
        ))}
      </View>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, maxWidth: 900, width: '100%', alignSelf: 'center' },
  metricRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 6 },
});
