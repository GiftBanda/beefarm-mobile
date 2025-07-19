import React from "react";
import { StyleSheet, Text, View } from "react-native";


interface AnalysisResult {
    analysisResult: {
        plantName: string;
        identifiedIssue: string;
        symptomsDescription: string;
        suggestedActions: string[];
        disclaimer: string;
    }
}


export const CropAnalysisResult = ({ analysisResult }: AnalysisResult) => {
    return (
        <View>
            <Text style={styles.resultHeader}>Analysis Results</Text>
            <Text style={styles.resultLabel}>Plant Name:</Text>
            <Text style={styles.resultText}>{analysisResult.plantName}</Text>
            <Text style={styles.resultLabel}>Potential Issue:</Text>
            <Text style={styles.resultText}>{analysisResult.identifiedIssue}</Text>
            <Text style={styles.resultLabel}>Symptoms:</Text>
            <Text style={styles.resultText}>{analysisResult.symptomsDescription}</Text>
            <Text style={styles.resultLabel}>Suggested Actions:</Text>
            {analysisResult?.suggestedActions.map((action, index) => (
                <Text key={index} style={styles.actionItem}>• {action}</Text>
            ))}
            <Text style={styles.disclaimer}>{analysisResult.disclaimer}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    errorText: { marginTop: 20, color: 'red', textAlign: 'center' },
    resultHeader: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    resultLabel: { fontSize: 16, fontWeight: '600', marginTop: 8 },
    resultText: { fontSize: 16, marginBottom: 5 },
    actionItem: { fontSize: 16, marginLeft: 10 },
    disclaimer: { fontSize: 12, fontStyle: 'italic', color: 'gray', marginTop: 15, textAlign: 'center' },
    resetButton: { marginTop: 10, color: 'red', textAlign: 'center', fontSize: 16, fontWeight: 'bold', borderWidth: 1, borderColor: 'red', padding: 10, borderRadius: 8 },
});