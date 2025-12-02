import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Switch, FlatList } from 'react-native';
import Card from '../components/Card';
import RiskBadge from '../components/RiskBadge';
import SectionHeader from '../components/SectionHeader';
import { getDiabetesMetrics, getTasksForChronicCare } from '../services/mockFHIRService';

export default function DiabetesDashboardScreen() {
  const metrics = getDiabetesMetrics();
  const tasks = getTasksForChronicCare();
  const risk = useMemo(() => {
    if (metrics.hba1c >= 6.5) return 'diabetes';
    if (metrics.hba1c >= 5.7 || metrics.bmi >= 30) return 'prediabetes';
    return 'normal';
  }, [metrics]);

  const [walked, setWalked] = useState(false);
  const [meals, setMeals] = useState(false);

  const coachingByRisk: Record<string, string[]> = {
    normal: ['Keep up balanced meals and activity.', 'Annual labs to monitor risk.'],
    prediabetes: ['Aim for 150 minutes activity/week.', 'Plate method for meals; reduce sugary drinks.', 'Lose 5-7% body weight over months.'],
    diabetes: ['Check A1c every 3 months.', 'Take meds as prescribed; never stop without clinician.', 'Monitor feet daily; BP and glucose as advised.'],
  };

  return (
    <View style={styles.container}>
      <SectionHeader title="Diabetes & Obesity" subtitle="Powered by mock CMS Aligned Network data" />
      <Card>
        <Text style={styles.metric}>HbA1c: {metrics.hba1c}%</Text>
        <Text style={styles.metric}>BMI: {metrics.bmi}</Text>
        <Text style={styles.metric}>BP: {metrics.bp}</Text>
        <Text style={styles.metric}>Weight trend: {metrics.weightTrend.join(' → ')} lbs</Text>
        <RiskBadge level={risk as any} />
      </Card>
      <SectionHeader title="Tasks" />
      <FlatList
        data={tasks}
        keyExtractor={(t) => t.id}
        renderItem={({ item }) => (
          <Card>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text>Due: {item.due}</Text>
            <Text>Status: {item.status}</Text>
          </Card>
        )}
      />
      <SectionHeader title="Coaching" />
      {coachingByRisk[risk].map((c) => (
        <Card key={c}>
          <Text>{c}</Text>
        </Card>
      ))}
      <SectionHeader title="Track today" />
      <Card>
        <View style={styles.toggleRow}>
          <Text>Walked 30 min</Text>
          <Switch value={walked} onValueChange={setWalked} />
        </View>
        <View style={styles.toggleRow}>
          <Text>Logged meals</Text>
          <Switch value={meals} onValueChange={setMeals} />
        </View>
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  metric: { fontWeight: '700', marginVertical: 2 },
  taskTitle: { fontWeight: '700', marginBottom: 4 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 6 },
});
