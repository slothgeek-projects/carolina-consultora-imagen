'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Search, X, LocateFixed, CheckCircle, AlertCircle } from 'lucide-react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import { Button, InputGroup } from '@heroui/react';

interface Location {
    lat: number;
    lng: number;
    address: string;
}

interface SelectLocationProps {
    onLocationSelect: (location: Location) => void;
    selectedLocation?: Location;
    className?: string;
}

const SelectLocation: React.FC<SelectLocationProps> = ({
    onLocationSelect,
    selectedLocation,
    className = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentLocation, setCurrentLocation] = useState<Location | null>(selectedLocation || null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [marker, setMarker] = useState<google.maps.Marker | null>(null);
    const [mapLoading, setMapLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [mapReady, setMapReady] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const mapRef = useRef<HTMLDivElement>(null);
    const searchBoxRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isOpen || !mapRef.current) return;

        const loadGoogleMaps = async () => {
            setMapLoading(true);
            try {
                setOptions({
                    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
                    v: 'weekly',
                    libraries: ['places']
                });
                await importLibrary('maps');
                initializeMap();
            } catch (error) {
                console.error('Error cargando Google Maps:', error);
                setErrorMessage('No se pudo cargar el mapa. Intenta de nuevo.');
            } finally {
                setMapLoading(false);
            }
        };

        loadGoogleMaps();
    }, [isOpen]);

    // Auto-focus the search input once the map is ready
    useEffect(() => {
        if (isOpen && mapReady) {
            searchBoxRef.current?.focus();
        }
    }, [isOpen, mapReady]);

    const initializeMap = () => {
        if (!mapRef.current || !window.google) return;

        const defaultLocation = { lat: 10.013051515232675, lng: -84.21063293220257 };
        const center = selectedLocation || defaultLocation;

        const mapInstance = new window.google.maps.Map(mapRef.current, {
            center,
            zoom: 9,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: true,
            styles: [
                { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }
            ]
        });

        setMap(mapInstance);

        window.google.maps.event.addListenerOnce(mapInstance, 'idle', () => {
            setMapReady(true);
        });

        if (selectedLocation) {
            const markerInstance = new window.google.maps.Marker({
                position: selectedLocation,
                map: mapInstance,
                draggable: true,
                animation: window.google.maps.Animation.DROP
            });
            setMarker(markerInstance);
        }

        mapInstance.addListener('click', (event: google.maps.MapMouseEvent) => {
            const position = event.latLng;
            if (position) {
                placeMarker(position);
                reverseGeocode(position);
            }
        });
    };

    const placeMarker = (position: google.maps.LatLng) => {
        if (!map) return;

        if (marker) marker.setMap(null);

        const newMarker = new window.google.maps.Marker({
            position,
            map,
            draggable: true,
            animation: window.google.maps.Animation.DROP
        });

        setMarker(newMarker);

        newMarker.addListener('dragend', () => {
            const newPosition = newMarker.getPosition();
            if (newPosition) reverseGeocode(newPosition);
        });
    };

    const reverseGeocode = async (position: google.maps.LatLng) => {
        if (!window.google) return;

        const geocoder = new window.google.maps.Geocoder();
        try {
            const response = await geocoder.geocode({ location: position });
            if (response.results[0]) {
                const address = response.results[0].formatted_address;
                setCurrentLocation({ lat: position.lat(), lng: position.lng(), address });
                setSearchQuery(address);
                setErrorMessage('');
            }
        } catch (error) {
            console.error('Error al obtener la dirección:', error);
        }
    };

    const handleSearch = () => {
        setErrorMessage('');

        if (!searchQuery.trim()) {
            setErrorMessage('Ingresa una dirección para buscar.');
            return;
        }
        if (!window.google?.maps || !map || !mapReady) {
            setErrorMessage('El mapa no está listo. Espera un momento e intenta de nuevo.');
            return;
        }

        const geocoder = new window.google.maps.Geocoder();
        setIsSearching(true);

        geocoder.geocode(
            { address: searchQuery, region: 'cr' },
            (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
                setIsSearching(false);

                if (status === 'OK' && results?.[0]) {
                    const location = results[0].geometry.location;
                    const address = results[0].formatted_address;

                    map.setCenter(location);
                    map.setZoom(16);
                    placeMarker(location);
                    setCurrentLocation({ lat: location.lat(), lng: location.lng(), address });
                    setSearchQuery(address);
                } else {
                    const errors: Partial<Record<google.maps.GeocoderStatus, string>> = {
                        ZERO_RESULTS: 'No se encontró esa dirección. Intenta ser más específico.',
                        OVER_QUERY_LIMIT: 'Demasiadas búsquedas. Intenta de nuevo más tarde.',
                        REQUEST_DENIED: 'Búsqueda no autorizada. Verifica la configuración.',
                        INVALID_REQUEST: 'Formato de dirección no válido.',
                    };
                    setErrorMessage(errors[status] ?? 'No se pudo encontrar la dirección.');
                }
            }
        );
    };

    const handleOpenModal = () => {
        setIsOpen(true);
        setErrorMessage('');
        if (selectedLocation) {
            setCurrentLocation(selectedLocation);
            setSearchQuery(selectedLocation.address);
        }
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setMap(null);
        setMarker(null);
        setMapReady(false);
        setMapLoading(false);
        setIsSearching(false);
        setErrorMessage('');
    };

    const handleConfirmLocation = () => {
        if (currentLocation) {
            onLocationSelect(currentLocation);
            handleCloseModal();
        }
    };

    const handleUseCurrentLocation = () => {
        if (!navigator.geolocation) {
            setErrorMessage('La geolocalización no está disponible en tu navegador.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                const latLng = new window.google.maps.LatLng(coords.latitude, coords.longitude);
                if (map) {
                    map.setCenter(latLng);
                    map.setZoom(16);
                    placeMarker(latLng);
                    reverseGeocode(latLng);
                }
            },
            () => setErrorMessage('No se pudo obtener tu ubicación actual.')
        );
    };

    return (
        <div className={className}>
            {/* Trigger — form-field look with address preview */}
            <button
                type="button"
                onClick={handleOpenModal}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-border bg-background hover:bg-surface transition-colors text-left group"
            >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    currentLocation
                        ? 'bg-emerald-100 dark:bg-emerald-950'
                        : 'bg-surface-secondary'
                }`}>
                    <MapPin className={`w-3.5 h-3.5 ${
                        currentLocation ? 'text-emerald-600 dark:text-emerald-400' : 'text-o-gray-300'
                    }`} />
                </div>

                <div className="flex-1 min-w-0">
                    {currentLocation ? (
                        <>
                            <p className="text-[10px] uppercase tracking-wider text-o-gray-300 mb-0.5">Ubicación</p>
                            <p className="text-sm font-medium truncate">{currentLocation.address}</p>
                        </>
                    ) : (
                        <p className="text-sm text-o-gray-300">Seleccionar ubicación</p>
                    )}
                </div>

                {currentLocation
                    ? <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    : <span className="text-xs text-primary font-medium shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        Fijar
                    </span>
                }
            </button>

            {/* Bottom sheet (mobile) / centered dialog (desktop) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center z-50"
                    onClick={(e) => e.target === e.currentTarget && handleCloseModal()}
                >
                    <div
                        className="bg-surface w-full max-w-2xl rounded-t-2xl md:rounded-2xl flex flex-col shadow-2xl"
                        style={{ maxHeight: '92dvh' }}
                    >
                        {/* Drag handle — mobile only hint */}
                        <div className="flex justify-center pt-3 pb-1 md:hidden">
                            <div className="w-10 h-1 rounded-full bg-border" />
                        </div>

                        {/* Header */}
                        <div className="flex items-start justify-between px-5 pt-3 pb-4 border-b border-border">
                            <div>
                                <h2 className="text-base font-semibold">¿Dónde te visitamos?</h2>
                                <p className="text-xs text-o-gray-300 mt-0.5">
                                    Busca una dirección o toca el mapa
                                </p>
                            </div>
                            <Button
                                onPress={handleCloseModal}
                                variant="ghost"
                                isIconOnly
                                size="sm"
                                className="-mt-1 -mr-2 text-o-gray-300"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Search */}
                        <div className="px-4 py-3 border-b border-border">
                            <div className="flex gap-2">
                                <InputGroup className="flex-1">
                                    <InputGroup.Prefix>
                                        {isSearching
                                            ? <div className="w-3.5 h-3.5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                                            : <Search className="w-4 h-4 text-o-gray-300" />
                                        }
                                    </InputGroup.Prefix>
                                    <InputGroup.Input
                                        ref={searchBoxRef}
                                        aria-label="Buscar dirección"
                                        type="text"
                                        placeholder="Ej: Barrio Escalante, San José..."
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            if (errorMessage) setErrorMessage('');
                                        }}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    />
                                    {searchQuery && (
                                        <InputGroup.Suffix>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSearchQuery('');
                                                    setErrorMessage('');
                                                    searchBoxRef.current?.focus();
                                                }}
                                                className="p-1 text-o-gray-300 hover:text-foreground transition-colors"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </InputGroup.Suffix>
                                    )}
                                </InputGroup>

                                {/* GPS button */}
                                <Button
                                    onPress={handleUseCurrentLocation}
                                    isDisabled={mapLoading || !mapReady || isSearching}
                                    isIconOnly
                                    size="sm"
                                    aria-label="Usar mi ubicación actual"
                                    className="bg-gradient-to-r from-teal-500 to-primary text-white shrink-0 self-stretch aspect-square"
                                >
                                    <LocateFixed className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Inline error — replaces all alert() calls */}
                            {errorMessage && (
                                <div className="mt-2 flex items-start gap-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 rounded-lg px-3 py-2">
                                    <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                                    <span>{errorMessage}</span>
                                </div>
                            )}
                        </div>

                        {/* Map — fixed viewport height, content fills it */}
                        <div className="relative" style={{ height: '45dvh', minHeight: '260px' }}>
                            <div ref={mapRef} className="w-full h-full" />

                            {/* Single unified loading overlay */}
                            {(mapLoading || !mapReady) && (
                                <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3">
                                    <div className="w-9 h-9 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                                    <p className="text-sm text-o-gray-300">Cargando mapa...</p>
                                </div>
                            )}

                            {/* Hint chip — only before first pin */}
                            {mapReady && !currentLocation && (
                                <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none">
                                    <div className="flex items-center gap-1.5 bg-black/65 text-white text-xs px-3.5 py-2 rounded-full shadow-lg">
                                        <MapPin className="w-3 h-3" />
                                        Toca el mapa para fijar tu ubicación
                                    </div>
                                </div>
                            )}

                            {/* Floating address card — rises from the map when a pin is set */}
                            {currentLocation && (
                                <div className="absolute bottom-3 inset-x-3">
                                    <div className="bg-surface/95 backdrop-blur-md border border-border rounded-xl px-4 py-3 shadow-lg">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                                <MapPin className="w-4 h-4 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] uppercase tracking-wider text-o-gray-300 font-medium mb-1">
                                                    Ubicación seleccionada
                                                </p>
                                                <p className="text-sm font-medium leading-snug line-clamp-2">
                                                    {currentLocation.address}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-4 py-4 border-t border-border flex gap-3">
                            <Button
                                onPress={handleCloseModal}
                                variant="outline"
                                size="sm"
                                className="flex-1"
                            >
                                Cancelar
                            </Button>
                            <Button
                                onPress={handleConfirmLocation}
                                isDisabled={!currentLocation}
                                size="sm"
                                className="flex-1 bg-gradient-to-r from-teal-500 to-primary text-white"
                            >
                                <CheckCircle className="w-4 h-4" />
                                Confirmar ubicación
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectLocation;
