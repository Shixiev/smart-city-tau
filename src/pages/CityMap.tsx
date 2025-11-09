import { useState } from 'react';
import { MapPin, Calendar, ExternalLink, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

type MarkerType = 'event' | 'place' | 'initiative';

interface MapMarker {
  id: number;
  type: MarkerType;
  title: string;
  description: string;
  address: string;
  date?: string;
  lat: number;
  lng: number;
}

const CityMap = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<MarkerType | 'all'>('all');

  const markers: MapMarker[] = [
    {
      id: 1,
      type: 'event',
      title: 'Қала субботнигі',
      description: 'Жайылымды тазалау акциясы',
      address: '28-ші шағын аудан',
      date: '2025-11-15',
      lat: 43.6508,
      lng: 51.1609,
    },
    {
      id: 2,
      type: 'place',
      title: 'Каспий жағалауы',
      description: 'Демалуға арналған ең жақсы орын',
      address: 'Жағалау аймағы',
      lat: 43.6408,
      lng: 51.1509,
    },
    {
      id: 3,
      type: 'initiative',
      title: 'Жасыл Ақтау',
      description: 'Қалаға ағаш отырғызу',
      address: 'Барлық аудандар',
      date: '2025-11-20',
      lat: 43.6608,
      lng: 51.1709,
    },
  ];

  const filteredMarkers = filter === 'all' ? markers : markers.filter((m) => m.type === filter);

  const getTypeColor = (type: MarkerType) => {
    switch (type) {
      case 'event':
        return 'bg-primary';
      case 'place':
        return 'bg-eco';
      case 'initiative':
        return 'bg-warning';
    }
  };

  const getTypeLabel = (type: MarkerType) => {
    switch (type) {
      case 'event':
        return t.map.filterEvents;
      case 'place':
        return t.map.filterPlaces;
      case 'initiative':
        return t.map.filterInitiatives;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-eco bg-clip-text text-transparent">
            {t.map.title}
          </h1>
          <p className="text-xl text-muted-foreground">{t.map.subtitle}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className="gap-2"
          >
            <Filter className="w-4 h-4" />
            {t.map.filterAll}
          </Button>
          {(['event', 'place', 'initiative'] as MarkerType[]).map((type) => (
            <Button
              key={type}
              variant={filter === type ? 'default' : 'outline'}
              onClick={() => setFilter(type)}
              className="gap-2"
            >
              <div className={`w-3 h-3 rounded-full ${getTypeColor(type)}`} />
              {getTypeLabel(type)}
            </Button>
          ))}
        </div>

        {/* Map Placeholder */}
        <Card className="overflow-hidden border-2">
          <div className="relative h-[400px] bg-gradient-to-br from-primary/20 via-eco/20 to-secondary flex items-center justify-center">
            <div className="text-center space-y-4">
              <MapPin className="w-16 h-16 mx-auto text-primary animate-float" />
              <p className="text-xl font-semibold text-foreground">Интерактивная карта Актау</p>
              <p className="text-muted-foreground max-w-md mx-auto">
                Здесь будет отображаться карта города с маркерами событий, мест и инициатив
              </p>
            </div>
          </div>
        </Card>

        {/* Markers List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarkers.map((marker) => (
            <Card key={marker.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge className={`${getTypeColor(marker.type)} text-white`}>
                    {getTypeLabel(marker.type)}
                  </Badge>
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-xl mt-3">{marker.title}</CardTitle>
                <CardDescription>{marker.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {marker.address}
                </div>
                {marker.date && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {new Date(marker.date).toLocaleDateString('ru-RU')}
                  </div>
                )}
                <Button variant="outline" className="w-full gap-2 hover:bg-primary hover:text-primary-foreground transition-all">
                  <ExternalLink className="w-4 h-4" />
                  {t.map.details}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Suggest Event */}
        <Card className="bg-gradient-to-br from-primary/10 to-eco/10 border-2 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t.map.suggestEvent}</CardTitle>
            <CardDescription>
              Поделитесь информацией о событии или интересном месте
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-eco">
              <MapPin className="w-5 h-5" />
              {t.map.suggestEvent}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CityMap;
