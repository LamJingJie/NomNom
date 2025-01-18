import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { GooglePlaceData, GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { ZoomIn } from 'react-native-reanimated';

import { LocationContext } from '@/context/LocationContext';

export default function SearchBar({searchedLocation}: any) {

    const google_places_api = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;
    const {location, setLocation} = useContext(LocationContext);


    const renderDescription = (rowData: GooglePlaceData) => {
        const title = rowData.structured_formatting.main_text;
        const description = rowData.structured_formatting.secondary_text;
        return (
            <View>
                <Text>{title}</Text>
                <Text style={{ fontSize: 12, color: 'lightgrey' }}>{description}</Text>
            </View>
        )
    }

    return (
        <View>
                <GooglePlacesAutocomplete
                    fetchDetails={true}
                    placeholder='Searching for restaurants...'
                    onPress={(data, details = null) => {
                        const coords = details?.geometry.location;
                        setLocation({latitude: coords?.lat, longitude: coords?.lng});
                    }}
                    query={{
                        key: google_places_api,
                        language: 'en',
                        components: 'country:sg',
                        type: 'establishment',
                    }}
                    enablePoweredByContainer={false}

                    // fetchDetails={true}
                    renderRow={rowData => {
                        return (
                            <View>
                                {renderDescription(rowData)}
                            </View>
                        )
                    }}
                />

        </View>
    )
}
