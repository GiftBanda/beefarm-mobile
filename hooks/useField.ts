import { supabase } from "@/utils/supabase";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";


export const useField = () => {
     const { id } = useLocalSearchParams<{ id: string }>();
         const [fieldDetails, setFieldDetails] = useState<any>(null);
    
         const fetchFieldDetails = async () => {
           const { data, error } = await supabase
             .from("fields")
             .select("*,crops(*)")
             .eq("id", id)
             .single();
    
             setFieldDetails(data);
    
           if (error) {
             console.error("Error fetching field details:", error);
           } else {
             console.log("Field details:", data);
           }
         };
         
         useEffect(() => {
           fetchFieldDetails();
         }, [id]);

    return {
        fieldDetails,
        fetchFieldDetails,
    };
}