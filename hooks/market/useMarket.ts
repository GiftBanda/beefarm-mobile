import { crops } from "@/assets/data/crops";
import { useEffect, useState } from "react";

export const useMarket = () => {
    const [selectedMarket, setSelectedMarket] = useState<string>('Soweto');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false);
    const [filteredCrops, setFilteredCrops] = useState(crops);

    useEffect(() => {
        const filteredCrop = crops.filter((crop) => crop.title.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredCrops(filteredCrop);
    }, [searchQuery]);
    return {
        selectedMarket,
        setSelectedMarket,
        searchQuery,
        setSearchQuery,
        isActive,
        setIsActive,
        filteredCrops
    }
}