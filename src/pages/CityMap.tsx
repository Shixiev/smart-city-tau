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
        <Card className="overflow-hidden border-2 shadow-elegant">
          <div className="relative h-[500px] bg-gradient-to-br from-primary/10 via-eco/15 to-accent/10">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary)) 0%, transparent 50%),
                               radial-gradient(circle at 80% 80%, hsl(var(--eco)) 0%, transparent 50%),
                               radial-gradient(circle at 40% 80%, hsl(var(--accent)) 0%, transparent 50%)`
            }} />
            
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />

            {/* Floating markers animation */}
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/50" />
            <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-eco rounded-full animate-pulse shadow-lg shadow-eco/50" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-warning rounded-full animate-pulse shadow-lg shadow-warning/50" style={{ animationDelay: '1s' }} />

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="text-center space-y-6 px-6">
                <div className="relative inline-block">
                  <MapPin className="w-20 h-20 mx-auto text-primary animate-float drop-shadow-lg" />
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse-glow" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primary via-eco to-accent bg-clip-text text-transparent">
                    {t.map.title}
                  </h3>
                  <p className="text-lg text-foreground/80 max-w-lg mx-auto font-medium">
                    Интерактивная карта Актау
                  </p>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Здесь будет отображаться интерактивная карта города с маркерами событий, интересных мест и общественных инициатив
                  </p>
                </div>
                <div className="flex gap-3 justify-center pt-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-effect">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm font-medium">{t.map.filterEvents}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-effect">
                    <div className="w-2 h-2 rounded-full bg-eco animate-pulse" />
                    <span className="text-sm font-medium">{t.map.filterPlaces}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-effect">
                    <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                    <span className="text-sm font-medium">{t.map.filterInitiatives}</span>
                  </div>
                </div>
              </div>
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
